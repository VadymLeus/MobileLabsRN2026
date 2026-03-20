import React from 'react';
import { View, Text, TouchableOpacity, Modal } from 'react-native';
import { formatBytes } from '../../utils/formatBytes';

export default function InfoModal({ visible, file, rootDir, onClose }) {
  const displayUri = file?.uri && rootDir 
    ? decodeURIComponent(file.uri.replace(rootDir, 'Home/')) 
    : '';
  return (
    <Modal visible={visible} transparent animationType="fade">
      <View className="flex-1 bg-black/50 justify-center p-5">
        <View className="bg-white rounded-3xl p-5">
          <Text className="text-xl font-bold mb-5 text-gray-800 text-center">Властивості</Text>
          {file && (
            <View className="bg-[#F5F7FA] p-4 rounded-xl mb-5">
              <Text className="text-[15px] mb-2 text-gray-700"><Text className="font-bold text-black">Назва:</Text> {file.name}</Text>
              <Text className="text-[15px] mb-2 text-gray-700"><Text className="font-bold text-black">Шлях:</Text> {displayUri}</Text>
              <Text className="text-[15px] mb-2 text-gray-700"><Text className="font-bold text-black">Тип:</Text> {file.isDirectory ? 'Папка' : 'Файл ' + file.name.split('.').pop()}</Text>
              <Text className="text-[15px] mb-2 text-gray-700"><Text className="font-bold text-black">Розмір:</Text> {formatBytes(file.size || 0)}</Text>
              <Text className="text-[15px] text-gray-700">
                <Text className="font-bold text-black">Змінено:</Text> {file.modificationTime ? new Date(file.modificationTime * 1000).toLocaleString() : 'Невідомо'}
              </Text>
            </View>
          )}
          <TouchableOpacity onPress={onClose} className="p-4 items-center bg-[#00A8FF] rounded-xl w-full">
            <Text className="text-white font-bold">ОК</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}