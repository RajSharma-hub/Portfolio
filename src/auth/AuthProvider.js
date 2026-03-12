import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const cur = localStorage.getItem('currentUser');
      return cur ? JSON.parse(cur) : null;
    } catch {
      return null;
    }
  });

  useEffect(() => {
    try {
      if (user) localStorage.setItem('currentUser', JSON.stringify(user));
      else localStorage.removeItem('currentUser');
    } catch {}
  }, [user]);

  const register = useCallback((username, password) => {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    if (users.find(u => u.username === username)) {
      throw new Error('Username already taken');
    }
    const newUser = { username, password, createdAt: Date.now() };
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    setUser({ username, createdAt: newUser.createdAt });
    return true;
  }, []);

  const login = useCallback((username, password) => {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const match = users.find(u => u.username === username && u.password === password);
    if (!match) throw new Error('Invalid username or password');
    setUser({ username, createdAt: match.createdAt });
    return true;
  }, []);

  const logout = useCallback(() => setUser(null), []);

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
