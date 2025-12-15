import { View, Text } from 'react-native'
import React from 'react'
import { MapPin } from 'lucide-react-native'

const EmptyActiveState = () => {
  return (
     <View className="flex-1 items-center justify-center py-20">
      <View className="mb-4 h-20 w-20 items-center justify-center rounded-full bg-muted">
        <MapPin size={40} className="text-muted-foreground" />
      </View>
      <Text className="mb-2 text-lg font-semibold text-foreground">No Active Deliveries Available</Text>
      <Text className="px-8 text-center text-muted-foreground">
        Accept deliveries from the home tab to see them here
      </Text>
    </View>
  )
}

export default EmptyActiveState