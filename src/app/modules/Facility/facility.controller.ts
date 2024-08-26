import { Request, Response } from 'express';

import { FacilityServices } from './facility.service';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';

const CreateFacility = catchAsync(async (req: Request, res: Response) => {
  const facilityData = req.body;
  const newFacility = await FacilityServices.CreateFacility(facilityData);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Facility added successfully',
    data: newFacility,
  });
});
const GetAllFacilities = catchAsync(async (req: Request, res: Response) => {
  const facilities = await FacilityServices.GetAllFacilities();
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'Facilities retrieved successfully',
    data: facilities,
  });
});
const UpdateFacility = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const facilityData = req.body;
  const updatedFacility = await FacilityServices.UpdateFacility(
    id,
    facilityData,
  );
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'Facilities updated successfully',
    data: updatedFacility,
  });
});
const DeleteFacility = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const deletedFacility = await FacilityServices.DeleteFacility(id);
  if (!deletedFacility) {
    return res.status(404).json({
      success: false,
      statusCode: 404,
      message: 'Facility not found',
    });
  }
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'Facilities deleted successfully',
    data: deletedFacility,
  });
});

export const FacilityControllers = {
  CreateFacility,
  GetAllFacilities,
  UpdateFacility,
  DeleteFacility,
};
