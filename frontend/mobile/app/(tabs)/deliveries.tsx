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
import { useActiveDeliveries } from '@/hooks/delivery';
import { useStatusUpdate } from '@/hooks/useStatusUpdate';
import { ActiveDeliveryCard } from '@/components/ActiveDeliveryCard';
import { StatusUpdateDialog } from '@/components/StatusUpdateDialog';
import { CustomAlert } from '@/components/CustomAlert';
import { StatCard } from '@/components/StatCard';
import { Package } from 'lucide-react-native';
import { getNextStatus } from '@/lib/delivery-utils';
import EmptyActiveState from '@/components/EmptyActiveState';

export default function DeliveriesScreen() {
  const { colorScheme } = useColorScheme();
  const { data, isLoading, refetch, isRefetching } = useActiveDeliveries();

  const {
    selectedDelivery,
    isDialogVisible,
    isUpdating,
    alertConfig,
    handleDeliveryPress,
    handleCloseDialog,
    handleConfirmUpdate,
    handleCancelUpdate,
    handleCloseAlert,
  } = useStatusUpdate();

  const deliveries = data?.data?.deliveries || [];
  const totalDeliveries = data?.data?.totalCount || 0;

  if (isLoading) {
    return (
      <SafeAreaView className="flex-1 bg-background">
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator size="large" className="text-primary" />
          <Text className="mt-4 text-muted-foreground">Loading deliveries...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-background">
      <View className="flex-1">
        {/* Header */}
        <View className="border-b border-border bg-card px-6 pb-4 pt-12">
          <Text className="text-2xl font-bold text-foreground">My Deliveries</Text>
          <Text className="mt-1 text-sm text-muted-foreground">Manage your active deliveries</Text>
        </View>

        {/* Stats */}
        <View className="px-6 py-4">
          <StatCard
            icon={Package}
            title="Active Deliveries"
            value={totalDeliveries}
            iconColor="text-primary"
            iconBg="bg-primary/10"
          />
        </View>

        {/* Delivery List */}
        <FlatList
          data={deliveries}
          renderItem={({ item }) => (
            <ActiveDeliveryCard delivery={item} onPress={() => handleDeliveryPress(item)} />
          )}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={{
            padding: 16,
            paddingTop: 0,
            paddingBottom: 16,
          }}
          refreshControl={
            <RefreshControl
              refreshing={isRefetching}
              onRefresh={refetch}
              colors={['#EF4444']}
              tintColor={colorScheme === 'dark' ? '#FFFFFF' : '#EF4444'}
            />
          }
          ListEmptyComponent={<EmptyActiveState />}
        />
      </View>

      {/* Status Update Dialog */}
      {selectedDelivery && (
        <StatusUpdateDialog
          visible={isDialogVisible}
          onClose={handleCloseDialog}
          onConfirm={handleConfirmUpdate}
          onCancel={handleCancelUpdate}
          isLoading={isUpdating}
          delivery={selectedDelivery}
          nextStatus={getNextStatus(selectedDelivery.shipmentStatus)}
        />
      )}

      {/* Alert */}
      <CustomAlert
        visible={alertConfig.visible}
        type={alertConfig.type}
        title={alertConfig.title}
        message={alertConfig.message}
        onClose={handleCloseAlert}
      />
    </SafeAreaView>
  );
}
