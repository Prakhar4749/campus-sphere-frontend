import { Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import ProtectedRoute from './ProtectedRoute';
import RoleBasedRoute from './RoleBasedRoute';

// Pages
import Login from '../pages/Login';
import Signup from '../pages/Signup';
import ForgotPassword from '../pages/ForgotPassword';
import ResetPassword from '../pages/ResetPassword';
import ChangePassword from '../pages/ChangePassword';
import Unauthorized from '../pages/Unauthorized';
import Notifications from '../pages/Notifications';

// Dashboards
import StudentDashboard from '../pages/dashboards/StudentDashboard';
import FacultyDashboard from '../pages/dashboards/FacultyDashboard';
import DeptAdminDashboard from '../pages/dashboards/DeptAdminDashboard';
import CollegeAdminDashboard from '../pages/dashboards/CollegeAdminDashboard';
import SuperAdminDashboard from '../pages/dashboards/SuperAdminDashboard';

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route path="/change-password" element={<ChangePassword />} />
      <Route path="/unauthorized" element={<Unauthorized />} />

      {/* Protected Routes inside Main Layout */}
      <Route element={<ProtectedRoute />}>
        <Route element={<MainLayout />}>
          
          {/* Notifications (Accessible to all authenticated users) */}
          <Route path="/notifications" element={<Notifications />} />

          {/* Student Routes */}
          <Route element={<RoleBasedRoute allowedRoles={['STUDENT']} />}>
            <Route path="/student/dashboard" element={<StudentDashboard />} />
          </Route>

          {/* Faculty Routes */}
          <Route element={<RoleBasedRoute allowedRoles={['FACULTY']} />}>
            <Route path="/faculty/dashboard" element={<FacultyDashboard />} />
          </Route>

          {/* Dept Admin Routes */}
          <Route element={<RoleBasedRoute allowedRoles={['DEPT_ADMIN']} />}>
            <Route path="/dept-admin/dashboard" element={<DeptAdminDashboard />} />
          </Route>

          {/* College Admin Routes */}
          <Route element={<RoleBasedRoute allowedRoles={['COLLEGE_ADMIN']} />}>
            <Route path="/college-admin/dashboard" element={<CollegeAdminDashboard />} />
          </Route>

          {/* Super Admin Routes */}
          <Route element={<RoleBasedRoute allowedRoles={['SUPER_ADMIN']} />}>
            <Route path="/super-admin/dashboard" element={<SuperAdminDashboard />} />
          </Route>

        </Route>
      </Route>

      {/* Default Redirects */}
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="*" element={<Navigate to="/unauthorized" replace />} />
    </Routes>
  );
};

export default AppRoutes;