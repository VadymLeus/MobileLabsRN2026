import { initializeApp } from 'firebase/app';
import { getAuth, initializeAuth, getReactNativePersistence } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
  apiKey: "AIzaSyB_-4cSU1tvD3zQUJgmHzTnzGYu7EKUUQs",
  authDomain: "rmd-lab6.firebaseapp.com",
  projectId: "rmd-lab6",
  storageBucket: "rmd-lab6.firebasestorage.app",
  messagingSenderId: "424086831657",
  appId: "1:424086831657:web:fef05406b82482447ed238"
};

const app = initializeApp(firebaseConfig);
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
});
const db = getFirestore(app);
export { auth, db };