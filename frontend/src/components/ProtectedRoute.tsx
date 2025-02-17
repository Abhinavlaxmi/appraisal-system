import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

interface ProtectedRouteProps {
  children: JSX.Element;
  allowedRoles: string[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, allowedRoles }) => {
  const auth = useSelector((state: any) => state.auth);
  
  if (!auth.user) {
    return <Navigate to="/login" replace />;
  }

  if (!allowedRoles.includes(auth.user.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};

export default ProtectedRoute;
