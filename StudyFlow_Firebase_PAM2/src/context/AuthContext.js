// Vraj — autenticação anônima para estudar banco sem criar uma tela de login.
import React, { createContext, useContext, useEffect, useState } from 'react';
import { ActivityIndicator, Button, Text, View } from 'react-native';
import { onAuthStateChanged, signInAnonymously } from 'firebase/auth';
import { auth } from '../config/auth';
const Context = createContext(null);
export const useUser = () => useContext(Context);
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');
  const [attempt, setAttempt] = useState(0);
  useEffect(() => {
    let active = true;
    let signingIn = false;
    setError('');
    const unsubscribe = onAuthStateChanged(auth, async current => {
      if (!active) return;
      if (current) { setUser(current); return; }
      setUser(null);
      if (signingIn) return;
      signingIn = true;
      try { await signInAnonymously(auth); }
      catch (e) { if (active) setError(e.code || e.message); }
      finally { signingIn = false; }
    });
    return () => { active = false; unsubscribe(); };
  }, [attempt]);
  if (!user) return (
    <View style={{flex:1,justifyContent:'center',alignItems:'center',padding:24,gap:14}}>
      {error ? <><Text>Falha ao conectar: {error}</Text><Button title="Tentar novamente" onPress={() => setAttempt(n => n + 1)} /></> : <><ActivityIndicator /><Text>Conectando ao Firebase...</Text></>}
    </View>
  );
  return <Context.Provider value={user}>{children}</Context.Provider>;
}
