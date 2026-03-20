import React from 'react';
import { View, Text, TouchableOpacity, Platform } from 'react-native';

export default function MoveBar({ movingItem, onCancel, onPerform }) {
  if (!movingItem) return null;
  return (
    <View 
      className="absolute bottom-0 left-0 right-0 bg-white p-5 rounded-t-3xl shadow-lg elevation-10"
      style={{ paddingBottom: Platform.OS === 'android' ? 40 : 20 }}
    >
      <Text className="text-base text-gray-800 mb-4 text-center" numberOfLines={1}>
        Переміщення: <Text className="font-bold">{movingItem.name}</Text>
      </Text>
      <View className="flex-row justify-between">
        <TouchableOpacity onPress={onCancel} className="flex-1 p-3.5 rounded-xl items-center bg-gray-100 mr-2">
          <Text className="text-gray-800 font-bold">Скасувати</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={onPerform} className="flex-1 p-3.5 rounded-xl items-center bg-green-500 ml-2">
          <Text className="text-white font-bold">Вставити сюди</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}