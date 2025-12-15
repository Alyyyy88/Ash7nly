import React from 'react';
import { View, Text } from 'react-native';
import { Package } from 'lucide-react-native';
import { useAuthStore } from '@/stores/auth';
import { UserAvatar } from '@/components/UserAvatar';
import { ThemeToggle } from '@/components/ThemeToggle';

interface HeaderProps {
  title: string;
  subtitle: string;
}

export function Header({ title, subtitle }: HeaderProps) {
  const { user } = useAuthStore();

  return (
    <View className="border-b border-border bg-card px-6 pb-4 pt-12">
      {/* User Info */}
      <View className="mb-4 flex-row items-center justify-between">
        <View className="flex-row items-center gap-3">
          <UserAvatar name={user?.fullName || 'User'} size="md" />
          <View>
            <Text className="text-sm font-medium text-muted-foreground">Welcome back,</Text>
            <Text className="text-base font-bold text-foreground">{user?.fullName}</Text>
          </View>
        </View>
        <ThemeToggle />
      </View>

      {/* Title Section */}
      <View className="flex-row items-center justify-between">
        <View className="flex-1">
          <Text className="text-2xl font-bold text-foreground">{title}</Text>
          <Text className="mt-1 text-sm text-muted-foreground">{subtitle}</Text>
        </View>
        <View className="h-12 w-12 items-center justify-center rounded-full bg-primary/10">
          <Package size={24} className="text-primary" />
        </View>
      </View>
    </View>
  );
}
