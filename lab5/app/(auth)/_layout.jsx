import { Redirect, Stack } from 'expo-router';
import { useAuth } from '../../context/AuthContext';

export default function AuthLayout() {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <Redirect href="/(app)" />;
  }

  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: '#2563EB' },
        headerTintColor: '#FFFFFF',
        contentStyle: { backgroundColor: '#EFF6FF' },
      }}
    >
      <Stack.Screen name="login" options={{ title: 'Вхід' }} />
      <Stack.Screen name="register" options={{ title: 'Реєстрація' }} />
    </Stack>
  );
}
