import React from 'react';
import { View, Text, TouchableOpacity, Modal } from 'react-native';
import { X, TrendingUp, AlertTriangle } from 'lucide-react-native';
import { Delivery } from '@/types/delivery';
import { formatStatus } from '@/lib/delivery-utils';

interface StatusUpdateDialogProps {
  visible: boolean;
  onClose: () => void;
  onConfirm: (status?: string) => void;
  onCancel: () => void;
  isLoading?: boolean;
  delivery: Delivery;
  nextStatus: string | null;
}

export function StatusUpdateDialog({
  visible,
  onClose,
  onConfirm,
  onCancel,
  isLoading = false,
  delivery,
  nextStatus,
}: StatusUpdateDialogProps) {
  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <TouchableOpacity className="flex-1 bg-black/50" activeOpacity={1} onPress={onClose}>
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
                <TrendingUp size={32} className="text-primary" />
              </View>
            </View>

            {/* Title */}
            <Text className="mb-2 text-center text-xl font-bold text-foreground">
              Update Delivery Status
            </Text>

            {/* Description */}
            {nextStatus ? (
              <Text className="mb-6 text-center text-sm text-muted-foreground">
                Move delivery #{delivery.shipmentId} to the next stage
              </Text>
            ) : (
              <View className="mb-6 items-center">
                <AlertTriangle size={24} className="mb-2 text-amber-500" />
                <Text className="text-center text-sm text-muted-foreground">
                  This delivery is already at the final status
                </Text>
              </View>
            )}

            {/* Status Transition */}
            {nextStatus && (
              <View className="mb-6 rounded-xl bg-muted/50 p-4">
                <View className="flex-row items-center justify-between">
                  <View className="flex-1">
                    <Text className="mb-1 text-xs font-medium text-muted-foreground">
                      Current Status
                    </Text>
                    <Text className="text-sm font-bold text-foreground">
                      {formatStatus(delivery.shipmentStatus)}
                    </Text>
                  </View>
                  <Text className="px-4 text-2xl text-muted-foreground">→</Text>
                  <View className="flex-1">
                    <Text className="mb-1 text-xs font-medium text-muted-foreground">
                      New Status
                    </Text>
                    <Text className="text-sm font-bold text-primary">
                      {formatStatus(nextStatus)}
                    </Text>
                  </View>
                </View>

                {/* Recipient */}
                <View className="mt-3 border-t border-border pt-3">
                  <Text className="text-xs font-medium text-muted-foreground">Recipient</Text>
                  <Text className="text-sm font-semibold text-foreground">
                    {delivery.recipientName}
                  </Text>
                </View>
              </View>
            )}

            {/* Actions */}
            <View className="gap-3">
              {nextStatus ? (
                <>
                  <View className="flex-row gap-3">
                    <TouchableOpacity
                      className="flex-1 rounded-xl border border-border bg-muted py-3"
                      onPress={onCancel}
                      disabled={isLoading}>
                      <Text className="text-center font-semibold text-foreground">Cancel</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      className={`flex-1 rounded-xl bg-primary py-3 ${isLoading ? 'opacity-50' : ''}`}
                      onPress={() => onConfirm()}
                      disabled={isLoading}>
                      <Text className="text-center font-semibold text-primary-foreground">
                        {isLoading ? 'Updating...' : 'Confirm'}
                      </Text>
                    </TouchableOpacity>
                  </View>

                  {/* Mark as Failed Button */}
                  {delivery.shipmentStatus !== 'DELIVERED' &&
                    delivery.shipmentStatus !== 'FAILED' && (
                      <TouchableOpacity
                        className={`rounded-xl border-2 border-red-500 bg-red-500/10 py-3 ${isLoading ? 'opacity-50' : ''}`}
                        onPress={() => onConfirm('FAILED')}
                        disabled={isLoading}>
                        <Text className="text-center font-semibold text-red-500">
                          Mark as Failed
                        </Text>
                      </TouchableOpacity>
                    )}
                </>
              ) : (
                <TouchableOpacity className="rounded-xl bg-muted py-3" onPress={onClose}>
                  <Text className="text-center font-semibold text-foreground">Close</Text>
                </TouchableOpacity>
              )}
            </View>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </Modal>
  );
}
