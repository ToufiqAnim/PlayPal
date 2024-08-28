import { Types } from 'mongoose';
/* eslint-disable no-unused-vars */
import { Model } from 'mongoose';
export type IUserRole = 'admin' | 'user';

// User Interface
export interface IUser {
  _id: Types.ObjectId;
  name: string;
  email: string;
  password: string;
  phone: string;
  role: IUserRole;
  address: string;
}
export type ILoginUser = {
  email: string;
  password: string;
};

export interface UserModel extends Model<IUser> {
  isUserExists(email: string): Promise<IUser> | null;
  isPasswordMatched(
    plainTextPassword: string,
    hashedPassword: string,
  ): Promise<boolean>;
}
