import React, { createContext, useState, useEffect } from 'react';
import { tokenStorage } from '../services/storage/tokenStorage';
import { authApi } from '../services/api/authApi';

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
    const res = await authApi.login({ email, password });
    const { user: userData, token: userToken } = res.data;

    await tokenStorage.saveToken(userToken);
    await tokenStorage.saveUser(userData);

    setToken(userToken);
    setUser(userData);
    return res;
  };

  const register = async (name, email, password) => {
    const res = await authApi.register({ name, email, password });
    const { user: userData, token: userToken } = res.data;

    await tokenStorage.saveToken(userToken);
    await tokenStorage.saveUser(userData);

    setToken(userToken);
    setUser(userData);
    return res;
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
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
