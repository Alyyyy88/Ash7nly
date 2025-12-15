import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Delivery } from '@/types/delivery';
import { Badge } from '@/components/ui/badge';
import { MapPin, Clock, Package as PackageIcon } from 'lucide-react-native';
import { formatStatus } from '@/lib/delivery-utils';

interface ActiveDeliveryCardProps {
  delivery: Delivery;
  onPress?: () => void;
}

export function ActiveDeliveryCard({ delivery, onPress }: ActiveDeliveryCardProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ASSIGNED':
        return 'bg-blue-500/10 text-blue-500';
      case 'PICKED_UP':
        return 'bg-orange-500/10 text-orange-500';
      case 'IN_TRANSIT':
        return 'bg-purple-500/10 text-purple-500';
      case 'DELIVERED':
        return 'bg-green-500/10 text-green-500';
      case 'FAILED':
        return 'bg-red-500/10 text-red-500';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
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
          <View className="h-8 w-8 items-center justify-center rounded-full bg-primary/10">
            <PackageIcon size={16} className="text-primary" />
          </View>
          <View>
            <Text className="text-sm font-bold text-foreground">#{delivery.shipmentId}</Text>
            <Text className="text-xs text-muted-foreground">
              {delivery.trackingNumber || 'No tracking'}
            </Text>
          </View>
        </View>
        <View className={`rounded-full px-3 py-1 ${getStatusColor(delivery.shipmentStatus)}`}>
          <Text className="text-xs font-semibold">{formatStatus(delivery.shipmentStatus)}</Text>
        </View>
      </View>

      {/* Recipient */}
      <View className="mb-3 flex-row items-center">
        <MapPin size={16} className="mr-2 text-muted-foreground" />
        <Text className="flex-1 text-sm font-medium text-foreground">{delivery.recipientName}</Text>
      </View>

      {/* Time info */}
      <View className="flex-row items-center justify-between border-t border-border pt-3">
        <View className="flex-row items-center">
          <Clock size={14} className="mr-1 text-muted-foreground" />
          <Text className="text-xs text-muted-foreground">
            Accepted: {formatDate(delivery.acceptedAt)}
          </Text>
        </View>
        {delivery.deliveryNotes && (
          <Text className="text-xs font-medium text-primary">View Notes</Text>
        )}
      </View>
    </TouchableOpacity>
  );
}
