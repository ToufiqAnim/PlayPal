import { Request, Response } from 'express';
import moment from 'moment';
import { BookingService } from './booking.service';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';

const CreateBooking = catchAsync(async (req: Request, res: Response) => {
  const bookingData = req.body;
  const user = req.user;

  const newBooking = await BookingService.CreateBooking(bookingData, user);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Booking Created Succewsfully',
    data: newBooking,
  });
});
const GetAllBookings = catchAsync(async (req: Request, res: Response) => {
  const result = await BookingService.GetAllBookings();
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Bookings retrieved successfully',
    data: result,
  });
});

export const BookingControllers = {
  CreateBooking,
  GetAllBookings,
  GetUserBookings,
  CancelBooking,
};
