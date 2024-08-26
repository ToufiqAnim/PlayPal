import { Types } from 'mongoose';
import { z } from 'zod';

const objectIdTransform = z
  .string()
  .refine((value) => Types.ObjectId.isValid(value), {
    message: 'Invalid ObjectId format',
  })
  .transform((value) => new Types.ObjectId(value));

const dateTransform = z.string().transform((value) => new Date(value));

export const bookingZodSchema = z.object({
  userId: objectIdTransform,
  facilityId: objectIdTransform,
  date: dateTransform,
  startTime: dateTransform,
  endTime: dateTransform,
  payableAmount: z
    .number()
    .nonnegative('Payable amount must be a positive number'),
  isBooked: z
    .enum(['confirmed', 'unconfirmed', 'canceled'])
    .default('unconfirmed'),
});
