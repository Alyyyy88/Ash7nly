import { z } from 'zod';

export const RegisterSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters long'),
  username: z.string().min(3, 'Username must be at least 3 characters long'),
  vehicleType: z.enum(['BIKE', 'CAR', 'VAN', 'TRUCK']),
  vehicleNumber: z.string().min(1, 'Vehicle number is required'),
  licenseNumber: z.string().min(1, 'License number is required'),
  serviceArea: z.enum([
    'HELWAN',
    'HARAM',
    'MAADI',
    'FISAL',
    'IMBABA',
    'DOKKI',
    'ZAMALEK',
    'ROD_ELFARAG',
    'NASR_CITY',
  ]),
});


export const LoginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters long'),
});


export type RegisterInput = z.infer<typeof RegisterSchema>;
export type LoginInput = z.infer<typeof LoginSchema>;
