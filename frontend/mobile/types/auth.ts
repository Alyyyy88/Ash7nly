export type serviceArea =
  | 'HELWAN'
  | 'HARAM'
  | 'MAADI'
  | 'FISAL'
  | 'IMBABA'
  | 'DOKKI'
  | 'ZAMALEK'
  | 'ROD_ELFARAG'
  | 'NASR_CITY';

export type vehicleType = 'BIKE' | 'CAR' | 'VAN' | 'TRUCK';
export interface LoginRequest {
  email: string;
  password: string;
}
export interface LoginResponse {
  success: boolean;
  message: string;
  data: AuthResponse;
  timestamp: string;
}

export interface AuthResponse {
  accessToken: string;
  user: User;
}

export interface User {
  id: number;
  email: string;
  fullName: string;
  phoneNumber: any;
  role: string;
}

export interface RegisterRequest {
  username: string;
  fullName: string;
  email: string;
  password: string;
  vehicleType: vehicleType;
  vehicleNumber: string;
  licenseNumber: string;
  serviceArea: serviceArea;
}

export interface authStore {
  isAuthenticated: boolean;
  accessToken: string | null;
  user: User | null;
  setAuth: (accessToken: string | null, user: User | null) => void;
  clearAuth: () => void;
  logout: () => void;
}
