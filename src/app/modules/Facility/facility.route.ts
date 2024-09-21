import express from 'express';

import { FacilityControllers } from './facility.controller';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { FacilityValidation } from './facility.validation';

const router = express.Router();

router.post(
  '/',

  auth('admin'),
  validateRequest(FacilityValidation.FacilityValidationSchema),
  FacilityControllers.CreateFacility,
);
router.put(
  '/:id',

  auth('admin'),
  validateRequest(FacilityValidation.UpdateFacilityValidationSchema),
  FacilityControllers.UpdateFacility,
);
router.delete(
  '/:id',

  auth('admin'),
  FacilityControllers.DeleteFacility,
);
router.get('/', FacilityControllers.GetAllFacilities);
router.get('/:id', FacilityControllers.GetSingleFacilities);

export const FacilityRoutes = router;
