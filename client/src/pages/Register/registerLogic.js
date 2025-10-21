import { useState, useContext } from 'react';
import { UserContext } from '../../UserContext';
import api from '../../utils/api';

export const useRegisterLogic = () => {
  const [user, setUser] = useState({ username: "", name: "", email: "", password: "" });
  const { setUserInfo } = useContext(UserContext);
  const [redirect, setRedirect] = useState(false);

  const handleUsernameChange = (e) => {
    setUser(prevUser => {
      return { ...prevUser, username: e.target.value };
    });
  };

  const handleEmailChange = (e) => {
    setUser(prevUser => {
      return { ...prevUser, email: e.target.value };
    });
  };

  const handlePasswordChange = (e) => {
    setUser(prevUser => {
      return { ...prevUser, password: e.target.value };
    });
  };

  const handleNameChange = (e) => {
    setUser(prevUser => {
      return { ...prevUser, name: e.target.value };
    });
  };

  const registerUser = async (event) => {
    event.preventDefault();
    try {
      const response = await api.post('/auth/register', user);
      if (response.data.success) {
        setUserInfo({ ...response.data.user, flag: true });
        setRedirect(true);
      } else {
        alert(response.data.message || 'Registration failed');
      }
    } catch (err) {
      console.error('Registration error:', err);
      alert(err.response?.data?.message || 'Registration failed. Please try again.');
    }
  };

  return {
    user,
    redirect,
    handleUsernameChange,
    handleEmailChange,
    handlePasswordChange,
    handleNameChange,
    registerUser
  };
};
