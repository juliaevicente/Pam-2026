import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';

import HomeScreen from './src/screens/HomeScreen';
import TasksScreen from './src/screens/TasksScreen';
import FocusScreen from './src/screens/FocusScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="dark" />
      <Stack.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: '#6D28D9' },
          headerTintColor: '#FFFFFF',
          headerTitleStyle: { fontWeight: '700' },
          contentStyle: { backgroundColor: '#F8F7FC' },
        }}
      >
        <Stack.Screen
          name="Inicio"
          component={HomeScreen}
          options={{ title: 'StudyFlow' }}
        />
        <Stack.Screen
          name="Tarefas"
          component={TasksScreen}
          options={{ title: 'Minhas tarefas' }}
        />
        <Stack.Screen
          name="Foco"
          component={FocusScreen}
          options={{ title: 'Calculadora de foco' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
