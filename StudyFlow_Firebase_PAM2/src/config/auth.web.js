// Vraj — o Expo seleciona este arquivo no navegador.
import { getAuth } from 'firebase/auth';
import { app } from './firebase';
export const auth = getAuth(app);
