// components/AdminRoute.js
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const AdminRoute = () => {
  const { user, token } = useAuth();

  if (!token) {
    return <Navigate to="/login" replace />;
  }
  if (user?.is_admin) {
    return <Outlet />;
  }
  return <Navigate to="/" replace />;
};

export default AdminRoute;
