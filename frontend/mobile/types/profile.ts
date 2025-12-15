import { serviceArea, vehicleType } from './auth';

export interface ProfileData {
  fullName: string;
  email: string;
  phoneNumber: string;
  vehicleType: vehicleType;
  serviceArea: serviceArea;
}
