import { useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { useAcceptDelivery } from '@/hooks/delivery';
import { AvailableDelivery } from '@/types/delivery';

export function useDeliveryActions() {
  const [selectedDelivery, setSelectedDelivery] = useState<AvailableDelivery | null>(null);
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
  const { mutate: acceptDelivery, isPending: isAccepting } = useAcceptDelivery();

  const handleDeliveryPress = (delivery: AvailableDelivery) => {
    setSelectedDelivery(delivery);
    setIsDialogVisible(true);
  };

  const handleCloseDialog = () => {
    setIsDialogVisible(false);
    setSelectedDelivery(null);
  };

  const handleConfirmAccept = () => {
    if (!selectedDelivery) return;

    acceptDelivery(selectedDelivery.shipmentId.toString(), {
      onSuccess: (data) => {
        console.log('Delivery accepted:', data);
        setIsDialogVisible(false);
        setSelectedDelivery(null);

        // Refetch available deliveries
        queryClient.invalidateQueries({ queryKey: ['availableDeliveries'] });

        // Show success message
        setAlertConfig({
          visible: true,
          type: 'success',
          title: 'Success!',
          message: 'You have successfully accepted this delivery.',
        });
      },
      onError: (error) => {
        console.error('Failed to accept delivery:', error);
        setIsDialogVisible(false);

        // Show error message
        setAlertConfig({
          visible: true,
          type: 'error',
          title: 'Error',
          message: 'Failed to accept delivery. Please try again.',
        });
      },
    });
  };

  const handleCancelAccept = () => {
    handleCloseDialog();
  };

  const handleCloseAlert = () => {
    setAlertConfig((prev) => ({ ...prev, visible: false }));
  };

  return {
    selectedDelivery,
    isDialogVisible,
    isAccepting,
    alertConfig,
    handleDeliveryPress,
    handleCloseDialog,
    handleConfirmAccept,
    handleCancelAccept,
    handleCloseAlert,
  };
}
