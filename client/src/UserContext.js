import {createContext, useEffect, useState} from "react";
import api from './utils/api';

export const UserContext = createContext({});

export function UserContextProvider({children}) {
  const [userInfo, setUserInfo] = useState({flag: false});
  const [loading, setLoading] = useState(true);

  // Function to fetch current user from /auth/me endpoint
  const fetchCurrentUser = async () => {
    try {
      console.log('Fetching current user...');
      const response = await api.get('/auth/me');
      console.log('Auth response:', response.data);
      if (response.data.success) {
        setUserInfo({...response.data.user, flag: true});
        console.log('User authenticated successfully');
      } else {
        setUserInfo({flag: false});
        console.log('Authentication failed - no success flag');
      }
    } catch (error) {
      console.log('Not authenticated:', error.response?.status);
      console.log('Auth error details:', error.response?.data);
      setUserInfo({flag: false});
    } finally {
      setLoading(false);
    }
  };

  // Function to logout user
  const logout = async () => {
    try {
      await api.post('/auth/logout');
    } catch (error) {
      console.log('Logout error:', error);
    } finally {
      setUserInfo({flag: false});
      localStorage.clear();
    }
  };

  // Check authentication status on mount
  useEffect(() => {
    fetchCurrentUser();
  }, []);

  return (
    <UserContext.Provider value={{
      userInfo, 
      setUserInfo, 
      logout, 
      fetchCurrentUser,
      loading
    }}>
      {children}
    </UserContext.Provider>
  );
}