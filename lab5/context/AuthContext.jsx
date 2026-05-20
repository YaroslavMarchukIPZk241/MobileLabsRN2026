import React, { createContext, useContext, useMemo, useState } from 'react';
import { router } from 'expo-router';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [registeredUsers, setRegisteredUsers] = useState([
    { name: 'Demo User', email: 'demo@gmail.com', password: '123456' },
  ]);

  const login = (email, password) => {
    const normalizedEmail = email.trim().toLowerCase();
    const existingUser = registeredUsers.find(
      (item) => item.email === normalizedEmail && item.password === password
    );

    if (!existingUser) {
      throw new Error('Невірний email або пароль. Можна використати demo@gmail.com / 123456.');
    }

    setUser({ name: existingUser.name, email: existingUser.email });
    setIsAuthenticated(true);
    router.replace('/');
  };

  const register = (email, password, name) => {
    const normalizedEmail = email.trim().toLowerCase();

    if (registeredUsers.some((item) => item.email === normalizedEmail)) {
      throw new Error('Користувач з таким email вже існує.');
    }

    const newUser = {
      name: name.trim(),
      email: normalizedEmail,
      password,
    };

    setRegisteredUsers((previous) => [...previous, newUser]);
    setUser({ name: newUser.name, email: newUser.email });
    setIsAuthenticated(true);
    router.replace('/');
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
    router.replace('/login');
  };

  const value = useMemo(
    () => ({ isAuthenticated, user, login, register, logout }),
    [isAuthenticated, user, registeredUsers]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth потрібно використовувати всередині AuthProvider');
  }

  return context;
}
