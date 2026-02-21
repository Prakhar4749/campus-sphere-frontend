import React, { useState } from 'react';
import { Container, Paper, TextField, Button, Typography, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import authService from '../services/authService';

const ChangePassword = () => {
  const [data, setData] = useState({ email: '', oldPassword: '', newPassword: '' });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await authService.changePassword(data);
    if (res.success) navigate('/login');
  };

  return (
    <Container maxWidth="xs" className="h-screen flex items-center">
      <Paper className="p-8 w-full">
        <Alert severity="warning" className="mb-6">For security, you must change your temporary password.</Alert>
        <Typography variant="h6" className="font-bold mb-4">Change Password</Typography>
        <form onSubmit={handleSubmit}>
          <TextField fullWidth label="Email Address" margin="normal" onChange={(e) => setData({...data, email: e.target.value})} required />
          <TextField fullWidth label="Old/Temporary Password" type="password" margin="normal" onChange={(e) => setData({...data, oldPassword: e.target.value})} required />
          <TextField fullWidth label="New Strong Password" type="password" margin="normal" onChange={(e) => setData({...data, newPassword: e.target.value})} required />
          <Button fullWidth type="submit" variant="contained" className="mt-6 bg-blue-600">Update Password</Button>
        </form>
      </Paper>
    </Container>
  );
};

export default ChangePassword;