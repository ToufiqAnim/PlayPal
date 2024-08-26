import express from 'express';
import { BookingControllers } from './booking.controller';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { BookingValidation } from './booking.validation';

const router = express.Router();

router.post(
  '/bookings',
  auth('user'),
  validateRequest(BookingValidation.bookingValidationSchema),
  BookingControllers.CreateBooking,
);
router.get('/bookings', auth('admin'), BookingControllers.GetAllBookings);
router.get('/bookings/user', auth('user'), BookingControllers.GetUserBookings);
router.delete('/bookings/:id', auth('user'), BookingControllers.CancelBooking);
router.get('/check-availability', BookingControllers.CheckAvailability);

export const BookingRoutes = router;
