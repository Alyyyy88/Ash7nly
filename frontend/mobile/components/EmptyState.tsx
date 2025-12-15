import React from 'react';
import { View, Text } from 'react-native';
import { MapPin } from 'lucide-react-native';
import { useColorScheme } from 'nativewind';

interface EmptyStateProps {
  title?: string;
  message?: string;
}

export function EmptyState({ title, message }: EmptyStateProps) {
  const { colorScheme } = useColorScheme();
  const iconColor = colorScheme === 'dark' ? '#64748B' : '#94A3B8';

  return (
    <View className="flex-1 items-center justify-center py-20">
      <View className="mb-4 h-20 w-20 items-center justify-center rounded-full bg-muted">
        <MapPin size={40} color={iconColor} />
      </View>
      <Text className="mb-2 text-lg font-semibold text-foreground">
        {title || 'No Deliveries Available'}
      </Text>
      <Text className="px-8 text-center text-muted-foreground">
        {message || 'Check back later for new delivery opportunities'}
      </Text>
    </View>
  );
}
