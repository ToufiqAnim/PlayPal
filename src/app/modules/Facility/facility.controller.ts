import { Request, Response } from 'express';
import { IFacility } from './facility.model';
import { FacilityServices } from './facility.service';

const AddFacility = async (req: Request, res: Response) => {
  try {
    const facilityData: IFacility = req.body;
    const savedFacility = await FacilityServices.CreateFacility(facilityData);

    res.status(200).json({
      success: true,
      statusCode: 200,
      message: 'Facility added successfully',
      data: savedFacility,
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json({
        success: false,
        statusCode: 500,
        message: 'Server Error',
        details: error.message,
      });
    } else {
      res.status(500).json({
        success: false,
        statusCode: 500,
        message: 'Server Error',
        details: 'An unknown error occurred',
      });
    }
  }
};
const GetAllFacilities = async (req: Request, res: Response) => {
  try {
    const facilities = await FacilityServices.GetAllFacilities();
    res.status(200).json({
      success: true,
      statusCode: 200,
      message: 'Facilities retrieved successfully',
      data: facilities,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      statusCode: 500,
      message: 'Internal server error',
      error,
    });
  }
};
const UpdateFacility = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updatedFacility = await FacilityServices.UpdateFacility(id, req.body);
    if (!updatedFacility) {
      return res.status(404).json({
        success: false,
        statusCode: 404,
        message: 'Facility not found',
      });
    }

    res.status(200).json({
      success: true,
      statusCode: 200,
      message: 'Facility updated successfully',
      data: updatedFacility,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      statusCode: 500,
      message: 'Internal server error',
      error,
    });
  }
};
const DeleteFacility = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deletedFacility = await FacilityServices.DeleteFacility(id);
    if (!deletedFacility) {
      return res.status(404).json({
        success: false,
        statusCode: 404,
        message: 'Facility not found',
      });
    }

    res.status(200).json({
      success: true,
      statusCode: 200,
      message: 'Facility updated successfully',
      data: deletedFacility,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      statusCode: 500,
      message: 'Internal server error',
      error,
    });
  }
};

export const FacilityControllers = {
  AddFacility,
  GetAllFacilities,
  UpdateFacility,
  DeleteFacility,
};
