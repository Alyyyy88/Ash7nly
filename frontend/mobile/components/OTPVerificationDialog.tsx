import React, { useState } from 'react';
import { View, Text, Modal, TouchableOpacity, TextInput } from 'react-native';
import { X, ShieldCheck } from 'lucide-react-native';

interface OTPVerificationDialogProps {
  visible: boolean;
  onClose: () => void;
  onVerify: (otp: string) => void;
  isLoading?: boolean;
}

export function OTPVerificationDialog({
  visible,
  onClose,
  onVerify,
  isLoading = false,
}: OTPVerificationDialogProps) {
  const [otp, setOtp] = useState('');

  const handleVerify = () => {
    if (otp.length === 6) {
      onVerify(otp);
    }
  };

  const handleClose = () => {
    setOtp('');
    onClose();
  };

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={handleClose}>
      <TouchableOpacity className="flex-1 bg-black/50" activeOpacity={1} onPress={handleClose}>
        <View className="flex-1 items-center justify-center px-6">
          <TouchableOpacity
            activeOpacity={1}
            className="w-full max-w-md rounded-3xl bg-card p-6 shadow-xl"
            onPress={(e) => e.stopPropagation()}>
            {/* Close Button */}
            <TouchableOpacity
              className="absolute right-4 top-4 z-10 h-8 w-8 items-center justify-center rounded-full bg-muted"
              onPress={handleClose}>
              <X size={18} className="text-foreground" />
            </TouchableOpacity>

            {/* Icon */}
            <View className="mb-4 items-center">
              <View className="h-16 w-16 items-center justify-center rounded-full bg-green-500/10">
                <ShieldCheck size={32} className="text-green-500" />
              </View>
            </View>

            {/* Title */}
            <Text className="mb-2 text-center text-xl font-bold text-foreground">
              Verify Delivery
            </Text>

            {/* Description */}
            <Text className="mb-6 text-center text-sm text-muted-foreground">
              Enter the 6-digit OTP from the customer to confirm delivery
            </Text>

            {/* OTP Input */}
            <View className="mb-6">
              <TextInput
                className="rounded-xl border-2 border-border bg-background px-4 py-4 text-center text-2xl font-bold tracking-widest text-foreground"
                placeholder="000000"
                placeholderTextColor="#94A3B8"
                value={otp}
                onChangeText={(text) => setOtp(text.replace(/[^0-9]/g, '').slice(0, 6))}
                keyboardType="number-pad"
                maxLength={6}
                autoFocus
              />
              <Text className="mt-2 text-center text-xs text-muted-foreground">
                {otp.length}/6 digits
              </Text>
            </View>

            {/* Actions */}
            <View className="flex-row gap-3">
              <TouchableOpacity
                className="flex-1 rounded-xl border border-border bg-muted py-3"
                onPress={handleClose}
                disabled={isLoading}>
                <Text className="text-center font-semibold text-foreground">Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity
                className={`flex-1 rounded-xl bg-green-500 py-3 ${
                  otp.length !== 6 || isLoading ? 'opacity-50' : ''
                }`}
                onPress={handleVerify}
                disabled={otp.length !== 6 || isLoading}>
                <Text className="text-center font-semibold text-white">
                  {isLoading ? 'Verifying...' : 'Verify'}
                </Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </Modal>
  );
}
