import React from 'react';
import { View, Text, TouchableOpacity, Modal } from 'react-native';
import { AlertCircle, X } from 'lucide-react-native';

interface DeliveryConfirmDialogProps {
  visible: boolean;
  onClose: () => void;
  onConfirm: () => void;
  onCancel: () => void;
  isLoading?: boolean;
  pickupAddress: string;
  dropoffAddress: string;
  cost: number;
}

export function DeliveryConfirmDialog({
  visible,
  onClose,
  onConfirm,
  onCancel,
  isLoading = false,
  pickupAddress,
  dropoffAddress,
  cost,
}: DeliveryConfirmDialogProps) {
  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      {/* Backdrop */}
      <TouchableOpacity className="flex-1 bg-black/50" activeOpacity={1} onPress={onClose}>
        {/* Dialog */}
        <View className="flex-1 items-center justify-center px-6">
          <TouchableOpacity
            activeOpacity={1}
            className="w-full max-w-md rounded-3xl bg-card p-6 shadow-xl"
            onPress={(e) => e.stopPropagation()}>
            {/* Close Button */}
            <TouchableOpacity
              className="absolute right-4 top-4 z-10 h-8 w-8 items-center justify-center rounded-full bg-muted"
              onPress={onClose}>
              <X size={18} className="text-foreground" />
            </TouchableOpacity>

            {/* Icon */}
            <View className="mb-4 items-center">
              <View className="h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                <AlertCircle size={32} className="text-primary" />
              </View>
            </View>

            {/* Title */}
            <Text className="mb-2 text-center text-xl font-bold text-foreground">
              Accept Delivery?
            </Text>

            {/* Description */}
            <Text className="mb-6 text-center text-sm text-muted-foreground">
              You're about to accept this delivery. Please review the details below.
            </Text>

            {/* Delivery Details */}
            <View className="mb-6 rounded-xl bg-muted/50 p-4">
              {/* Pickup */}
              <View className="mb-3 flex-row">
                <View className="mr-2 mt-1 h-3 w-3 rounded-full bg-destructive" />
                <View className="flex-1">
                  <Text className="mb-1 text-xs font-medium text-muted-foreground">Pickup</Text>
                  <Text className="text-sm font-semibold text-foreground">{pickupAddress}</Text>
                </View>
              </View>

              {/* Dropoff */}
              <View className="mb-3 flex-row">
                <View className="mr-2 mt-1 h-3 w-3 rounded-full bg-green-500" />
                <View className="flex-1">
                  <Text className="mb-1 text-xs font-medium text-muted-foreground">Dropoff</Text>
                  <Text className="text-sm font-semibold text-foreground">{dropoffAddress}</Text>
                </View>
              </View>

              {/* Cost */}
              <View className="flex-row items-center justify-between border-t border-border pt-3">
                <Text className="text-sm font-medium text-muted-foreground">Earning</Text>
                <Text className="text-lg font-bold text-primary">${cost}</Text>
              </View>
            </View>

            {/* Actions */}
            <View className="flex-row gap-3">
              <TouchableOpacity
                className="flex-1 rounded-xl border border-border bg-muted py-3"
                onPress={onCancel}
                disabled={isLoading}>
                <Text className="text-center font-semibold text-foreground">Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity
                className={`flex-1 rounded-xl bg-primary py-3 ${isLoading ? 'opacity-50' : ''}`}
                onPress={onConfirm}
                disabled={isLoading}>
                <Text className="text-center font-semibold text-primary-foreground">
                  {isLoading ? 'Accepting...' : 'Accept'}
                </Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </Modal>
  );
}
