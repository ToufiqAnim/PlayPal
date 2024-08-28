import { z } from 'zod';

const FacilityValidationSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  description: z.string().min(1, 'Description is required'),
  pricePerHour: z
    .number()
    .min(0, 'Price per hour must be greater than 0.')
    .nonnegative('Price per hour must be a positive number.'),
  location: z.string().min(1, 'Location is required'),
  isDeleted: z.boolean().optional().default(false),
});

const UpdateFacilityValidationSchema = FacilityValidationSchema.omit({
  isDeleted: true,
}).partial();

export const FacilityValidation = {
  FacilityValidationSchema,
  UpdateFacilityValidationSchema,
};
