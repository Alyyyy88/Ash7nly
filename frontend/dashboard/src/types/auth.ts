export interface LoginRequest {
  email: string;
  password: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  data: Data;
  timestamp: string;
}

export interface RegisterRequest {
  userName: string;
  fullName: string;
  email: string;
  role: string;
  password: string;
}

export interface Data {
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

export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  token: string | null;
  setAuthState: (
    isAuthenticated: boolean,
    user: User | null,
    token: string | null
  ) => void;
  clearAuthState: () => void;
}
