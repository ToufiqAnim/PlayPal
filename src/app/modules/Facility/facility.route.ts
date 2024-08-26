import express from 'express';

import { FacilityControllers } from './facility.controller';
import auth from '../../middlewares/auth';

const router = express.Router();

router.post(
  '/',

  auth('admin'),
  FacilityControllers.CreateFacility,
);
router.put(
  '/:id',

  auth('admin'),
  FacilityControllers.UpdateFacility,
);
router.delete(
  '/:id',

  auth('admin'),
  FacilityControllers.DeleteFacility,
);
router.get('/', FacilityControllers.GetAllFacilities);
export const FacilityRoutes = router;
