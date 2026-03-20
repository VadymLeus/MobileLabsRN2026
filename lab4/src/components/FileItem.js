import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function FileItem({ item, isMoving, onPress, onLongPress, onMove, onRename, onDelete }) {
  return (
    <TouchableOpacity 
      className={`flex-row items-center justify-between bg-white p-4 rounded-xl mb-3 shadow-sm elevation-1 ${isMoving ? 'opacity-50 bg-green-50' : ''}`}
      onPress={() => onPress(item)}
      onLongPress={() => onLongPress(item)}
    >
      <View className="flex-row items-center flex-1 mr-2">
        <MaterialCommunityIcons 
          name={item.isDirectory ? "folder" : "file-document-outline"} 
          size={32} 
          color={item.isDirectory ? "#FFCA28" : "#42A5F5"} 
        />
        <Text className="ml-4 text-base text-gray-800 flex-1" numberOfLines={1}>{item.name}</Text>
      </View>
      <View className="flex-row items-center">
        <TouchableOpacity onPress={() => onMove(item)} className="p-1.5 ml-1">
          <MaterialCommunityIcons name="folder-move-outline" size={24} color="#4CAF50" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => onRename(item)} className="p-1.5 ml-1">
          <MaterialCommunityIcons name="pencil-outline" size={24} color="#FFA726" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => onDelete(item)} className="p-1.5 ml-1">
          <MaterialCommunityIcons name="delete-outline" size={24} color="#FF5252" />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
}