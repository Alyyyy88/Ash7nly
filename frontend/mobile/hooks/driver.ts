import { driver_API } from '@/api/driver';
import { ProfileData } from '@/types/profile';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

export const useDriverInfo = () => {
  return useQuery({
    queryKey: ['driverInfo'],
    queryFn: () => driver_API.getDriverInfo(),
  });
};

export const useUpdateDriverInfo = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ data }: { data: ProfileData }) => driver_API.updateDriverInfo(data),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['driverInfo'] });
      console.log('Driver info updated successfully');
    },

    onError: (error) => {
      console.error('Error updating driver info:', error);
    },
  });
};

export const useDriverHistory = () => {
  return useQuery({
    queryKey: ['driverHistory'],
    queryFn: () => driver_API.getDriverHistory(),
  });
};
