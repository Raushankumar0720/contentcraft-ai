import React, { createContext, useContext, useState, useEffect } from 'react';
import { loginUser, signupUser } from '../services/api';
import toast from 'react-hot-toast';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in
    const storedUser = localStorage.getItem('contentcraft_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      const res = await loginUser({ email, password });
      if (res.success) {
        setUser(res.data);
        localStorage.setItem('contentcraft_user', JSON.stringify(res.data));
        toast.success(`Welcome back, ${res.data.name}!`);
        return { success: true };
      } else {
        return { success: false, error: res.error };
      }
    } catch (err) {
      const errorMsg = err.response?.data?.error || err.response?.data?.message || err.message || 'Login failed';
      return { success: false, error: errorMsg };
    }
  };

  const signup = async (name, email, password) => {
    try {
      const res = await signupUser({ name, email, password });
      if (res.success) {
        setUser(res.data);
        localStorage.setItem('contentcraft_user', JSON.stringify(res.data));
        toast.success(`Account created! Welcome, ${res.data.name}!`);
        return { success: true };
      } else {
        return { success: false, error: res.error };
      }
    } catch (err) {
       const errorMsg = err.response?.data?.error || err.response?.data?.message || err.message || 'Signup failed';
       return { success: false, error: errorMsg };
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('contentcraft_user');
    toast.success('Logged out successfully');
  };

  const value = {
    user,
    login,
    signup,
    logout,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
