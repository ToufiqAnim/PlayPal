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
router.get('/check-availability', BookingControllers.CheckAailability);

export const BookingRoutes = router;
