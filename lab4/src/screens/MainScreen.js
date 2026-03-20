import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, Alert, Platform } from 'react-native';
import * as FileSystem from 'expo-file-system/legacy';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import StorageStats from '../components/StorageStats';
import Breadcrumb from '../components/Breadcrumb';
import FileItem from '../components/FileItem';
import MoveBar from '../components/MoveBar';
import CreateModal from '../components/modals/CreateModal';
import EditModal from '../components/modals/EditModal';
import RenameModal from '../components/modals/RenameModal';
import InfoModal from '../components/modals/InfoModal';

const ROOT_DIR = FileSystem.documentDirectory || 'file:///';
export default function MainScreen() {
  const [currentPath, setCurrentPath] = useState(ROOT_DIR);
  const [files, setFiles] = useState([]);
  const [storageStats, setStorageStats] = useState({ total: 0, free: 0, used: 0 });
  const [isCreateModalVisible, setCreateModalVisible] = useState(false);
  const [isEditModalVisible, setEditModalVisible] = useState(false);
  const [isInfoModalVisible, setInfoModalVisible] = useState(false);
  const [isRenameModalVisible, setRenameModalVisible] = useState(false);
  const [newItemName, setNewItemName] = useState('');
  const [newItemType, setNewItemType] = useState('folder'); 
  const [fileContent, setFileContent] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [renameValue, setRenameValue] = useState('');
  const [movingItem, setMovingItem] = useState(null);
  useEffect(() => {
    if (currentPath) {
      loadDirectory();
      loadStorageStats();
    }
  }, [currentPath]);

  const loadDirectory = async () => {
    try {
      if (!currentPath) return;
      const dirContent = await FileSystem.readDirectoryAsync(currentPath);
      const filesWithInfo = await Promise.all(
        dirContent.map(async (name) => {
          const fileUri = currentPath + name;
          const info = await FileSystem.getInfoAsync(fileUri);
          return { name, uri: fileUri, ...info };
        })
      );
      filesWithInfo.sort((a, b) => {
        if (a.isDirectory === b.isDirectory) return a.name.localeCompare(b.name);
        return a.isDirectory ? -1 : 1;
      });
      setFiles(filesWithInfo);
    } catch (error) {
      console.log(error);
    }
  };

  const loadStorageStats = async () => {
    if (Platform.OS === 'web') return; 
    try {
      const free = await FileSystem.getFreeDiskStorageAsync();
      const total = await FileSystem.getTotalDiskCapacityAsync();
      setStorageStats({ total, free, used: total - free });
    } catch (error) {
      console.log(error);
    }
  };

  const handlePressItem = (item) => {
    if (item.isDirectory) setCurrentPath(item.uri + '/'); 
    else if (item.name.endsWith('.txt')) openFileForEdit(item); 
    else openFileInfo(item); 
  };

  const goUp = () => {
    if (currentPath === ROOT_DIR) return; 
    const pathWithoutTrailingSlash = currentPath.slice(0, -1);
    const parentPath = pathWithoutTrailingSlash.slice(0, pathWithoutTrailingSlash.lastIndexOf('/') + 1);
    setCurrentPath(parentPath);
  };

  const displayPath = (currentPath && ROOT_DIR) 
    ? decodeURIComponent(currentPath.replace(ROOT_DIR, 'Home/')) 
    : 'Home/';
  const createItem = async () => {
    if (!newItemName.trim()) return Alert.alert("Увага", "Введіть назву");
    try {
      if (newItemType === 'folder') {
        const folderUri = currentPath + newItemName;
        await FileSystem.makeDirectoryAsync(folderUri);
      } else {
        const fileUri = currentPath + newItemName + (newItemName.endsWith('.txt') ? '' : '.txt');
        await FileSystem.writeAsStringAsync(fileUri, fileContent);
      }
      setCreateModalVisible(false);
      setNewItemName('');
      setFileContent('');
      loadDirectory();
    } catch (error) {
      Alert.alert("Помилка", "Не вдалося створити об'єкт");
    }
  };

  const openFileForEdit = async (file) => {
    try {
      const content = await FileSystem.readAsStringAsync(file.uri);
      setSelectedFile(file);
      setFileContent(content);
      setEditModalVisible(true);
    } catch (error) {
      Alert.alert("Помилка", "Не вдалося відкрити файл");
    }
  };

  const saveFile = async () => {
    try {
      await FileSystem.writeAsStringAsync(selectedFile.uri, fileContent);
      setEditModalVisible(false);
      loadDirectory();
      Alert.alert("Успіх", "Зміни збережено");
    } catch (error) {
      Alert.alert("Помилка", "Не вдалося зберегти файл");
    }
  };

  const openRenameModal = (item) => {
    setSelectedFile(item);
    setRenameValue(item.name);
    setRenameModalVisible(true);
  };

  const renameItem = async () => {
    if (!renameValue.trim()) return Alert.alert("Увага", "Введіть нову назву");
    if (renameValue === selectedFile.name) return setRenameModalVisible(false);
    try {
      const newUri = currentPath + renameValue;
      await FileSystem.moveAsync({ from: selectedFile.uri, to: newUri });
      setRenameModalVisible(false);
      loadDirectory();
    } catch (error) {
      Alert.alert("Помилка", "Не вдалося перейменувати об'єкт.");
    }
  };

  const startMoving = (item) => setMovingItem(item);
  const cancelMoving = () => setMovingItem(null);
  const performMove = async () => {
    if (!movingItem) return;
    const newUri = currentPath + movingItem.name;
    if (newUri === movingItem.uri) {
      Alert.alert("Увага", "Цей об'єкт вже знаходиться у цій папці.");
      return setMovingItem(null);
    }
    if (movingItem.isDirectory && currentPath.startsWith(movingItem.uri)) {
      return Alert.alert("Помилка", "Неможливо перемістити папку всередину самої себе.");
    }
    try {
      await FileSystem.moveAsync({ from: movingItem.uri, to: newUri });
      setMovingItem(null);
      loadDirectory();
      Alert.alert("Успіх", "Об'єкт переміщено!");
    } catch (error) {
      Alert.alert("Помилка", "Не вдалося перемістити об'єкт.");
    }
  };

  const deleteItem = (item) => {
    Alert.alert("Видалення", `Ви впевнені, що хочете видалити ${item.name}?`, [
      { text: "Скасувати", style: "cancel" },
      { text: "Видалити", style: "destructive", onPress: async () => {
          try {
            await FileSystem.deleteAsync(item.uri);
            if (movingItem && movingItem.uri === item.uri) setMovingItem(null);
            loadDirectory();
            loadStorageStats(); 
          } catch (error) { Alert.alert("Помилка", "Не вдалося видалити об'єкт"); }
        } 
      }
    ]);
  };

  const openFileInfo = (item) => {
    setSelectedFile(item);
    setInfoModalVisible(true);
  };

  return (
    <View className="flex-1 bg-[#F5F7FA]" style={{ paddingTop: Platform.OS === 'android' ? 45 : 50 }}>
      <StorageStats total={storageStats.total} used={storageStats.used} free={storageStats.free} />
      
      <Breadcrumb 
        currentPath={currentPath} 
        rootDir={ROOT_DIR} 
        onGoUp={goUp} 
        displayPath={displayPath} 
      />

      <FlatList
        data={files}
        keyExtractor={(item) => item.uri}
        contentContainerStyle={{ padding: 16, paddingBottom: 100 }}
        ListEmptyComponent={<Text className="text-center mt-12 text-gray-400 text-base">Папка порожня</Text>}
        renderItem={({ item }) => (
          <FileItem 
            item={item}
            isMoving={movingItem?.uri === item.uri}
            onPress={handlePressItem}
            onLongPress={openFileInfo}
            onMove={startMoving}
            onRename={openRenameModal}
            onDelete={deleteItem}
          />
        )}
      />
      {!movingItem && (
        <TouchableOpacity 
          className="absolute bottom-8 right-8 w-14 h-14 rounded-full bg-[#00A8FF] justify-center items-center shadow-md elevation-5" 
          onPress={() => {
            setNewItemType('folder');
            setNewItemName('');
            setFileContent('');
            setCreateModalVisible(true);
          }}
        >
          <MaterialCommunityIcons name="plus" size={30} color="white" />
        </TouchableOpacity>
      )}
      <MoveBar 
        movingItem={movingItem} 
        onCancel={cancelMoving} 
        onPerform={performMove} 
      />
      <CreateModal 
        visible={isCreateModalVisible}
        type={newItemType}
        setType={setNewItemType}
        name={newItemName}
        setName={setNewItemName}
        content={fileContent}
        setContent={setFileContent}
        onCancel={() => setCreateModalVisible(false)}
        onCreate={createItem}
      />
      <EditModal 
        visible={isEditModalVisible}
        file={selectedFile}
        content={fileContent}
        setContent={setFileContent}
        onCancel={() => setEditModalVisible(false)}
        onSave={saveFile}
      />
      <RenameModal 
        visible={isRenameModalVisible}
        value={renameValue}
        setValue={setRenameValue}
        onCancel={() => setRenameModalVisible(false)}
        onSave={renameItem}
      />
      <InfoModal 
        visible={isInfoModalVisible}
        file={selectedFile}
        onClose={() => setInfoModalVisible(false)}
      />
    </View>
  );
}