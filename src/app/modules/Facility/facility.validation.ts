import { z } from 'zod';

const facilityValidationSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  description: z.string().min(1, 'Description is required'),
  pricePerHour: z.number().min(0, 'Price per hour must be a positive number'),
  location: z.string().min(1, 'Location is required'),
  isDeleted: z.boolean().optional().default(false),
});

// Use the Zod schema to validate data
type Facility = z.infer<typeof facilityValidationSchema>;

export { facilityValidationSchema, Facility };
