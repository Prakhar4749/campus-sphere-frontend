import React, { useState } from 'react';
import { Container, Paper, TextField, Button, Typography, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import authService from '../services/authService';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await authService.forgotPassword(email);
    if (res.success) navigate('/reset-password', { state: { email } });
  };

  return (
    <Container maxWidth="xs" className="h-screen flex items-center">
      <Paper className="p-8 w-full">
        <Typography variant="h5" className="font-bold text-center mb-4">Reset Password</Typography>
        <Typography variant="body2" className="text-gray-500 text-center mb-6">
          Enter your email to receive a password reset OTP.
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField fullWidth label="Email Address" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          <Button fullWidth type="submit" variant="contained" className="mt-6 bg-blue-600">Send OTP</Button>
        </form>
      </Paper>
    </Container>
  );
};

export default ForgotPassword;