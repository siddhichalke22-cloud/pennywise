import AsyncStorage from '@react-native-async-storage/async-storage';
import { STORAGE_KEYS } from '../../utils/constants';

export const tokenStorage = {
  async saveToken(token) {
    await AsyncStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, token);
  },
  async getToken() {
    return await AsyncStorage.getItem(STORAGE_KEYS.AUTH_TOKEN);
  },
  async removeToken() {
    await AsyncStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN);
  },
  async saveUser(user) {
    await AsyncStorage.setItem(STORAGE_KEYS.USER_DATA, JSON.stringify(user));
  },
  async getUser() {
    const data = await AsyncStorage.getItem(STORAGE_KEYS.USER_DATA);
    return data ? JSON.parse(data) : null;
  },
  async clearAuth() {
    await AsyncStorage.multiRemove([STORAGE_KEYS.AUTH_TOKEN, STORAGE_KEYS.USER_DATA]);
  },
};

export default tokenStorage;
