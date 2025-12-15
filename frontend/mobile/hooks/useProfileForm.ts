import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useQueryClient } from '@tanstack/react-query';
import { useUpdateDriverInfo } from '@/hooks/driver';
import { ProfileData } from '@/types/profile';


export function useProfileForm(initialData?: ProfileData, driverId?: number) {
  const [isEditing, setIsEditing] = useState(false);
  const [alertConfig, setAlertConfig] = useState<{
    visible: boolean;
    type: 'success' | 'error' | 'info';
    title: string;
    message: string;
  }>({
    visible: false,
    type: 'info',
    title: '',
    message: '',
  });

  const queryClient = useQueryClient();
  const { mutate: updateDriver, isPending: isUpdating } = useUpdateDriverInfo();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ProfileData>({
    defaultValues: initialData,
  });

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    reset(initialData);
    setIsEditing(false);
  };

  const onSubmit = (data: ProfileData) => {
    if (!driverId) return;

    updateDriver(
      { data },
      {
        onSuccess: () => {
          setIsEditing(false);
          queryClient.invalidateQueries({ queryKey: ['driverInfo'] });
          setAlertConfig({
            visible: true,
            type: 'success',
            title: 'Profile Updated!',
            message: 'Your profile has been updated successfully.',
          });
        },
        onError: (error) => {
          console.error('Failed to update profile:', error);
          setAlertConfig({
            visible: true,
            type: 'error',
            title: 'Update Failed',
            message: 'Failed to update profile. Please try again.',
          });
        },
      }
    );
  };

  const handleSave = handleSubmit(onSubmit);

  const handleCloseAlert = () => {
    setAlertConfig((prev) => ({ ...prev, visible: false }));
  };

  return {
    control,
    errors,
    isEditing,
    isUpdating,
    alertConfig,
    handleEdit,
    handleCancel,
    handleSave,
    handleCloseAlert,
  };
}
