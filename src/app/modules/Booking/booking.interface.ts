import { Types } from 'mongoose';

export interface IBooking {
  _id?: Types.ObjectId;
  facility: Types.ObjectId;
  date: Date;
  startTime: Date;
  endTime: Date;
  user: Types.ObjectId;
  payableAmount: number;
  isBooked: 'confirmed' | 'canceled';
}
