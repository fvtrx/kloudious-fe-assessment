import { StatusBar } from 'expo-status-bar';
import { useFrameworkReady } from '@/hooks/useFrameworkReady';
import { AuthProvider } from '@/contexts/AuthContext';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from './home';
import SignupScreen from './signup';
import LoginScreen from '.';
import NotFoundScreen from './+not-found';

const Stack = createStackNavigator();

export default function RootLayout() {
  useFrameworkReady();

  return (
    <AuthProvider>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" component={LoginScreen} />
        <Stack.Screen name="signup" component={SignupScreen} />
        <Stack.Screen name="home" component={HomeScreen} />
        <Stack.Screen name="+not-found" component={NotFoundScreen} />
      </Stack.Navigator>
      <StatusBar style="auto" />
    </AuthProvider>
  );
}
