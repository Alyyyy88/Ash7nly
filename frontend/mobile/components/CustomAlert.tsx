import React from 'react';
import { View, Text, Modal, TouchableOpacity } from 'react-native';
import { AlertCircle, CheckCircle, XCircle, X } from 'lucide-react-native';

interface CustomAlertProps {
  visible: boolean;
  type?: 'success' | 'error' | 'info';
  title: string;
  message: string;
  onClose: () => void;
}

export function CustomAlert({ visible, type = 'info', title, message, onClose }: CustomAlertProps) {
  const config = {
    success: {
      icon: CheckCircle,
      color: 'text-green-500',
      bg: 'bg-green-500/10',
    },
    error: {
      icon: XCircle,
      color: 'text-destructive',
      bg: 'bg-destructive/10',
    },
    info: {
      icon: AlertCircle,
      color: 'text-primary',
      bg: 'bg-primary/10',
    },
  };

  const { icon: Icon, color, bg } = config[type];

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <TouchableOpacity className="flex-1 bg-black/50" activeOpacity={1} onPress={onClose}>
        <View className="flex-1 items-center justify-center px-6">
          <TouchableOpacity
            activeOpacity={1}
            className="w-full max-w-sm rounded-2xl bg-card p-6 shadow-xl"
            onPress={(e) => e.stopPropagation()}>
            {/* Close Button */}
            <TouchableOpacity
              className="absolute right-4 top-4 z-10 h-6 w-6 items-center justify-center"
              onPress={onClose}>
              <X size={16} className="text-muted-foreground" />
            </TouchableOpacity>

            {/* Icon */}
            <View className="mb-4 items-center">
              <View className={`h-14 w-14 items-center justify-center rounded-full ${bg}`}>
                <Icon size={28} className={color} />
              </View>
            </View>

            {/* Title */}
            <Text className="mb-2 text-center text-lg font-bold text-foreground">{title}</Text>

            {/* Message */}
            <Text className="mb-6 text-center text-sm text-muted-foreground">{message}</Text>

            {/* Button */}
            <TouchableOpacity className="rounded-xl bg-primary py-3" onPress={onClose}>
              <Text className="text-center font-semibold text-primary-foreground">OK</Text>
            </TouchableOpacity>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </Modal>
  );
}
