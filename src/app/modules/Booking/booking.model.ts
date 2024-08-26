import { model, Schema } from 'mongoose';
import { IBooking } from './booking.interface';

const BookingSchema = new Schema<IBooking>({
  date: { type: Date, required: true },
  startTime: { type: String, required: true },
  endTime: { type: String, required: true },
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  facility: {
    type: Schema.Types.ObjectId,
    ref: 'Facility',
    required: true,
    trim: true,
  },
  payableAmount: { type: Number },
  isBooked: {
    type: String,
    enum: ['confirmed', 'canceled'],
    default: 'confirmed',
  },
});

BookingSchema.pre('find', function (next) {
  this.find({
    isBooked: 'confirmed',
  });
  next();
});

const Booking = model<IBooking>('Booking', BookingSchema);
export default Booking;
