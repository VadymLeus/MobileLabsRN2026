import React from 'react';
import { View, Text, TouchableOpacity, TextInput, Modal } from 'react-native';

export default function RenameModal({ visible, value, setValue, onCancel, onSave }) {
  return (
    <Modal visible={visible} transparent animationType="fade">
      <View className="flex-1 bg-black/50 justify-center p-5">
        <View className="bg-white rounded-3xl p-5">
          <Text className="text-xl font-bold mb-5 text-gray-800 text-center">Перейменувати</Text>
          <TextInput
            className="bg-[#F5F7FA] border border-gray-200 rounded-xl p-4 mb-4 text-base"
            value={value}
            onChangeText={setValue}
            placeholder="Нова назва"
          />
          <View className="flex-row justify-between">
            <TouchableOpacity onPress={onCancel} className="flex-1 p-4 items-center bg-gray-100 rounded-xl mr-2">
              <Text className="text-gray-800 font-bold">Скасувати</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={onSave} className="flex-1 p-4 items-center bg-[#00A8FF] rounded-xl ml-2">
              <Text className="text-white font-bold">Зберегти</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}