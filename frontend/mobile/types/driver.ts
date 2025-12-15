import { serviceArea, vehicleType } from "./auth";

export interface DriverInfoResponse {
  success: boolean;
  message: string;
  data: driverProfile;
  timestamp: string;
}

export interface driverProfile {
  id: number;
  userId: number;
  username: any;
  fullName: string;
  email: string;
  vehicleType: vehicleType;
  vehicleNumber: string;
  licenseNumber: string;
  serviceArea: serviceArea;
  available: boolean;
  phoneNumber: string;
}
