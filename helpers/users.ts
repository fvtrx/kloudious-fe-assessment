import { STORAGE_KEYS } from '@/constants';
import { StoredUser } from '@/types/contexts';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const generateRandomUUID = (): string => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};

const getInitialUsers = (): StoredUser[] => [
  {
    id: generateRandomUUID(),
    name: 'John Doe',
    email: 'john@example.com',
    password: 'password123',
  },
  {
    id: generateRandomUUID(),
    name: 'Jane Smith',
    email: 'jane@example.com',
    password: 'password456',
  },
];

const getUsersDB = async (): Promise<StoredUser[]> => {
  try {
    const stored = await AsyncStorage.getItem(STORAGE_KEYS.USERS_DB);
    if (stored) {
      return JSON.parse(stored);
    }
    const initialUsers = getInitialUsers();
    await AsyncStorage.setItem(
      STORAGE_KEYS.USERS_DB,
      JSON.stringify(initialUsers),
    );
    return initialUsers;
  } catch (error) {
    console.error('Error loading users:', error);
    return getInitialUsers();
  }
};

const saveUsersDB = async (users: StoredUser[]): Promise<void> => {
  try {
    await AsyncStorage.setItem(STORAGE_KEYS.USERS_DB, JSON.stringify(users));
  } catch (error) {
    console.error('Error saving users:', error);
  }
};

export { getUsersDB, saveUsersDB };
