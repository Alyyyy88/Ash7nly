import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  RefreshControl,
  ActivityIndicator,
  SafeAreaView,
} from 'react-native';
import { useColorScheme } from 'nativewind';
import { useAvailableDeliveries, useActiveDeliveries } from '@/hooks/delivery';
import { useDeliveryActions } from '@/hooks/useDeliveryActions';
import { useStatusUpdate } from '@/hooks/useStatusUpdate';
import { DeliveryCard } from '@/components/DeliveryCard';
import { DeliveryConfirmDialog } from '@/components/DeliveryConfirmDialog';
import { CustomAlert } from '@/components/CustomAlert';
import { Header } from '@/components/Header';
import { BottomNav } from '@/components/BottomNav';
import { EmptyState } from '@/components/EmptyState';
import { ActiveDeliveryCard } from '@/components/ActiveDeliveryCard';
import { StatusUpdateDialog } from '@/components/StatusUpdateDialog';
import { OTPVerificationDialog } from '@/components/OTPVerificationDialog';
import { StatCard } from '@/components/StatCard';
import { Package } from 'lucide-react-native';
import { getNextStatus } from '@/lib/delivery-utils';
import ProfileScreen from './profile';
import HistoryScreen from './history';

type TabType = 'home' | 'deliveries' | 'history' | 'profile';

export default function HomeScreen() {
  const { colorScheme } = useColorScheme();
  const [activeTab, setActiveTab] = useState<TabType>('home');

  const { data, isLoading, refetch, isRefetching } = useAvailableDeliveries();

  // Active deliveries (deliveries tab)
  const {
    data: activeData,
    isLoading: isLoadingActive,
    refetch: refetchActive,
    isRefetching: isRefetchingActive,
  } = useActiveDeliveries();

  // Home tab logic
  const {
    selectedDelivery: selectedAvailableDelivery,
    isDialogVisible: isAcceptDialogVisible,
    isAccepting,
    alertConfig: acceptAlertConfig,
    handleDeliveryPress,
    handleCloseDialog: handleCloseAcceptDialog,
    handleConfirmAccept,
    handleCancelAccept,
    handleCloseAlert: handleCloseAcceptAlert,
  } = useDeliveryActions();

  // Deliveries tab logic
  const {
    selectedDelivery: selectedActiveDelivery,
    isDialogVisible: isStatusDialogVisible,
    isUpdating,
    alertConfig: statusAlertConfig,
    handleDeliveryPress: handleActiveDeliveryPress,
    handleCloseDialog: handleCloseStatusDialog,
    handleConfirmUpdate,
    handleCancelUpdate,
    handleCloseAlert: handleCloseStatusAlert,
  } = useStatusUpdate();

  const deliveries = data?.data || [];
  const activeDeliveries = activeData?.data?.deliveries || [];
  const totalActive = activeData?.data?.totalCount || 0;

  const renderHomeTab = () => {
    if (isLoading) {
      return (
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator size="large" className="text-primary" />
          <Text className="mt-4 text-muted-foreground">Loading deliveries...</Text>
        </View>
      );
    }

    return (
      <>
        <Header title="Available Deliveries" subtitle={`${deliveries.length} deliveries waiting`} />
        <FlatList
          data={deliveries}
          renderItem={({ item }) => (
            <DeliveryCard delivery={item} onPress={() => handleDeliveryPress(item)} />
          )}
          keyExtractor={(item) => item.shipmentId.toString()}
          contentContainerStyle={{ padding: 16, paddingBottom: 16 }}
          refreshControl={
            <RefreshControl
              refreshing={isRefetching}
              onRefresh={refetch}
              colors={['#EF4444']}
              tintColor={colorScheme === 'dark' ? '#FFFFFF' : '#EF4444'}
            />
          }
          ListEmptyComponent={<EmptyState />}
        />
      </>
    );
  };

  const renderDeliveriesTab = () => {
    if (isLoadingActive) {
      return (
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator size="large" className="text-primary" />
          <Text className="mt-4 text-muted-foreground">Loading active deliveries...</Text>
        </View>
      );
    }

    return (
      <>
        <View className="border-b border-border bg-card px-6 pb-4 pt-12">
          <Text className="text-2xl font-bold text-foreground">My Deliveries</Text>
          <Text className="mt-1 text-sm text-muted-foreground">Manage your active deliveries</Text>
        </View>
        <View className="px-6 py-4">
          <StatCard
            icon={Package}
            title="Active Deliveries"
            value={totalActive}
            iconColor="text-primary"
            iconBg="bg-primary/10"
          />
        </View>
        <FlatList
          data={activeDeliveries}
          renderItem={({ item }) => (
            <ActiveDeliveryCard delivery={item} onPress={() => handleActiveDeliveryPress(item)} />
          )}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={{ padding: 16, paddingTop: 0, paddingBottom: 16 }}
          refreshControl={
            <RefreshControl
              refreshing={isRefetchingActive}
              onRefresh={refetchActive}
              colors={['#EF4444']}
              tintColor={colorScheme === 'dark' ? '#FFFFFF' : '#EF4444'}
            />
          }
          ListEmptyComponent={<EmptyState />}
        />
      </>
    );
  };

  const renderHistoryTab = () => {
    return <HistoryScreen />;
  };

  const renderProfileTab = () => {
    return <ProfileScreen />;
  };

  return (
    <SafeAreaView className="flex-1 bg-background">
      <View className="flex-1">
        {activeTab === 'home' && renderHomeTab()}
        {activeTab === 'deliveries' && renderDeliveriesTab()}
        {activeTab === 'history' && renderHistoryTab()}
        {activeTab === 'profile' && renderProfileTab()}

        <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />
      </View>

      {/* Accept Delivery Dialog */}
      {selectedAvailableDelivery && (
        <DeliveryConfirmDialog
          visible={isAcceptDialogVisible}
          onClose={handleCloseAcceptDialog}
          onConfirm={handleConfirmAccept}
          onCancel={handleCancelAccept}
          isLoading={isAccepting}
          pickupAddress={selectedAvailableDelivery.pickupAdress}
          dropoffAddress={selectedAvailableDelivery.deliveryAdress}
          cost={selectedAvailableDelivery.cost}
        />
      )}

      {/* Status Update Dialog */}
      {selectedActiveDelivery && (
        <StatusUpdateDialog
          visible={isStatusDialogVisible}
          onClose={handleCloseStatusDialog}
          onConfirm={handleConfirmUpdate}
          onCancel={handleCancelUpdate}
          isLoading={isUpdating}
          delivery={selectedActiveDelivery}
          nextStatus={getNextStatus(selectedActiveDelivery.shipmentStatus)}
        />
      )}


      {/* Alerts */}
      <CustomAlert
        visible={acceptAlertConfig.visible}
        type={acceptAlertConfig.type}
        title={acceptAlertConfig.title}
        message={acceptAlertConfig.message}
        onClose={handleCloseAcceptAlert}
      />
      <CustomAlert
        visible={statusAlertConfig.visible}
        type={statusAlertConfig.type}
        title={statusAlertConfig.title}
        message={statusAlertConfig.message}
        onClose={handleCloseStatusAlert}
      />
    </SafeAreaView>
  );
}
