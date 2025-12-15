import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { AvailableDelivery } from '@/types/delivery';
import { Badge } from '@/components/ui/badge';

interface DeliveryCardProps {
  delivery: AvailableDelivery;
  onPress?: () => void;
}

export function DeliveryCard({ delivery, onPress }: DeliveryCardProps) {
  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });
  };

  return (
    <TouchableOpacity
      className="mb-4 rounded-2xl border border-border bg-card p-4 shadow-sm"
      activeOpacity={0.7}
      onPress={onPress}>
      {/* Header with Priority Badge and Time */}
      <View className="mb-3 flex-row items-center justify-between">
        <Badge variant="destructive">
          <Text className="text-xs font-semibold">Priority</Text>
        </Badge>
        <Text className="text-xs font-medium text-muted-foreground">
          {formatTime(delivery.createdAt)}
        </Text>
      </View>

      {/* Pickup Location */}
      <View className="mb-3 flex-row items-start">
        <View className="mr-3 mt-0.5 h-5 w-5 items-center justify-center rounded-full bg-destructive">
          <View className="h-2 w-2 rounded-full bg-white" />
        </View>
        <View className="flex-1">
          <Text className="mb-1 text-xs text-muted-foreground">Pickup</Text>
          <Text className="text-sm font-semibold text-foreground">{delivery.pickupAdress}</Text>
        </View>
      </View>

      {/* Connecting Line */}
      <View className="mb-2 ml-2 h-4 w-0.5 bg-border" />

      {/* Dropoff Location */}
      <View className="flex-row items-start">
        <View className="mr-3 mt-0.5 h-5 w-5 items-center justify-center rounded-full bg-green-500">
          <View className="h-2 w-2 rounded-full bg-white" />
        </View>
        <View className="flex-1">
          <Text className="mb-1 text-xs text-muted-foreground">Dropoff</Text>
          <Text className="text-sm font-semibold text-foreground">{delivery.deliveryAdress}</Text>
        </View>
      </View>

      {/* Footer - Customer & Cost */}
      <View className="mt-4 flex-row items-center justify-between border-t border-border pt-3">
        <View>
          <Text className="text-xs text-muted-foreground">Customer</Text>
          <Text className="text-sm font-medium text-foreground">{delivery.customerName}</Text>
        </View>
        <View className="rounded-lg bg-primary/10 px-3 py-1.5">
          <Text className="text-sm font-bold text-primary">${delivery.cost}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}
