// Vraj — versão nativa: mantém a identificação após fechar o aplicativo.
import AsyncStorage from '@react-native-async-storage/async-storage';
import { initializeAuth, getAuth, getReactNativePersistence } from 'firebase/auth';
import { app } from './firebase';
let instance;
try {
  instance = initializeAuth(app, { persistence: getReactNativePersistence(AsyncStorage) });
} catch (error) {
  if (error.code !== 'auth/already-initialized') throw error;
  instance = getAuth(app);
}
export const auth = instance;
