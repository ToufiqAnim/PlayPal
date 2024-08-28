import { z } from 'zod';

const UserSignUpValidationSchema = z.object({
  name: z.string().trim().min(1, 'Name is required.'),
  email: z
    .string()
    .email('Invalid email address.')
    .min(1, 'Email is required.'),
  password: z.string().min(6, 'Password must be at least 6 characters long.'),
  phone: z
    .string()
    .length(11, 'Phone number must be exactly 11 digits.')
    .regex(/^\d{11}$/, 'Phone number must contain only digits.'),
  address: z.string().min(5, 'Address is required'),
  role: z.enum(['admin', 'user']),
});

const UserLoginValidationSchema = z.object({
  email: z
    .string()
    .email('Invalid email address.')
    .min(1, 'Email is required.'),
  password: z.string().min(6, 'Password must be at least 6 characters long.'),
});
const RefreshTokenValidationSchema = z.object({
  refreshToken: z.string({
    required_error: 'Refresh token is required!',
  }),
});
export const UserValidationSchema = {
  UserSignUpValidationSchema,
  UserLoginValidationSchema,
  RefreshTokenValidationSchema,
};
