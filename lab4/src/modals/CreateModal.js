import React from 'react';
import { View, Text, TouchableOpacity, TextInput, Modal } from 'react-native';

export default function CreateModal({ visible, type, setType, name, setName, content, setContent, onCancel, onCreate }) {
  return (
    <Modal visible={visible} transparent animationType="slide">
      <View className="flex-1 bg-black/50 justify-center p-5">
        <View className="bg-white rounded-3xl p-5">
          <Text className="text-xl font-bold mb-5 text-gray-800 text-center">Створити новий об'єкт</Text>
          <View className="flex-row mb-5 bg-gray-100 rounded-xl p-1">
            <TouchableOpacity 
              className={`flex-1 py-2.5 items-center rounded-lg ${type === 'folder' ? 'bg-white shadow-sm elevation-2' : ''}`}
              onPress={() => setType('folder')}
            >
              <Text className={type === 'folder' ? 'text-[#00A8FF] font-bold' : 'text-gray-500 font-medium'}>Папка</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              className={`flex-1 py-2.5 items-center rounded-lg ${type === 'file' ? 'bg-white shadow-sm elevation-2' : ''}`}
              onPress={() => setType('file')}
            >
              <Text className={type === 'file' ? 'text-[#00A8FF] font-bold' : 'text-gray-500 font-medium'}>Файл (.txt)</Text>
            </TouchableOpacity>
          </View>
          <TextInput
            className="bg-[#F5F7FA] border border-gray-200 rounded-xl p-4 mb-4 text-base"
            placeholder={type === 'folder' ? "Назва папки" : "Назва файлу (без .txt)"}
            value={name}
            onChangeText={setName}
          />
          {type === 'file' && (
            <TextInput
              className="bg-[#F5F7FA] border border-gray-200 rounded-xl p-4 mb-4 text-base h-32"
              placeholder="Початковий вміст файлу..."
              value={content}
              onChangeText={setContent}
              multiline
              textAlignVertical="top"
            />
          )}
          <View className="flex-row justify-between">
            <TouchableOpacity onPress={onCancel} className="flex-1 p-4 items-center bg-gray-100 rounded-xl mr-2">
              <Text className="text-gray-800 font-bold">Скасувати</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={onCreate} className="flex-1 p-4 items-center bg-[#00A8FF] rounded-xl ml-2">
              <Text className="text-white font-bold">Створити</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}