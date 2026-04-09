import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert} from "react-native";
import React, { useState } from "react";

export default function Registration() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [lastName, setLastName] = useState("");
  const [firstName, setFirstName] = useState("");

  const handleRegister = () => {
    if (!email || !password || !confirmPassword || !lastName || !firstName) {
      Alert.alert("Помилка", "Заповніть всі поля!");
      return;
    }

    console.log("Реєстрація:", { email, password, confirmPassword, lastName, firstName });

    Alert.alert("Успіх", "Дані відправлено!");

    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setLastName("");
    setFirstName("");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Реєстрація</Text>
      <TextInput style={styles.input} placeholder="Електронна пошта" value={email} onChangeText={setEmail} keyboardType="email-address" />
      <TextInput style={styles.input} placeholder="Пароль" value={password} onChangeText={setPassword} secureTextEntry />
      <TextInput style={styles.input} placeholder="Пароль (ще раз)" value={confirmPassword} onChangeText={setConfirmPassword} secureTextEntry />
      <TextInput style={styles.input} placeholder="Прізвище" value={lastName} onChangeText={setLastName} />
      <TextInput style={styles.input} placeholder="Ім'я" value={firstName} onChangeText={setFirstName} />
      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Зареєструватися</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    width: "100%",
    height: 50,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  button: {
    backgroundColor: "#007bff",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    width: "100%",
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
