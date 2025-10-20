import { useState, useContext } from 'react';
import { UserContext } from '../../UserContext';
import axios from 'axios';
import baseUrl from '../../appConfig';

export const useLoginLogic = () => {
  const [user, setUser] = useState({ username: "", password: "" });
  const { setUserInfo } = useContext(UserContext);
  const [redirect, setRedirect] = useState(false);

  const handleNameChange = (e) => {
    setUser((prevUser) => {
      return { ...prevUser, username: e.target.value };
    });
  };

  const handlePasswordChange = (e) => {
    setUser((prevUser) => {
      return { ...prevUser, password: e.target.value };
    });
  };

  const loginFunction = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(`${baseUrl}/auth/login`, user);
      
      if (response.data.success) {
        setUserInfo({ ...response.data.user, flag: true });
        setRedirect(true);
      } else {
        alert(response.data.message || 'Login failed');
      }
    } catch (err) {
      console.error('Login error:', err);
      alert(err.response?.data?.message || 'Login failed. Please try again.');
    }
  };

  return {
    user,
    redirect,
    handleNameChange,
    handlePasswordChange,
    loginFunction
  };
};
