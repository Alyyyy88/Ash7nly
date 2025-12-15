import React from 'react';
import { View, Text } from 'react-native';
import { getInitials } from '@/lib/delivery-utils';

interface UserAvatarProps {
  name: string;
  size?: 'sm' | 'md' | 'lg';
}

export function UserAvatar({ name, size = 'md' }: UserAvatarProps) {
  const sizeClasses = {
    sm: 'h-8 w-8 text-xs',
    md: 'h-10 w-10 text-sm',
    lg: 'h-16 w-16 text-xl',
  };

  const initials = getInitials(name);

  return (
    <View className={`items-center justify-center rounded-full bg-primary ${sizeClasses[size]}`}>
      <Text className="font-bold text-primary-foreground">{initials}</Text>
    </View>
  );
}
