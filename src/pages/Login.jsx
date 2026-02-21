import React, { useState } from 'react';
import { TextField, Button, Paper, Typography, Box, Container, InputAdornment, IconButton } from '@mui/material';
import { Visibility, VisibilityOff, Login as LoginIcon } from '@mui/icons-material';
import { useNavigate, Link } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { useAuth } from '../context/AuthContext';
import authService from '../services/authService';

const Login = () => {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.info(`[Login] Attempting login for email: ${credentials.email}`);
    try {
      const response = await authService.login(credentials);
      if (response.success) {
        const token = response.data.token;
        console.info(`[Login Success] Received token`);
        
        // Decode token locally to determine correct redirection
        let role = 'STUDENT';
        try {
          const decoded = jwtDecode(token);
          role = decoded.role || decoded.userRole || 'STUDENT';
          console.info(`[Login Success] Decoded role from token for redirect: ${role}`);
        } catch (decodeErr) {
          console.error('[Login] Error decoding token for redirect', decodeErr);
        }

        // Initialize Auth Context session
        login(response.data, token);
        
        const dashboardMap = {
          STUDENT: '/student/dashboard',
          FACULTY: '/faculty/dashboard',
          DEPT_ADMIN: '/dept-admin/dashboard',
          COLLEGE_ADMIN: '/college-admin/dashboard',
          SUPER_ADMIN: '/super-admin/dashboard'
        };
        
        const targetPath = dashboardMap[role] || '/unauthorized';
        console.info(`[Login Success] Redirecting to: ${targetPath}`);
        navigate(targetPath);
      } else {
        console.warn(`[Login Failed] Server returned success: false`, response);
      }
    } catch (err) {
      console.error("[Login Error] Critical error during login submission:", {
        message: err.message,
        response: err.response?.data
      });
    }
  };

  return (
    <Container maxWidth="sm" className="h-screen flex items-center justify-center">
      <Paper elevation={6} className="p-8 w-full">
        <Box className="text-center mb-6">
          <Typography variant="h4" className="font-bold text-blue-600">Campus Sphere</Typography>
          <Typography variant="body1" className="text-gray-500">Sign in to your account</Typography>
        </Box>

        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Email Address"
            name="email"
            variant="outlined"
            margin="normal"
            onChange={handleChange}
            required
          />
          <TextField
            fullWidth
            label="Password"
            name="password"
            type={showPassword ? 'text' : 'password'}
            variant="outlined"
            margin="normal"
            onChange={handleChange}
            required
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          
          <Box className="text-right mt-2">
            <Link to="/forgot-password" variant="body2" className="text-blue-500 hover:underline">
              Forgot password?
            </Link>
          </Box>

          <Button
            fullWidth
            type="submit"
            variant="contained"
            size="large"
            startIcon={<LoginIcon />}
            className="mt-6 bg-blue-600 hover:bg-blue-700"
          >
            Login
          </Button>
        </form>

        <Box className="text-center mt-6">
          <Typography variant="body2">
            Don't have an account? {' '}
            <Link to="/signup" className="text-blue-500 font-bold hover:underline">
              Create one here
            </Link>
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
};

export default Login;