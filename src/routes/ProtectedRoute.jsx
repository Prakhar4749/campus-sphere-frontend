import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = () => {
  const { token, loading } = useAuth();

  if (loading) return null; // Or a loading spinner
  return token ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;