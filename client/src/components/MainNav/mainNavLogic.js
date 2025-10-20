import { useContext, useState } from 'react';
import { UserContext } from '../../UserContext';

export const useMainNavLogic = () => {
  const { userInfo, logout } = useContext(UserContext);
  const [Redirect, setRedirect] = useState(false);

  const handleClick = async () => {
    await logout();
    setRedirect(true);
  };

  return {
    userInfo,
    Redirect,
    handleClick
  };
};
