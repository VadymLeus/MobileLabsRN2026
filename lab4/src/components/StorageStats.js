import React from 'react';
import { View, Text } from 'react-native';
import { formatBytes } from '../utils/formatBytes';

export default function StorageStats({ total, used, free }) {
  return (
    <View className="bg-white p-4 m-4 rounded-2xl shadow-sm elevation-3">
      <Text className="text-base font-bold mb-3 text-gray-800">Статистика пристрою</Text>
      <View className="flex-row justify-between">
        <View className="items-center">
          <Text className="text-xs text-gray-500 mb-1">Загальна</Text>
          <Text className="text-sm font-bold text-gray-800">{formatBytes(total)}</Text>
        </View>
        <View className="items-center">
          <Text className="text-xs text-gray-500 mb-1">Використано</Text>
          <Text className="text-sm font-bold text-red-500">{formatBytes(used)}</Text>
        </View>
        <View className="items-center">
          <Text className="text-xs text-gray-500 mb-1">Вільно</Text>
          <Text className="text-sm font-bold text-green-500">{formatBytes(free)}</Text>
        </View>
      </View>
    </View>
  );
}