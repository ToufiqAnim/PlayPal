import Booking from './booking.model';
import Facility from '../Facility/facility.model';
import { IBooking } from './booking.interface';
import { JwtPayload } from 'jsonwebtoken';
import { User } from '../User/user.model';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';
import { AvailableTimeSlots } from '../../utils/bookin.utils';

const CreateBooking = async (bookingData: IBooking, payload: JwtPayload) => {
  const { facility, date, startTime, endTime } = bookingData;
  const user = await User.isUserExists(payload.email);
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'No Data Found');
  }
  const facilityData = await Facility.findById(facility);

  if (!facilityData) {
    throw new Error('Facility not found');
  }
  // Check For Booking availibility
  const existingBooking = await Booking.findOne({
    facility,
    date,
    $or: [
      { startTime: { $lt: endTime, $gte: startTime } },
      { endtTime: { $lt: endTime, $gte: endTime } },
    ],
  });

  if (existingBooking)
    throw new Error('Facility is unavailable during the requested time slot');

  //Payable Amount Calculation

  const start = new Date(`${date}T${startTime}`);
  const end = new Date(`${date}T${endTime}`);
  const hours = (end.getTime() - start.getTime()) / (1000 * 60 * 60);
  const payableAmount = hours * facilityData?.pricePerHour;

  const newBooking = await Booking.create({
    ...bookingData,
    user: user._id,
    payableAmount,
  });

  return newBooking;
};

const GetAllBookings = async () => {
  const result = await Booking.find({})
    .populate('facility')
    .populate('user')
    .lean();
  if (!result || result.length === 0) {
    throw new AppError(httpStatus.NOT_FOUND, 'No Data Found');
  }

  return result;
};

const GetUserBookings = async (payload: JwtPayload) => {
  const { _id } = payload;
  const result = await Booking.find({ user: _id }).populate('facility');
  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, 'No Data Found');
  }

  return result;
};
const CancelBooking = async (id: string) => {
  const result = await Booking.findByIdAndUpdate(
    id,
    {
      isBooked: 'canceled',
    },
    {
      new: true,
    },
  ).populate('facility');
  return result;
};
const CheckAailability = async (date: string) => {
  const selectedDate = date ? date : new Date().toISOString().split('T')[0];
  const bookings = await Booking.find({
    date: selectedDate,
  });
  const bookedSlots = bookings.map((booking) => ({
    startTime: booking.startTime,
    endTime: booking.endTime,
  }));
  const availableSlots = AvailableTimeSlots(bookedSlots);
  return availableSlots;
};
export const BookingService = {
  CreateBooking,
  GetAllBookings,
  GetUserBookings,
  CancelBooking,
  CheckAailability,
};
