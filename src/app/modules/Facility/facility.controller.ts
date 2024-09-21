import { Request, Response } from 'express';

import { FacilityServices } from './facility.service';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';

// Create Facility
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

// Get All Facility
const GetAllFacilities = catchAsync(async (req: Request, res: Response) => {
  const facilities = await FacilityServices.GetAllFacilities();
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'Facilities retrieved successfully',
    data: facilities,
  });
});
const GetSingleFacilities = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const facility = await FacilityServices.GetSingleFacility(id);
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'Facility retrieved successfully',
    data: facility,
  });
});

// Update Facility
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

// Delete Facility
const DeleteFacility = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const deletedFacility = await FacilityServices.DeleteFacility(id);

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
  GetSingleFacilities,
};
