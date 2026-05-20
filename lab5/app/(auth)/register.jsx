import { Link } from 'expo-router';
import { useState } from 'react';
import { Alert, KeyboardAvoidingView, Platform, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { useAuth } from '../../context/AuthContext';

export default function RegisterScreen() {
  const { register } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleRegister = () => {
    if (!name.trim() || !email.trim() || !password.trim() || !confirmPassword.trim()) {
      Alert.alert('Помилка', 'Заповніть усі поля.');
      return;
    }

    if (password.length < 6) {
      Alert.alert('Помилка', 'Пароль має містити мінімум 6 символів.');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Помилка', 'Паролі не співпадають.');
      return;
    }

    try {
      register(email, password, name);
    } catch (error) {
      Alert.alert('Помилка реєстрації', error.message);
    }
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={styles.wrapper}>
      <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">
        <View style={styles.card}>
          <Text style={styles.title}>Реєстрація</Text>
          <Text style={styles.subtitle}>Створіть акаунт для доступу до каталогу.</Text>

          <Text style={styles.label}>Імʼя</Text>
          <TextInput value={name} onChangeText={setName} placeholder="Ваше імʼя" style={styles.input} />

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
          <TextInput value={password} onChangeText={setPassword} secureTextEntry placeholder="Пароль" style={styles.input} />

          <Text style={styles.label}>Підтвердження паролю</Text>
          <TextInput
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry
            placeholder="Повторіть пароль"
            style={styles.input}
          />

          <Pressable style={styles.button} onPress={handleRegister}>
            <Text style={styles.buttonText}>Зареєструватися</Text>
          </Pressable>

          <Link href="/login" style={styles.link}>Вже є акаунт? Увійти</Link>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#EFF6FF',
  },
  scroll: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 20,
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
});
