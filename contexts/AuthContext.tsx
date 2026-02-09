import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import type {
  AuthContextType,
  StoredUser,
  AuthResponse,
  User,
} from '@/types/contexts';
import { STORAGE_KEYS } from '@/constants';
import { generateRandomUUID, getUsersDB, saveUsersDB } from '@/helpers/users';
import {
  validateEmail,
  validateName,
  validatePassword,
} from '@/helpers/validator';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [authToken, setAuthToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadStoredAuth = async () => {
      try {
        const [storedUser, storedToken] = await Promise.all([
          AsyncStorage.getItem(STORAGE_KEYS.USER),
          AsyncStorage.getItem(STORAGE_KEYS.TOKEN),
        ]);

        if (storedUser && storedToken) {
          setUser(JSON.parse(storedUser));
          setAuthToken(storedToken);
        }
      } catch (error) {
        console.error('Error loading auth:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadStoredAuth();
  }, []);

  // NOTE: saveAuth saves both user data and auth token to state and AsyncStorage
  const saveAuth = async (userData: User, token: string) => {
    setUser(userData);
    setAuthToken(token);
    await Promise.all([
      AsyncStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(userData)),
      AsyncStorage.setItem(STORAGE_KEYS.TOKEN, token),
    ]);
  };

  const login = async (
    email: string,
    password: string,
  ): Promise<AuthResponse> => {
    const emailError = validateEmail(email);
    const passwordError = validatePassword(password);

    // MARK: Early return
    if (emailError) return { success: false, error: emailError };
    if (passwordError) return { success: false, error: passwordError };

    try {
      const users = await getUsersDB();
      const foundUser = users.find(
        (user) =>
          user.email.toLowerCase() === email.toLowerCase() &&
          user.password === password,
      );

      if (!foundUser)
        return { success: false, error: 'Invalid email or password' };

      const { password: _, ...userWithoutPassword } = foundUser;
      await saveAuth(userWithoutPassword, generateRandomUUID());
      return { success: true };
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, error: 'An error occurred during login' };
    }
  };

  const signup = async (
    name: string,
    email: string,
    password: string,
  ): Promise<AuthResponse> => {
    const nameError = validateName(name);
    const emailError = validateEmail(email);
    const passwordError = validatePassword(password);

    // MARK: Early return
    if (nameError) return { success: false, error: nameError };
    if (emailError) return { success: false, error: emailError };
    if (passwordError) return { success: false, error: passwordError };

    try {
      const users = await getUsersDB();
      if (
        users.some((user) => user.email.toLowerCase() === email.toLowerCase())
      ) {
        return { success: false, error: 'Email already exists' };
      }

      const newUser: StoredUser = {
        id: generateRandomUUID(),
        name: name.trim(),
        email: email.toLowerCase(),
        password,
      };

      users.push(newUser);
      await saveUsersDB(users);

      const { password: _, ...userWithoutPassword } = newUser;
      await saveAuth(userWithoutPassword, generateRandomUUID());

      return { success: true };
    } catch (error) {
      console.error('Signup error:', error);
      return { success: false, error: 'An error occurred during signup' };
    }
  };

  const logout = async () => {
    try {
      setUser(null);
      setAuthToken(null);
      await Promise.all([
        AsyncStorage.removeItem(STORAGE_KEYS.USER),
        AsyncStorage.removeItem(STORAGE_KEYS.TOKEN),
      ]);
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, authToken, login, signup, logout, isLoading }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
