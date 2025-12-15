import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Delivery } from '@/types/delivery';
import { MapPin, Clock, Package as PackageIcon, DollarSign } from 'lucide-react-native';
import { formatStatus } from '@/lib/delivery-utils';
import { useColorScheme } from 'nativewind';

interface HistoryDeliveryCardProps {
  delivery: Delivery;
  onPress?: () => void;
}

export function HistoryDeliveryCard({ delivery, onPress }: HistoryDeliveryCardProps) {
  const { colorScheme } = useColorScheme();
  const iconColor = colorScheme === 'dark' ? '#94A3B8' : '#64748B';

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'DELIVERED':
        return 'bg-green-500/10 text-green-500 border-green-500/20';
      case 'FAILED':
        return 'bg-red-500/10 text-red-500 border-red-500/20';
      case 'CANCELLED':
        return 'bg-gray-500/10 text-gray-500 border-gray-500/20';
      default:
        return 'bg-muted text-muted-foreground border-border';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <TouchableOpacity
      className="mb-4 rounded-2xl border border-border bg-card p-4 shadow-sm"
      activeOpacity={0.7}
      onPress={onPress}>
      {/* Header */}
      <View className="mb-3 flex-row items-center justify-between">
        <View className="flex-row items-center gap-2">
          <View className="h-10 w-10 items-center justify-center rounded-full bg-primary/10">
            <PackageIcon size={18} color="#3B82F6" />
          </View>
          <View>
            <Text className="text-base font-bold text-foreground">#{delivery.shipmentId}</Text>
            <Text className="text-xs text-muted-foreground">
              {delivery.trackingNumber || 'No tracking'}
            </Text>
          </View>
        </View>
        <View
          className={`rounded-full border px-3 py-1.5 ${getStatusColor(delivery.shipmentStatus)}`}>
          <Text className="text-xs font-semibold">{formatStatus(delivery.shipmentStatus)}</Text>
        </View>
      </View>

      {/* Addresses */}
      <View className="mb-3 gap-2">
        <View className="flex-row items-start">
          <MapPin size={16} color={iconColor} className="mr-2 mt-0.5" />
          <View className="flex-1">
            <Text className="text-xs text-muted-foreground">Pickup</Text>
            <Text className="text-sm font-medium text-foreground" numberOfLines={1}>
              {delivery.pickupAdress}
            </Text>
          </View>
        </View>
        <View className="flex-row items-start">
          <MapPin size={16} color="#EF4444" className="mr-2 mt-0.5" />
          <View className="flex-1">
            <Text className="text-xs text-muted-foreground">Dropoff</Text>
            <Text className="text-sm font-medium text-foreground" numberOfLines={1}>
              {delivery.deliveryAdress}
            </Text>
          </View>
        </View>
      </View>

      {/* Recipient */}
      <View className="mb-3 rounded-lg bg-muted/50 p-3">
        <Text className="text-xs text-muted-foreground">Recipient</Text>
        <Text className="text-sm font-semibold text-foreground">{delivery.recipientName}</Text>
      </View>

      {/* Footer */}
      <View className="flex-row items-center justify-between border-t border-border pt-3">
        <View className="flex-row items-center">
          <Clock size={14} color={iconColor} className="mr-1" />
          <Text className="text-xs text-muted-foreground">
            {delivery.deliveredAt
              ? formatDate(delivery.deliveredAt)
              : formatDate(delivery.acceptedAt)}
          </Text>
        </View>
        {delivery.cost && (
          <View className="flex-row items-center">
            <DollarSign size={14} color="#22C55E" className="mr-0.5" />
            <Text className="text-sm font-bold text-green-500">{delivery.cost}</Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
}
