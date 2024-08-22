import { Schema, Document, model } from 'mongoose';
import { z } from 'zod';
import { userValidationSchema } from './user.validation';

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  phone: string;
  address: string;
  role: 'admin' | 'user';
}

export type UserType = z.infer<typeof userValidationSchema> & IUser;

const userSchema = new Schema<UserType>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
    role: { type: String, enum: ['admin', 'user'], default: 'user' },
  },
  {
    timestamps: true,
  },
);

userSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    // Hash password logic goes here (e.g., using bcrypt)
  }
  next();
});

// Create the User model using the schema
export const User = model<UserType>('User', userSchema);
