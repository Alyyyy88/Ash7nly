import React, { useState } from 'react';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BottomNav } from '@/components/BottomNav';
import HomeScreen from './home';
import DeliveriesScreen from './deliveries';
import ProfileScreen from './profile';
import HistoryScreen from './history';

type TabType = 'home' | 'deliveries' | 'history' | 'profile';

export default function TabsScreen() {
  const [activeTab, setActiveTab] = useState<TabType>('home');

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return <HomeScreen />;
      case 'deliveries':
        return <DeliveriesScreen />;
      case 'history':
        return <HistoryScreen />;
      case 'profile':
        return <ProfileScreen />;
      default:
        return <HomeScreen />;
    }
  };

  return (
    <SafeAreaView className="">
      <View className="flex-1">
        {renderContent()}
        <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />
      </View>
    </SafeAreaView>
  );
}
