import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { UserContext } from '../UserContext';

const ProtectedRoute = ({ children }) => {
  const { userInfo, loading } = useContext(UserContext);

  // Show loading spinner while checking authentication
  if (loading) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        fontSize: '18px'
      }}>
        Loading...
      </div>
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
