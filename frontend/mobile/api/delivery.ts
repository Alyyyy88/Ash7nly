import { axiosApiWithCreds } from '@/axios/client';
import { ActiveDeliveryResponse } from '@/types/delivery';

export const delivery_API = {
  getAvailableDeliveries: async (): Promise<any> => {
    const response = await axiosApiWithCreds.get<any>('deliveries/available');
    console.log(response.data);
    return response.data;
  },
  acceptDelivery: async (deliveryId: string): Promise<any> => {
    const response = await axiosApiWithCreds.post<any>(`deliveries/${deliveryId}/accept`);
    console.log(response.data);
    return response.data;
  },
  getMyActiveDeliveries: async (): Promise<ActiveDeliveryResponse> => {
    const response = await axiosApiWithCreds.get<ActiveDeliveryResponse>('deliveries/active');
    console.log(response.data);
    return response.data;
  },

  updateDeliveryStatus: async (
    deliveryId: number,
    status: string,
    deliveryNotes: string
  ): Promise<any> => {
    const response = await axiosApiWithCreds.put<any>(`deliveries/${deliveryId}/status`, {
      status,
      deliveryNotes,
    });
    console.log(response.data);
    return response.data;
  },

  verifyDeliveryOTP: async (deliveryId: string, otp: string): Promise<any> => {
    const response = await axiosApiWithCreds.post<any>(`drivers/deliveries/${deliveryId}/verify`, {
      otp,
    });
    console.log(response.data);
    return response.data;
  },
};
