import Facility, { IFacility } from './facility.model';

const CreateFacility = async (facilityData: IFacility) => {
  const newFacilty = new Facility(facilityData);
  return await newFacilty.save();
};
const GetAllFacilities = async () => {
  return await Facility.find({ isDeleted: false });
};
const UpdateFacility = async (id: string, updateData: Partial<IFacility>) => {
  return await Facility.findByIdAndUpdate(id, updateData, { new: true });
};
const DeleteFacility = async (id: string) => {
  return await Facility.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { new: true },
  );
};

export const FacilityServices = {
  CreateFacility,
  UpdateFacility,
  DeleteFacility,
  GetAllFacilities,
};
