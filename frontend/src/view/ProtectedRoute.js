import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, requiredRole }) => {
  const role = localStorage.getItem('role'); // Lấy quyền từ localStorage

  if (requiredRole && role !== requiredRole) {
    alert('You do not have access to this page');
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
