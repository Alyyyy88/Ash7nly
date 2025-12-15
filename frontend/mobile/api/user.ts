import { axiosApiWithCreds } from '@/axios/client';
import { User } from '@/types/auth';

export const USers_API = {
  getUserProfile: async (): Promise<User> => {
    const response = await axiosApiWithCreds.get<User>('/users/profile');
    console.log(response.data);
    return response.data;
  },
};
