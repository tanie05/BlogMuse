import { useContext } from 'react';
import { UserContext } from '../../UserContext';

export const useProtectedRouteLogic = () => {
  const { userInfo, loading } = useContext(UserContext);

  return {
    userInfo,
    loading
  };
};
