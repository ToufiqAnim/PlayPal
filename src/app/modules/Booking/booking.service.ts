import Booking from './booking.model';
import Facility from '../Facility/facility.model';
import { IBooking } from './booking.interface';
import { JwtPayload } from 'jsonwebtoken';
import { User } from '../User/user.model';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';

const CheckAailability = async (date: string) => {
  const bookings = await Booking.find({
    date: new Date(date),
    isBooked: { $ne: 'canceled' },
  });
  const totalTimeSlots = [
    { startTime: '08:00', endTime: '10:00' },
    { startTime: '10:00', endTime: '12:00' },
    { startTime: '12:00', endTime: '14:00' },
    { startTime: '14:00', endTime: '16:00' },
    { startTime: '16:00', endTime: '16:00' },
  ];
  const availableSlots = totalTimeSlots.filter((slot) => {
    const [startHourSlot, startMinuteSlot] = slot.startTime
      .split(':')
      .map(Number);
    const [endHourSlot, endMinuteSlot] = slot.endTime.split(':').map(Number);

    return !bookings.some((booking) => {
      const bookingStartTime = new Date(booking.startTime);
      const bookingEndTime = new Date(booking.endTime);

      const startTimeSlot = new Date(date);
      startTimeSlot.setHours(startHourSlot, startMinuteSlot);
      const endTimeSlot = new Date(date);
      endTimeSlot.setHours(endHourSlot, endMinuteSlot);

      const isSlotStartOverlapping =
        startTimeSlot >= bookingStartTime && startTimeSlot < bookingEndTime;
      const isSlotEndOverlapping =
        startTimeSlot >= bookingStartTime && startTimeSlot < bookingEndTime;
      return isSlotStartOverlapping || isSlotEndOverlapping;
    });
  });
  return availableSlots;
};

export const checkFacilityAvailability = async (
  facilityId: string,
  date: string,
  startTime: string,
  endTime: string,
): Promise<boolean> => {
  const bookings = await Booking.find({
    facility: facilityId,
    date: new Date(date),
    isBooked: { $ne: 'canceled' },
    $or: [
      {
        startTime: { $lt: new Date(`${date}T${endTime}:00Z`) },
        endTime: { $gt: new Date(`${date}T${startTime}:00Z`) },
      },
    ],
  });

  return bookings.length === 0;
};

export const calculatePayableAmount = (
  startTime: Date,
  endTime: Date,
  pricePerHour: number,
): number => {
  const durationInHours =
    (endTime.getTime() - startTime.getTime()) / (1000 * 60 * 60);
  return durationInHours * pricePerHour;
};

const CreateBooking = async (bookingData: IBooking, payload: JwtPayload) => {
  const { facility, date, startTime, endTime } = bookingData;
  const user = await User.isUserExists(payload.email);
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'No Data Found');
  }
  const facilityData = await Facility.findById(facility);

  if (!facilityData) throw new Error('Facility not found');

  const isAvailable = await checkFacilityAvailability(
    facilityId,
    date,
    startTime,
    endTime,
  );
  if (!isAvailable)
    throw new Error('Facility is unavailable during the requested time slot');

  const payableAmount = calculatePayableAmount(
    new Date(`${date}T${startTime}:00Z`),
    new Date(`${date}T${endTime}:00Z`),
    facility.pricePerHour,
  );

  const newBooking = new Booking({
    user: userId,
    facility: facilityId,
    date: new Date(date),
    startTime: new Date(`${date}T${startTime}:00Z`),
    endTime: new Date(`${date}T${endTime}:00Z`),
    payableAmount,
    isBooked: 'confirmed',
  });

  return await newBooking.save();
};
export const BookingService = {
  CheckAailability,
  CreateBooking,
};
