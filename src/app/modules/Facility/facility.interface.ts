import { Model } from 'mongoose';
/* eslint-disable no-unused-vars */
export interface IFacility {
  name: string;
  image: string;
  description: string;
  pricePerHour: number;
  location: string;
  isDeleted?: boolean;
}
export interface FacilityModel extends Model<IFacility> {
  isFacilityExists(name: string): Promise<IFacility> | null;
}
