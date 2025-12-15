import React from 'react';
import { View, Text } from 'react-native';
import { LucideIcon } from 'lucide-react-native';

interface StatCardProps {
  icon: LucideIcon;
  title: string;
  value: number;
  iconColor?: string;
  iconBg?: string;
}

export function StatCard({
  icon: Icon,
  title,
  value,
  iconColor = 'text-primary',
  iconBg = 'bg-primary/10',
}: StatCardProps) {
  return (
    <View className="rounded-2xl border border-border bg-card p-4 shadow-sm">
      <View className="flex-row items-center justify-between">
        <View className="flex-1">
          <Text className="text-sm font-medium text-muted-foreground">{title}</Text>
          <Text className="mt-1 text-2xl font-bold text-foreground">{value}</Text>
        </View>
        <View className={`h-12 w-12 items-center justify-center rounded-full ${iconBg}`}>
          <Icon size={24} className={iconColor} />
        </View>
      </View>
    </View>
  );
}
