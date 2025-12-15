import { axiosApi } from '@/axios/client';
import { LoginRequest, LoginResponse, RegisterRequest } from '@/types/auth';

export const auth_API = {
  login: async (data: LoginRequest): Promise<LoginResponse> => {
    
    const response = await axiosApi.post<LoginResponse>('auth/login', data);

    

    console.log(response.data);

    return response.data;
  },
  register: async (data: RegisterRequest): Promise<any> => {
    const response = await axiosApi.post<RegisterRequest>('auth/register/driver', data);
    console.log(response.data);
    return response.data;
  },
};
