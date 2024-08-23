import express from 'express';
import { authMiddleware } from '../../middlewares/auth';
import { authorize } from '../../middlewares/authorize';
import { FacilityControllers } from './facility.controller';

const router = express.Router();

router.post(
  '/',
  authMiddleware,
  authorize('admin'),
  FacilityControllers.AddFacility,
);
router.put(
  '/:id',
  authMiddleware,
  authorize('admin'),
  FacilityControllers.UpdateFacility,
);
router.delete(
  '/:id',
  authMiddleware,
  authorize('admin'),
  FacilityControllers.DeleteFacility,
);
router.get('/', FacilityControllers.GetAllFacilities);
export const FacilityRoutes = router;
