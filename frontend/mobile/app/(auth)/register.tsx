import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { useRegister } from '@/hooks/auth';
import { useRouter } from 'expo-router';
import { useForm, Controller } from 'react-hook-form';
import { RegisterRequest } from '@/types/auth';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { SERVICE_AREAS, VEHICLE_TYPES } from '@/data/register';
import { styles } from './Styles/registerStyles';

export default function RegisterScreen() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterRequest>({
    defaultValues: {
      username: '',
      fullName: '',
      email: '',
      password: '',
      vehicleType: 'BIKE',
      vehicleNumber: '',
      licenseNumber: '',
      serviceArea: 'HARAM',
    },
  });

  const router = useRouter();
  const { mutate: registerMutate } = useRegister();

  const onSubmit = (data: RegisterRequest) => {
    console.log('Registering:', data);

    registerMutate(data, {
      onSuccess: (response) => {
        console.log('Registration successful:', response);
        router.replace('/(auth)/login');
      },
      onError: (error) => {
        console.error('Registration failed:', error);
      },
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>Join Our Fleet</Text>
          <Text style={styles.subtitle}>Create your driver account</Text>
        </View>

        {/* Personal Info */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Personal Details</Text>

          <View className="mb-3">
            <Controller
              control={control}
              name="fullName"
              render={({ field: { onChange, value } }) => (
                <TextInput
                  style={styles.input}
                  placeholder="Full Name"
                  placeholderTextColor="#94A3B8"
                  value={value}
                  onChangeText={onChange}
                />
              )}
            />
            {errors.fullName && <Text style={{ color: 'red' }}>{errors.fullName.message}</Text>}
          </View>

          <View className="mb-3">
            <Controller
              control={control}
              name="username"
              render={({ field: { onChange, value } }) => (
                <TextInput
                  style={styles.input}
                  placeholder="Username"
                  placeholderTextColor="#94A3B8"
                  value={value}
                  onChangeText={onChange}
                  autoCapitalize="none"
                />
              )}
            />
            {errors.username && <Text style={{ color: 'red' }}>{errors.username.message}</Text>}
          </View>

          <View className="mb-3">
            <Controller
              control={control}
              name="email"
              render={({ field: { onChange, value } }) => (
                <TextInput
                  style={styles.input}
                  placeholder="Email Address"
                  placeholderTextColor="#94A3B8"
                  value={value}
                  onChangeText={onChange}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
              )}
            />
            {errors.email && <Text style={{ color: 'red' }}>{errors.email.message}</Text>}
          </View>

          <View className="mb-3">
            <Controller
              control={control}
              name="password"
              render={({ field: { onChange, value } }) => (
                <TextInput
                  style={styles.input}
                  placeholder="Password"
                  placeholderTextColor="#94A3B8"
                  value={value}
                  onChangeText={onChange}
                  secureTextEntry
                />
              )}
            />
            {errors.password && <Text style={{ color: 'red' }}>{errors.password.message}</Text>}
          </View>
        </View>

        {/* Vehicle Info */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Vehicle Information</Text>

          {/* Vehicle Type Dropdown */}
          <Controller
            control={control}
            name="vehicleType"
            render={({ field: { onChange, value } }) => (
              <Select
                defaultValue={{ value: value, label: value }}
                onValueChange={(option) => option && onChange(option.value)}>
                <SelectTrigger style={styles.dropdown}>
                  <SelectValue
                    placeholder="Select vehicle type"
                    className="native:text-lg text-sm text-foreground"
                  />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {VEHICLE_TYPES.map((type) => (
                      <SelectItem key={type.value} label={type.label} value={type.value}>
                        {type.label}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            )}
          />

          <Controller
            control={control}
            name="vehicleNumber"
            render={({ field: { onChange, value } }) => (
              <TextInput
                style={styles.input}
                placeholder="Vehicle Plate Number (XYZ123)"
                placeholderTextColor="#94A3B8"
                value={value}
                onChangeText={onChange}
                autoCapitalize="characters"
              />
            )}
          />

          <Controller
            control={control}
            name="licenseNumber"
            render={({ field: { onChange, value } }) => (
              <TextInput
                style={styles.input}
                placeholder="License Number (L-67890)"
                placeholderTextColor="#94A3B8"
                value={value}
                onChangeText={onChange}
              />
            )}
          />
        </View>

        {/* Service Area */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Service Area</Text>
          <Controller
            control={control}
            name="serviceArea"
            render={({ field: { onChange, value } }) => (
              <Select
                defaultValue={{ value: value, label: value }}
                onValueChange={(option) => option && onChange(option.value)}>
                <SelectTrigger style={styles.dropdown}>
                  <SelectValue
                    placeholder="Select service area"
                    className="native:text-lg text-sm text-foreground"
                  />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {SERVICE_AREAS.map((area) => (
                      <SelectItem key={area.value} label={area.label} value={area.value}>
                        {area.label}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            )}
          />
        </View>

        <TouchableOpacity style={styles.button} onPress={handleSubmit(onSubmit)}>
          <Text style={styles.buttonText}>Register Account</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}
