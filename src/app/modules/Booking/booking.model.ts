import mongoose, { Schema, Document } from 'mongoose';
// import Facility from '../Facility/facility.model';
// Make sure this path is correct according to your project structure

interface IBooking extends Document {
  date: Date;
  startTime: Date;
  endTime: Date;
  user: mongoose.Schema.Types.ObjectId;
  facility: mongoose.Schema.Types.ObjectId;
  payableAmount: number;
  isBooked: 'confirmed' | 'unconfirmed' | 'canceled';
}

const BookingSchema: Schema<IBooking> = new Schema({
  date: { type: Date, required: true },
  startTime: { type: Date, required: true },
  endTime: { type: Date, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  facility: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Facility',
    required: true,
  },
  payableAmount: { type: Number },
  isBooked: {
    type: String,
    enum: ['confirmed', 'unconfirmed', 'canceled'],
    default: 'unconfirmed',
  },
});

/* BookingSchema.pre<IBooking>('save', async function (next) {
  try {
    const facility = await Facility.findById(this.facility);
    if (!facility) {
      throw new Error('Facility not found');
    }

    const duration =
      (this.endTime.getTime() - this.startTime.getTime()) / (1000 * 60 * 60);
    this.payableAmount = duration * facility.pricePerHour;

    next();
  } catch (error) {
    next(error);
  }
}); */

const Booking = mongoose.model<IBooking>('Booking', BookingSchema);
export default Booking;
