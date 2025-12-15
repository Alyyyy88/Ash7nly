import { axiosApiWithCreds } from '@/axios/client';
import { ActiveDeliveryResponse } from '@/types/delivery';
import { DriverInfoResponse } from '@/types/driver';
import { ProfileData } from '@/types/profile';

export const driver_API = {
  getDriverInfo: async (): Promise<DriverInfoResponse> => {
    const response = await axiosApiWithCreds.get<any>('drivers/me');
    console.log(response.data);
    return response.data;
  },

  updateDriverInfo: async (data: ProfileData): Promise<any> => {
    console.log('Sending update driver data:', data);
    const response = await axiosApiWithCreds.put<any>('drivers/me', data);
    console.log('Update driver response:', response.data);
    return response.data;
  },

  getDriverHistory: async (): Promise<ActiveDeliveryResponse> => {
    const response = await axiosApiWithCreds.get<ActiveDeliveryResponse>('/deliveries/history');
    console.log('Driver history deliveries FROM API:', response.data);
    return response.data;
  },
};
