import { useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { useUpdateDeliveryStatus, useVerifyDeliveryOTP } from '@/hooks/delivery';
import { Delivery } from '@/types/delivery';
import {
  getNextStatus,
  getNotesForDeliveryStatus,
  isValidStatusTransition,
} from '@/lib/delivery-utils';

export function useStatusUpdate() {
  const [selectedDelivery, setSelectedDelivery] = useState<Delivery | null>(null);
  const [isDialogVisible, setIsDialogVisible] = useState(false);
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
  const { mutate: updateStatus, isPending: isUpdating } = useUpdateDeliveryStatus();

  const handleDeliveryPress = (delivery: Delivery) => {
    setSelectedDelivery(delivery);
    setIsDialogVisible(true);
  };

  const handleCloseDialog = () => {
    setIsDialogVisible(false);
    setSelectedDelivery(null);
  };



  const handleConfirmUpdate = (statusToUpdate?: string) => {
    if (!selectedDelivery) return;

    const targetStatus = statusToUpdate || getNextStatus(selectedDelivery.shipmentStatus);
    if (!targetStatus) return;

   

    // Validate status transition
    if (!isValidStatusTransition(selectedDelivery.shipmentStatus, targetStatus)) {
      setAlertConfig({
        visible: true,
        type: 'error',
        title: 'Invalid Status',
        message: 'Cannot skip status steps. Please follow the proper sequence.',
      });
      handleCloseDialog();
      return;
    }

    updateStatus(
      {
        deliveryId: selectedDelivery.id,
        status: targetStatus,
        deliveryNotes: getNotesForDeliveryStatus(targetStatus),
      },
      {
        onSuccess: (data) => {
          console.log('Status updated:', data);
          setIsDialogVisible(false);
          setSelectedDelivery(null);

          // Refetch deliveries
          queryClient.invalidateQueries({ queryKey: ['activeDeliveries'] });

          setAlertConfig({
            visible: true,
            type: 'success',
            title: 'Status Updated!',
            message: `Delivery status has been updated successfully.`,
          });
        },
        onError: (error) => {
          console.error('Failed to update status:', error);
          setIsDialogVisible(false);

          setAlertConfig({
            visible: true,
            type: 'error',
            title: 'Update Failed',
            message: 'Failed to update delivery status. Please try again.',
          });
        },
      }
    );
  };

  // const handleVerifyOTP = (otp: string) => {
  //   if (!selectedDelivery) return;

  //   verifyOTP(
  //     {
  //       deliveryId: selectedDelivery.id.toString(),
  //       otp,
  //     },
  //     {
  //       onSuccess: (data) => {
  //         console.log('OTP verified:', data);
  //         setIsOTPDialogVisible(false);

  //         // Now update status to DELIVERED
  //         updateStatus(
  //           {
  //             deliveryId: selectedDelivery.id,
  //             status: 'DELIVERED',
  //             deliveryNotes: 'Package delivered successfully.',
  //           },
  //           {
  //             onSuccess: () => {
  //               setSelectedDelivery(null);
  //               queryClient.invalidateQueries({ queryKey: ['activeDeliveries'] });

  //               setAlertConfig({
  //                 visible: true,
  //                 type: 'success',
  //                 title: 'Delivery Complete!',
  //                 message: 'Delivery has been marked as delivered successfully.',
  //               });
  //             },
  //           }
  //         );
  //       },
  //       onError: (error) => {
  //         console.error('OTP verification failed:', error);
  //         setAlertConfig({
  //           visible: true,
  //           type: 'error',
  //           title: 'Invalid OTP',
  //           message: 'The OTP you entered is incorrect. Please try again.',
  //         });
  //       },
  //     }
  //   );
  // };

  const handleCancelUpdate = () => {
    handleCloseDialog();
  };

  const handleCloseAlert = () => {
    setAlertConfig((prev) => ({ ...prev, visible: false }));
  };

  return {
    selectedDelivery,
    isDialogVisible,
    isUpdating,
    alertConfig,
    handleDeliveryPress,
    handleCloseDialog,
    handleConfirmUpdate,
    handleCancelUpdate,
    handleCloseAlert,
  };
}
