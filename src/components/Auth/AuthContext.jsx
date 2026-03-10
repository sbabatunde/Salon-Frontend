import { createContext, useState, useEffect, useContext } from 'react';
import apiClient from '../../api/token';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch authenticated user
  const fetchUser = async () => {
    try {
      // console.log('test')
      const res = await apiClient.get('/api/user');
      setUser(res.data);
      console.log(res.data);
      console.log('user');
      
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  // Initialize authentication
  useEffect(() => {
    fetchUser();
  }, []);

  // Login function
  // const login = async (email, password) => {
  //   try {
  //     // 1. Get CSRF cookie
  //     await apiClient.get('/sanctum/csrf-cookie');
  //     console.log(document.cookie); // Should show XSRF-TOKEN

  //     // 2. Send login request
  //     await apiClient.post('/login', { email, password });
  //     // login.js


      
  //     // 3. Fetch authenticated user
  //     await fetchUser();
  //   } catch (err) {
  //     console.error('Login failed:', err.response?.data || err.message);
  //     throw err;
  //   }
  // };
  
const login = async (email, password) => {
  try {
    await apiClient.get('/sanctum/csrf-cookie');
    await apiClient.post('/api/login', { email, password });
    await fetchUser();
    return user;  // Return the latest user
  } catch (err) {
    console.error('Login failed:', err.response?.data || err.message);
    throw err;
  }
};

  // Logout function
  const logout = async () => {
    try {
      await apiClient.post('/logout');
      setUser(null);
    } catch (err) {
      console.error('Logout failed:', err.response?.data || err.message);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook for easier access
export const useAuth = () => useContext(AuthContext);
