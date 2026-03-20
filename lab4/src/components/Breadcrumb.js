import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function Breadcrumb({ currentPath, rootDir, onGoUp, displayPath }) {
  return (
    <View className="flex-row items-center px-4 pb-3 border-b border-gray-200">
      <TouchableOpacity onPress={onGoUp} disabled={currentPath === rootDir}>
        <MaterialCommunityIcons 
          name="arrow-up-bold-circle-outline" 
          size={30} 
          color={currentPath === rootDir ? "#ccc" : "#00A8FF"} 
        />
      </TouchableOpacity>
      <Text className="flex-1 ml-3 text-[15px] text-gray-600 font-medium" numberOfLines={1}>
        {displayPath}
      </Text>
    </View>
  );
}