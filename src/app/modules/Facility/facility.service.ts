import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { IFacility } from './facility.interface';
import Facility from './facility.model';

//Create Facility
const CreateFacility = async (facilityData: IFacility) => {
  const existingFacility = await Facility.isFacilityExists(facilityData.name);
  if (existingFacility) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'Facility with same name already exists',
    );
  }
  const newFacilty = await Facility.create(facilityData);
  return newFacilty;
};

//Get All Facility
const GetAllFacilities = async () => {
  const result = await Facility.find({});
  if (!result.length) {
    throw new AppError(httpStatus.NOT_FOUND, 'No Data Found');
  }
  return result;
};

// Update Facility
const UpdateFacility = async (id: string, updateData: Partial<IFacility>) => {
  if (updateData.isDeleted) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'Facility can not be deleted in this route',
    );
  }
  const result = await Facility.findByIdAndUpdate(id, updateData, {
    new: true,
  });
  return result;
};

// Delete Facility
const DeleteFacility = async (id: string) => {
  const result = await Facility.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { new: true },
  ).select({
    createdAt: 0,
    updatedAt: 0,
  });
  return result;
};

export const FacilityServices = {
  CreateFacility,
  UpdateFacility,
  DeleteFacility,
  GetAllFacilities,
};
