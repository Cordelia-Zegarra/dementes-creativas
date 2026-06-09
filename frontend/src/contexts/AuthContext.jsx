import React, { createContext, useState, useContext, useEffect } from 'react';
import api from '../services/api';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('username');
    const role = localStorage.getItem('role');
    
    if (token && username) {
      setUser({ username, role, token });
    }
    setLoading(false);
  }, []);

  const login = async (username, password, captcha) => {
    try {
      const response = await api.post('/auth/login', { username, password, captcha });
      const { access_token, username: userName, role } = response.data;
      
      localStorage.setItem('token', access_token);
      localStorage.setItem('username', userName);
      localStorage.setItem('role', role);
      
      setUser({ username: userName, role, token: access_token });
      return { success: true };
    } catch (error) {
      return { success: false, error: error.response?.data?.message || 'Error de conexión' };
    }
  };

  const logout = async () => {
    if (user?.username) {
      await api.post('/auth/logout', { username: user.username });
    }
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('role');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
