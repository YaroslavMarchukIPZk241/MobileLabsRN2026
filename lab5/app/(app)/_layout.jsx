import { Redirect, Stack } from 'expo-router';
import { useAuth } from '../../context/AuthContext';

export default function AppLayout() {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Redirect href="/login" />;
  }

  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: '#111827' },
        headerTintColor: '#FFFFFF',
        contentStyle: { backgroundColor: '#F3F4F6' },
      }}
    >
      <Stack.Screen name="index" options={{ title: 'Каталог товарів' }} />
      <Stack.Screen name="details/[id]" options={{ title: 'Деталі товару' }} />
    </Stack>
  );
}
