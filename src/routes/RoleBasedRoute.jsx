import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const RoleBasedRoute = ({ allowedRoles }) => {
  const { role, user, loading } = useAuth();
  const userRole = role || localStorage.getItem('user_role');

  console.info(`[RoleBasedRoute] Checking access`, {
    expected: allowedRoles,
    actual: userRole,
    userState: user,
    loading: loading
  });

  if (loading) return null;

  if (!userRole || userRole === 'undefined') {
    console.warn('[RoleBasedRoute] No valid role found, redirecting to unauthorized');
    return <Navigate to="/unauthorized" replace />;
  }

  const hasAccess = allowedRoles.includes(userRole);
  
  if (!hasAccess) {
    console.error(`[RoleBasedRoute] Access Denied. Role "${userRole}" not in ${JSON.stringify(allowedRoles)}`);
    return <Navigate to="/unauthorized" replace />;
  }

  console.info(`[RoleBasedRoute] Access Granted for role: ${userRole}`);
  return <Outlet />;
};

export default RoleBasedRoute;