import React, { useState } from 'react';
import { Container, Paper, TextField, Button, Typography, Box } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import authService from '../services/authService';

const ResetPassword = () => {
  const { state } = useLocation();
  const [data, setData] = useState({ email: state?.email || '', otp: '', newPassword: '' });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await authService.resetPassword(data);
    if (res.success) navigate('/login');
  };

  return (
    <Container maxWidth="xs" className="h-screen flex items-center">
      <Paper className="p-8 w-full">
        <Typography variant="h5" className="font-bold text-center mb-6">Verify OTP</Typography>
        <form onSubmit={handleSubmit}>
          <TextField fullWidth label="Email" margin="normal" value={data.email} disabled />
          <TextField fullWidth label="6-Digit OTP" margin="normal" onChange={(e) => setData({...data, otp: e.target.value})} required />
          <TextField fullWidth label="New Password" type="password" margin="normal" onChange={(e) => setData({...data, newPassword: e.target.value})} required />
          <Button fullWidth type="submit" variant="contained" className="mt-6 bg-blue-600">Reset Password</Button>
        </form>
      </Paper>
    </Container>
  );
};

export default ResetPassword;