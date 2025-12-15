import React from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { Controller, Control, FieldErrors } from 'react-hook-form';
import { User, Phone, Mail, Car, MapPin } from 'lucide-react-native';
import { useColorScheme } from 'nativewind';
import { ProfileData } from '@/types/profile';

interface ProfileFormProps {
  control: Control<ProfileData>;
  errors: FieldErrors<ProfileData>;
  isEditing: boolean;
}

const VEHICLE_TYPES = [
  { label: 'BIKE', value: 'BIKE' },
  { label: 'Car', value: 'CAR' },
  { label: 'Van', value: 'VAN' },
  { label: 'Truck', value: 'TRUCK' },
];

const SERVICE_AREAS = [
  { label: 'Helwan', value: 'HELWAN' },
  { label: 'Haram', value: 'HARAM' },
  { label: 'Maadi', value: 'MAADI' },
  { label: 'Faisal', value: 'FAISAL' },
  { label: 'IMBABA', value: 'IMBABA' },
  { label: 'DOKKIl', value: 'DOKKIl' },
  { label: 'ZAMALEK', value: 'ZAMALEK' },
  { label: 'ROD_ELFARAG', value: 'ROD_ELFARAG' },
  { label: 'NASR_CITY', value: 'NASR_CITY' },
];

export function ProfileForm({ control, errors, isEditing }: ProfileFormProps) {
  const { colorScheme } = useColorScheme();
  const iconColor = colorScheme === 'dark' ? '#94A3B8' : '#64748B';

  return (
    <View className="rounded-2xl border border-border bg-card p-6">
      <Text className="mb-4 text-lg font-bold text-foreground">Profile Information</Text>

      {/* Name */}
      <View className="mb-4">
        <View className="mb-2 flex-row items-center gap-2">
          <User size={18} color={iconColor} />
          <Text className="text-sm font-medium text-muted-foreground">Full Name</Text>
        </View>
        <Controller
          control={control}
          name="fullName"
          rules={{ required: 'Name is required' }}
          render={({ field: { onChange, value } }) =>
            isEditing ? (
              <TextInput
                className="rounded-xl border border-border bg-background px-4 py-3 text-foreground"
                value={value}
                onChangeText={onChange}
                placeholder="Enter your name"
                placeholderTextColor="#94A3B8"
              />
            ) : (
              <Text className="text-base font-semibold text-foreground">{value}</Text>
            )
          }
        />
        {errors.fullName && (
          <Text className="mt-1 text-xs text-red-500">{errors.fullName.message}</Text>
        )}
      </View>

      {/* Email */}
      <View className="mb-4">
        <View className="mb-2 flex-row items-center gap-2">
          <Mail size={18} color={iconColor} />
          <Text className="text-sm font-medium text-muted-foreground">Email</Text>
        </View>
        <Controller
          control={control}
          name="email"
          rules={{
            required: 'Email is required',
            pattern: { value: /^\S+@\S+$/i, message: 'Invalid email' },
          }}
          render={({ field: { onChange, value } }) =>
            isEditing ? (
              <TextInput
                className="rounded-xl border border-border bg-background px-4 py-3 text-foreground"
                value={value}
                onChangeText={onChange}
                placeholder="Enter your email"
                placeholderTextColor="#94A3B8"
                keyboardType="email-address"
              />
            ) : (
              <Text className="text-base font-semibold text-foreground">{value}</Text>
            )
          }
        />
        {errors.email && <Text className="mt-1 text-xs text-red-500">{errors.email.message}</Text>}
      </View>

      {/* Phone */}
      <View className="mb-4">
        <View className="mb-2 flex-row items-center gap-2">
          <Phone size={18} color={iconColor} />
          <Text className="text-sm font-medium text-muted-foreground">Phone Number</Text>
        </View>
        <Controller
          control={control}
          name="phoneNumber"
          rules={{ required: 'Phone number is required' }}
          render={({ field: { onChange, value } }) =>
            isEditing ? (
              <TextInput
                className="rounded-xl border border-border bg-background px-4 py-3 text-foreground"
                value={value}
                onChangeText={onChange}
                placeholder="Enter your phone number"
                placeholderTextColor="#94A3B8"
                keyboardType="phone-pad"
              />
            ) : (
              <Text className="text-base font-semibold text-foreground">{value}</Text>
            )
          }
        />
        {errors.phoneNumber && (
          <Text className="mt-1 text-xs text-red-500">{errors.phoneNumber.message}</Text>
        )}
      </View>

      {/* Vehicle Type */}
      <View className="mb-4">
        <View className="mb-2 flex-row items-center gap-2">
          <Car size={18} color={iconColor} />
          <Text className="text-sm font-medium text-muted-foreground">Vehicle Type</Text>
        </View>
        <Controller
          control={control}
          name="vehicleType"
          render={({ field: { onChange, value } }) =>
            isEditing ? (
              <View className="rounded-xl border border-border bg-background">
                {VEHICLE_TYPES.map((vehicle, index) => (
                  <TouchableOpacity
                    key={vehicle.value}
                    className={`px-4 py-3 ${
                      index < VEHICLE_TYPES.length - 1 ? 'border-b border-border' : ''
                    } ${value === vehicle.value ? 'bg-primary/10' : ''}`}
                    onPress={() => onChange(vehicle.value)}>
                    <Text
                      className={`font-medium ${
                        value === vehicle.value ? 'text-primary' : 'text-foreground'
                      }`}>
                      {vehicle.label}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            ) : (
              <Text className="text-base font-semibold text-foreground">
                {VEHICLE_TYPES.find((v) => v.value === value)?.label || 'N/A'}
              </Text>
            )
          }
        />
      </View>

      {/* Service Area */}
      <View>
        <View className="mb-2 flex-row items-center gap-2">
          <MapPin size={18} color={iconColor} />
          <Text className="text-sm font-medium text-muted-foreground">Service Area</Text>
        </View>
        <Controller
          control={control}
          name="serviceArea"
          render={({ field: { onChange, value } }) =>
            isEditing ? (
              <View className="rounded-xl border border-border bg-background">
                {SERVICE_AREAS.map((area, index) => (
                  <TouchableOpacity
                    key={area.value}
                    className={`px-4 py-3 ${
                      index < SERVICE_AREAS.length - 1 ? 'border-b border-border' : ''
                    } ${value === area.value ? 'bg-primary/10' : ''}`}
                    onPress={() => onChange(area.value)}>
                    <Text
                      className={`font-medium ${
                        value === area.value ? 'text-primary' : 'text-foreground'
                      }`}>
                      {area.label}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            ) : (
              <Text className="text-base font-semibold text-foreground">
                {SERVICE_AREAS.find((a) => a.value === value)?.label || 'N/A'}
              </Text>
            )
          }
        />
      </View>
    </View>
  );
}
