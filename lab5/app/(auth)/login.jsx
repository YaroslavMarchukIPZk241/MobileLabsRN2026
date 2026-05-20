import { Link } from 'expo-router';
import { useState } from 'react';
import { Alert, KeyboardAvoidingView, Platform, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { useAuth } from '../../context/AuthContext';

export default function LoginScreen() {
  const { login } = useAuth();
  const [email, setEmail] = useState('demo@gmail.com');
  const [password, setPassword] = useState('123456');

  const handleLogin = () => {
    if (!email.trim() || !password.trim()) {
      Alert.alert('Помилка', 'Заповніть email і пароль.');
      return;
    }

    try {
      login(email, password);
    } catch (error) {
      Alert.alert('Помилка входу', error.message);
    }
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={styles.wrapper}>
      <View style={styles.card}>
        <Text style={styles.title}>Вхід</Text>
        <Text style={styles.subtitle}>Увійдіть, щоб відкрити захищений каталог товарів.</Text>

        <Text style={styles.label}>Email</Text>
        <TextInput
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
          placeholder="example@gmail.com"
          style={styles.input}
        />

        <Text style={styles.label}>Пароль</Text>
        <TextInput
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          placeholder="Ваш пароль"
          style={styles.input}
        />

        <Pressable style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Увійти</Text>
        </Pressable>

        <Link href="/register" style={styles.link}>Немає акаунту? Зареєструватися</Link>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#EFF6FF',
  },
  card: {
    padding: 22,
    borderRadius: 24,
    backgroundColor: '#FFFFFF',
    shadowColor: '#000000',
    shadowOpacity: 0.12,
    shadowRadius: 12,
    elevation: 5,
  },
  title: {
    fontSize: 32,
    fontWeight: '900',
    color: '#111827',
  },
  subtitle: {
    marginTop: 8,
    marginBottom: 22,
    fontSize: 15,
    color: '#6B7280',
    lineHeight: 22,
  },
  label: {
    marginBottom: 7,
    fontWeight: '700',
    color: '#374151',
  },
  input: {
    marginBottom: 14,
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 16,
    backgroundColor: '#F9FAFB',
  },
  button: {
    marginTop: 8,
    paddingVertical: 14,
    borderRadius: 14,
    backgroundColor: '#2563EB',
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '800',
  },
  link: {
    marginTop: 18,
    textAlign: 'center',
    color: '#2563EB',
    fontWeight: '700',
  },
  hint: {
    marginTop: 16,
    textAlign: 'center',
    color: '#6B7280',
    fontSize: 13,
  },
});
