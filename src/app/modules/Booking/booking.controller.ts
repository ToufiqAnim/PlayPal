import { Request, Response } from 'express';
import moment from 'moment';
import { BookingService } from './booking.service';

const CheckAailability = async (req: Request, res: Response) => {
  try {
    const date = req.query.date
      ? moment(req.query.date as string).format('YYYY-MM-DD')
      : moment().format('YYYY-MM-DD');
    const availableSlots = await BookingService.CheckAailability(date);
    res.status(200).json({
      success: true,
      statusCode: 200,
      message: 'Availability checked successfully',
      data: availableSlots,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      statusCode: 500,
      message: 'Server Error',
      details: error.message,
    });
  }
};

const CreateBooking = async (req: Request, res: Response) => {
  try {
    const { facility, date, startTime, endTime } = req.body;
    if (!req.user || !req.user._id) {
      return res.status(400).json({
        success: false,
        statusCode: 400,
        message: 'User authentication failed. _id is missing.',
      });
    }
    const userId = req.user._id;

    const booking = await BookingService.CreateBooking(
      facility,
      date,
      startTime,
      endTime,
      userId,
    );

    res.status(200).json({
      success: true,
      statusCode: 200,
      message: 'Booking created successfully',
      data: booking,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      statusCode: 400,
      message: error.message,
    });
  }
};
export const BookingControllers = {
  CheckAailability,
  CreateBooking,
};
