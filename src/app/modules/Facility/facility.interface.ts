import { Model, Types } from 'mongoose';

export type TUserName = {
  firstName: string;
  middleName: string;
  lastName: string;
};

export type TGuardian = {
  fatherName: string;
  fatherOccupation: string;
  fatherContactNo: string;
  motherName: string;
  motherOccupation: string;
  motherContactNo: string;
};

export type TLocalGuardian = {
  name: string;
  occupation: string;
  contactNo: string;
  address: string;
};

export type TFaculty = {
  name: string;
  description: string;
  pricePerHour: number;
  location: string;
  isDeleted: boolean;
};

//for creating static
export interface StudentModel extends Model<TFaculty> {
  // eslint-disable-next-line no-unused-vars
  isUserExists(id: string): Promise<TFaculty | null>;
}
