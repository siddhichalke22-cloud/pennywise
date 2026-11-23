import React, { createContext, useState, useEffect } from 'react';
import { tokenStorage } from '../services/storage/tokenStorage';
import { currentUser as mockUser } from '../data/dummyData';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check saved credentials on launch
  useEffect(() => {
    const bootstrapAsync = async () => {
      try {
        const storedToken = await tokenStorage.getToken();
        const storedUser = await tokenStorage.getUser();

        if (storedToken && storedUser) {
          setToken(storedToken);
          setUser(storedUser);
        }
      } catch (err) {
        console.error('[AuthContext] Restore session error:', err);
      } finally {
        setIsLoading(false);
      }
    };

    bootstrapAsync();
  }, []);

  const login = async (email, password) => {
    // Simulated authentication with dummy data for UI testing
    const demoUser = {
      ...mockUser,
      email: email || mockUser.email,
    };
    const demoToken = 'mock_jwt_token_pennywise_dev_12345';

    await tokenStorage.saveToken(demoToken);
    await tokenStorage.saveUser(demoUser);

    setToken(demoToken);
    setUser(demoUser);
    return { data: { user: demoUser, token: demoToken } };
  };

  const loginDemo = async () => {
    return login(mockUser.email, 'password123');
  };

  const register = async (name, email, password) => {
    const newUser = {
      ...mockUser,
      name: name || 'Demo Member',
      firstName: (name || 'Demo').split(' ')[0],
      email: email || mockUser.email,
    };
    const demoToken = 'mock_jwt_token_pennywise_dev_12345';

    await tokenStorage.saveToken(demoToken);
    await tokenStorage.saveUser(newUser);

    setToken(demoToken);
    setUser(newUser);
    return { data: { user: newUser, token: demoToken } };
  };

  const logout = async () => {
    await tokenStorage.clearAuth();
    setUser(null);
    setToken(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: !!token,
        isLoading,
        login,
        loginDemo,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
