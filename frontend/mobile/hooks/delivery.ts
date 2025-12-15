import { delivery_API } from '@/api/delivery';
import { AvailableDeliveryResponse } from '@/types/delivery';
import { useQuery, useMutation } from '@tanstack/react-query';

export const useAvailableDeliveries = () => {
  return useQuery<AvailableDeliveryResponse>({
    queryKey: ['availableDeliveries'],
    queryFn: () => delivery_API.getAvailableDeliveries(),
  });
};

export const useAcceptDelivery = () => {
  return useMutation({
    mutationFn: (deliveryId: string) => delivery_API.acceptDelivery(deliveryId),
  });
};

export const useActiveDeliveries = () => {
  return useQuery({
    queryKey: ['activeDeliveries'],
    queryFn: () => delivery_API.getMyActiveDeliveries(),
  });
};

export const useUpdateDeliveryStatus = () => {
  return useMutation({
    mutationFn: ({ deliveryId, status, deliveryNotes }: { deliveryId: number; status: string; deliveryNotes: string }) =>
      delivery_API.updateDeliveryStatus(deliveryId, status, deliveryNotes),
  });
};

export const useVerifyDeliveryOTP = () => {
  return useMutation({
    mutationFn: ({ deliveryId, otp }: { deliveryId: string; otp: string }) =>
      delivery_API.verifyDeliveryOTP(deliveryId, otp),
  });
};

export const useMyActiveDeliveries = () => {
  return useQuery({
    queryKey: ['myActiveDeliveries'],
    queryFn: () => delivery_API.getMyActiveDeliveries(),
  });
};
