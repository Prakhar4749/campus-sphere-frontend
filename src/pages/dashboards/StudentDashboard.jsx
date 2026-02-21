import React from 'react';
import { Paper, Typography, Box, Grid, Card, CardContent, Button } from '@mui/material';
import { AccountCircle } from '@mui/icons-material';
import { useAuth } from '../../context/AuthContext';

const StudentDashboard = () => {
  const { user } = useAuth();

  return (
    <Box>
      <Typography variant="h4" className="font-bold mb-6">Welcome, {user?.name || 'Student'}</Typography>
      
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Card className="border-t-4 border-blue-500">
            <CardContent className="text-center py-8">
              <AccountCircle sx={{ fontSize: 60 }} className="text-blue-500 mb-2" />
              <Typography variant="h6">Status</Typography>
              <Typography variant="h5" className={`font-bold ${user?.status === 'APPROVED' ? 'text-green-600' : 'text-orange-500'}`}>
                {user?.status || 'PENDING'}
              </Typography>
              <Typography variant="body2" className="text-gray-500 mt-2">
                {user?.status === 'APPROVED' ? 'Your account is active.' : 'Waiting for HOD approval.'}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={8}>
          <Paper className="p-6">
            <Typography variant="h6" className="mb-4">Profile Information</Typography>
            <Box className="space-y-4">
              <Box className="flex justify-between border-b pb-2">
                <Typography className="text-gray-500">Enrollment No</Typography>
                <Typography className="font-semibold">{user?.enrollmentNo || 'N/A'}</Typography>
              </Box>
              <Box className="flex justify-between border-b pb-2">
                <Typography className="text-gray-500">College ID</Typography>
                <Typography className="font-semibold">{user?.collegeId || 'N/A'}</Typography>
              </Box>
              <Box className="flex justify-between border-b pb-2">
                <Typography className="text-gray-500">Email</Typography>
                <Typography className="font-semibold">{user?.email}</Typography>
              </Box>
            </Box>
            <Button variant="contained" className="mt-6 bg-blue-600">Edit Profile</Button>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default StudentDashboard;