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
const GetUserBookings = catchAsync(async (req: Request, res: Response) => {
  const result = await BookingService.GetUserBookings(req.user);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'User Bookings retrieved successfully',
    data: result,
  });
});
const CancelBooking = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await BookingService.CancelBooking(id);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: ' Booking canceled successfully',
    data: result,
  });
});
const CheckAvailability = catchAsync(async (req: Request, res: Response) => {
  const date = req.query.date as string;
  const result = await BookingService.CheckAailability(date);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: ' Availability checked successfully',
    data: result,
  });
});
export const BookingControllers = {
  CreateBooking,
  GetAllBookings,
  GetUserBookings,
  CancelBooking,
  CheckAvailability,
};
