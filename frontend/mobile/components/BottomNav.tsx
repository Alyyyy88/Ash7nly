import React from 'react-native';
import { View, Text, TouchableOpacity } from 'react-native';
import { LayoutDashboard, Box, History, User } from 'lucide-react-native';
import { useColorScheme } from 'nativewind';

type TabType = 'home' | 'deliveries' | 'history' | 'profile';

interface BottomNavProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
}

export function BottomNav({ activeTab, onTabChange }: BottomNavProps) {
  const { colorScheme } = useColorScheme();
  const inactiveColor = colorScheme === 'dark' ? '#94A3B8' : '#64748B';
  const activeColor = '#EF4444';

  return (
    <View className="border-t border-border bg-card px-2 py-3 shadow-lg">
      <View className="flex-row items-center justify-around">
        <TouchableOpacity
          className="flex-1 items-center justify-center py-2"
          onPress={() => onTabChange('home')}>
          <LayoutDashboard size={22} color={activeTab === 'home' ? activeColor : inactiveColor} />
          <Text
            className={`mt-1 text-xs font-medium ${
              activeTab === 'home' ? 'text-destructive' : 'text-muted-foreground'
            }`}>
            Home
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          className="flex-1 items-center justify-center py-2"
          onPress={() => onTabChange('deliveries')}>
          <Box size={22} color={activeTab === 'deliveries' ? activeColor : inactiveColor} />
          <Text
            className={`mt-1 text-xs font-medium ${
              activeTab === 'deliveries' ? 'text-destructive' : 'text-muted-foreground'
            }`}>
            Active
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          className="flex-1 items-center justify-center py-2"
          onPress={() => onTabChange('history')}>
          <History size={22} color={activeTab === 'history' ? activeColor : inactiveColor} />
          <Text
            className={`mt-1 text-xs font-medium ${
              activeTab === 'history' ? 'text-destructive' : 'text-muted-foreground'
            }`}>
            History
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          className="flex-1 items-center justify-center py-2"
          onPress={() => onTabChange('profile')}>
          <User size={22} color={activeTab === 'profile' ? activeColor : inactiveColor} />
          <Text
            className={`mt-1 text-xs font-medium ${
              activeTab === 'profile' ? 'text-destructive' : 'text-muted-foreground'
            }`}>
            Profile
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
