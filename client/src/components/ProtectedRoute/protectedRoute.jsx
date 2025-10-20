import React from 'react';
import { Navigate } from 'react-router-dom';
import { useProtectedRouteLogic } from './protectedRouteLogic';
import { LoadingContainer } from './protectedRouteStyles';

const ProtectedRoute = ({ children }) => {
  const { userInfo, loading } = useProtectedRouteLogic();

  // Show loading spinner while checking authentication
  if (loading) {
    return (
      <LoadingContainer>
        Loading...
      </LoadingContainer>
    );
  }

  // Redirect to login if not authenticated
  if (!userInfo.flag) {
    return <Navigate to="/login" replace />;
  }

  // Render protected content if authenticated
  return children;
};

export default ProtectedRoute;