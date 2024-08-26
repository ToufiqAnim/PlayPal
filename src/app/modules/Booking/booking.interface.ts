import { Types } from 'mongoose';

export interface IBooking {
  _id?: Types.ObjectId;
  facility: Types.ObjectId;
  date: Date;
  startTime: string;
  endTime: string;
  user: Types.ObjectId;
  payableAmount: number;
  isBooked: 'confirmed' | 'canceled';
}
