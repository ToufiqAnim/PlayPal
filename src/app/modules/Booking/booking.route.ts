import express from 'express';
import { BookingControllers } from './booking.controller';
import auth from '../../middlewares/auth';

const router = express.Router();

router.post('/bookings', auth('user'), BookingControllers.CreateBooking);
router.get('/check-availability', BookingControllers.CheckAailability);

export const BookingRoutes = router;
