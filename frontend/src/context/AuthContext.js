import React, { createContext, useState, useEffect } from 'react';
import { tokenStorage } from '../services/storage/tokenStorage';
import { authApi } from '../services/api/authApi';
import { currentUser as mockUser } from '../data/dummyData';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Restore saved session on app launch
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

  /**
   * Register a new user by calling POST /api/auth/register via Axios
   * @param {string} name
   * @param {string} email
   * @param {string} password
   */
  const register = async (name, email, password) => {
    const res = await authApi.register({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      password,
    });

    if (res && res.data) {
      const { user: userData, token: userToken } = res.data;

      // Save credentials in AsyncStorage
      await tokenStorage.saveToken(userToken);
      await tokenStorage.saveUser(userData);

      // Update state to trigger navigation to authenticated view
      setToken(userToken);
      setUser(userData);
      return res;
    }

    throw new Error(res?.message || 'Registration failed');
  };

  /**
   * Log in user by calling POST /api/auth/login via Axios
   */
  const login = async (email, password) => {
    try {
      const res = await authApi.login({
        email: email.trim().toLowerCase(),
        password,
      });

      if (res && res.data) {
        const { user: userData, token: userToken } = res.data;

        await tokenStorage.saveToken(userToken);
        await tokenStorage.saveUser(userData);

        setToken(userToken);
        setUser(userData);
        return res;
      }
    } catch (apiError) {
      // Re-throw API error with server message
      throw apiError;
    }
  };

  /**
   * Demo mode login for rapid UI evaluation
   */
  const loginDemo = async () => {
    const demoUser = mockUser;
    const demoToken = 'mock_jwt_token_pennywise_dev_12345';

    await tokenStorage.saveToken(demoToken);
    await tokenStorage.saveUser(demoUser);

    setToken(demoToken);
    setUser(demoUser);
    return { data: { user: demoUser, token: demoToken } };
  };

  /**
   * Log out and wipe stored credentials
   */
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
