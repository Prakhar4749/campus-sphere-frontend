import React from 'react';
import { Container, Typography, Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import { Lock } from '@mui/icons-material';

const Unauthorized = () => {
  return (
    <Container maxWidth="sm" className="h-screen flex flex-col items-center justify-center text-center">
      <Lock sx={{ fontSize: 80, color: 'gray' }} />
      <Typography variant="h3" className="mt-4 font-bold text-gray-800">403</Typography>
      <Typography variant="h5" className="mb-4 text-gray-600">Access Denied</Typography>
      <Typography variant="body1" className="mb-8">
        You do not have permission to view this page.
      </Typography>
      <Button component={Link} to="/" variant="contained" color="primary">
        Go to Home
      </Button>
    </Container>
  );
};

export default Unauthorized;