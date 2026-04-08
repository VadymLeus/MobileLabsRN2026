import { View, Text, TouchableOpacity } from 'react-native';
import { useAuth } from '../../context/AuthContext';

export default function Home() {
  const { user, logout } = useAuth();

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Ласкаво просимо, {user?.email}</Text>
      <TouchableOpacity 
        onPress={logout} 
        style={{ marginTop: 20, padding: 10, backgroundColor: 'red', borderRadius: 5 }}
      >
        <Text style={{ color: 'white' }}>Вийти</Text>
      </TouchableOpacity>
    </View>
  );
}