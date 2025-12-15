import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import { router } from 'expo-router';
import { useDriverInfo } from '@/hooks/driver';
import { useAuthStore } from '@/stores/auth';
import { LogOut, Save } from 'lucide-react-native';
import { UserAvatar } from '@/components/UserAvatar';
import { CustomAlert } from '@/components/CustomAlert';
import { ProfileForm } from '@/components/ProfileForm';
import { useProfileForm } from '@/hooks/useProfileForm';

export default function ProfileScreen() {
  const { data: driverInfo, isLoading } = useDriverInfo();
  const { logout, user } = useAuthStore();

  const {
    control,
    errors,
    isEditing,
    isUpdating,
    alertConfig,
    handleEdit,
    handleCancel,
    handleSave,
    handleCloseAlert,
  } = useProfileForm(
    {
      fullName: driverInfo?.data?.fullName || '',
      email: driverInfo?.data?.email || '',
      phoneNumber: driverInfo?.data?.phoneNumber || '',
      vehicleType: driverInfo?.data?.vehicleType || 'BIKE',
      serviceArea: driverInfo?.data?.serviceArea || 'HELWAN',
    },
    driverInfo?.data?.id
  );

  const handleLogout = () => {
    logout();
    router.replace('/(auth)/login');
  };

  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center bg-background">
        <ActivityIndicator size="large" color="#3B82F6" />
      </View>
    );
  }

  return (
    <ScrollView className="flex-1 bg-background">
      <View className="p-6">
        {/* Profile Header */}
        <View className="mb-6 items-center">
          <UserAvatar name={user?.fullName || driverInfo?.data?.fullName || ''} size="lg" />
          <Text className="mt-4 text-2xl font-bold text-foreground">
            {user?.fullName || driverInfo?.data?.fullName}
          </Text>
          <Text className="mt-1 text-sm text-muted-foreground">{driverInfo?.data?.email}</Text>
        </View>

        {/* Profile Information Card */}
        <View className="mb-6">
          <ProfileForm control={control} errors={errors} isEditing={isEditing} />
        </View>

        {/* Action Buttons */}
        <View className="gap-3">
          {isEditing ? (
            <>
              <TouchableOpacity
                className={`flex-row items-center justify-center gap-2 rounded-xl bg-primary py-4 ${
                  isUpdating ? 'opacity-50' : ''
                }`}
                onPress={handleSave}
                disabled={isUpdating}>
                <Save size={20} color="#FFFFFF" />
                <Text className="text-base font-semibold text-primary-foreground">
                  {isUpdating ? 'Saving...' : 'Save Changes'}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                className="rounded-xl border border-border bg-muted py-4"
                onPress={handleCancel}
                disabled={isUpdating}>
                <Text className="text-center text-base font-semibold text-foreground">Cancel</Text>
              </TouchableOpacity>
            </>
          ) : (
            <>
              <TouchableOpacity
                className="rounded-xl border border-primary bg-primary/10 py-4"
                onPress={handleEdit}>
                <Text className="text-center text-base font-semibold text-primary">
                  Edit Profile
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                className="flex-row items-center justify-center gap-2 rounded-xl border-2 border-red-500 bg-red-500/10 py-4"
                onPress={handleLogout}>
                <LogOut size={20} color="#EF4444" />
                <Text className="text-base font-semibold text-red-500">Logout</Text>
              </TouchableOpacity>
            </>
          )}
        </View>
      </View>

      {/* Alert */}
      <CustomAlert
        visible={alertConfig.visible}
        type={alertConfig.type}
        title={alertConfig.title}
        message={alertConfig.message}
        onClose={handleCloseAlert}
      />
    </ScrollView>
  );
}
