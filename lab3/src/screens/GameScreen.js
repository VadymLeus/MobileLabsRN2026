import React from 'react';
import { View, Text } from 'react-native';

export default function GameScreen() {
  return (
    <View className="flex-1 items-center justify-center bg-white dark:bg-slate-900">
      <Text className="text-2xl font-bold text-black dark:text-white">Гра-клікер</Text>
      <Text className="text-base text-gray-500 mt-2">Тут буде об'єкт для жестів</Text>
    </View>
  );
}