import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { navigationRef } from './navigationRef';
import AuthNavigator from './AuthNavigator';
import BottomTabNavigation from './BottomTabNavigation';
import { useAuth } from '../hooks/useAuth';
import LoadingIndicator from '../components/common/LoadingIndicator';

/**
 * Root AppNavigator
 * Automatically switches between unauthenticated flow (Splash/Welcome/Login/Register)
 * and authenticated flow (BottomTabNavigation hosting HomeScreen).
 */
export const AppNavigator = () => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <LoadingIndicator fullScreen text="Launching Pennywise..." />;
  }

  return (
    <NavigationContainer ref={navigationRef}>
      {isAuthenticated ? <BottomTabNavigation /> : <AuthNavigator />}
    </NavigationContainer>
  );
};

export default AppNavigator;
