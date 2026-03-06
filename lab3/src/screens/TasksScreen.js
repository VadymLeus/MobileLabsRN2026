import React from 'react';
import { View, Text } from 'react-native';

export default function TasksScreen() {
  return (
    <View className="flex-1 items-center justify-center bg-white dark:bg-slate-900">
      <Text className="text-2xl font-bold text-black dark:text-white">Завдання</Text>
    </View>
  );
}