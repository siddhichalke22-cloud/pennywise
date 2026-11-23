import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AuthProvider } from './src/context/AuthContext';
import { GroupProvider } from './src/context/GroupContext';
import { ThemeProvider } from './src/context/ThemeContext';
import AppNavigator from './src/navigation/AppNavigator';

export default function App() {
  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <AuthProvider>
          <GroupProvider>
            <AppNavigator />
            <StatusBar style="auto" />
          </GroupProvider>
        </AuthProvider>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}
