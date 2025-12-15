import React from 'react';
import {
  View,
  Text,
  FlatList,
  RefreshControl,
  ActivityIndicator,
  SafeAreaView,
} from 'react-native';
import { useColorScheme } from 'nativewind';
import { useDriverHistory } from '@/hooks/driver';
import { HistoryDeliveryCard } from '@/components/HistoryDeliveryCard';
import { EmptyState } from '@/components/EmptyState';
import { History, CheckCircle, XCircle } from 'lucide-react-native';
import { StatCard } from '@/components/StatCard';

export default function HistoryScreen() {
  const { colorScheme } = useColorScheme();
  const { data, isLoading, refetch, isRefetching } = useDriverHistory();

  console.log('Full response:', data?.data);

  const deliveries = data?.data?.deliveries || [];
  const totalDelivered = deliveries.filter((d: any) => d.shipmentStatus === 'DELIVERED').length;
  const totalFailed = deliveries.filter((d: any) => d.shipmentStatus === 'FAILED').length;

  if (isLoading) {
    return (
      <SafeAreaView className="flex-1 bg-background">
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator size="large" color="#3B82F6" />
          <Text className="mt-4 text-muted-foreground">Loading history...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-background">
      {/* Header */}
      <View className="border-b border-border bg-card px-6 pb-4 pt-12">
        <View className="mb-4 flex-row items-center gap-3">
          <View className="h-12 w-12 items-center justify-center rounded-full bg-primary/10">
            <History size={24} color="#3B82F6" />
          </View>
          <View>
            <Text className="text-2xl font-bold text-foreground">Delivery History</Text>
            <Text className="text-sm text-muted-foreground">
              {deliveries.length} total deliveries
            </Text>
          </View>
        </View>
      </View>

      {/* Stats */}
      <View className="flex-row gap-3 px-6 py-4">
        <View className="flex-1">
          <StatCard
            icon={CheckCircle}
            title="Delivered"
            value={totalDelivered}
            iconColor="text-green-500"
            iconBg="bg-green-500/10"
          />
        </View>
        <View className="flex-1">
          <StatCard
            icon={XCircle}
            title="Failed"
            value={totalFailed}
            iconColor="text-red-500"
            iconBg="bg-red-500/10"
          />
        </View>
      </View>

      {/* List */}
      <FlatList
        data={deliveries}
        renderItem={({ item }) => <HistoryDeliveryCard delivery={item} />}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ padding: 16, paddingTop: 0 }}
        refreshControl={
          <RefreshControl
            refreshing={isRefetching}
            onRefresh={refetch}
            colors={['#3B82F6']}
            tintColor={colorScheme === 'dark' ? '#FFFFFF' : '#3B82F6'}
          />
        }
        ListEmptyComponent={() => (
          <EmptyState title="No History" message="Your completed deliveries will appear here" />
        )}
      />
    </SafeAreaView>
  );
}
