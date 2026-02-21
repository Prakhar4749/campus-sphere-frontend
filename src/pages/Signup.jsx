import React, { useState, useEffect } from 'react';
import { TextField, Button, Paper, Typography, Box, Container, MenuItem, Grid } from '@mui/material';
import { Send as SendIcon, PersonAdd as PersonAddIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import adminService from '../services/adminService';
import authService from '../services/authService';

const Signup = () => {
  const [formData, setFormData] = useState({
    email: '', password: '', enrollmentNo: '', collegeId: '', departmentId: '', otp: '', role: 'STUDENT'
  });
  const [colleges, setColleges] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [otpSent, setOtpSent] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // 1. Fetch Colleges on Mount
    const fetchColleges = async () => {
      console.info('[Signup] Fetching colleges for initial dropdown');
      try {
        const res = await adminService.getColleges();
        if (res.success) {
          console.info(`[Signup Success] Loaded ${res.data.length} colleges`);
          setColleges(res.data);
        } else {
          console.warn('[Signup Warning] Failed to fetch colleges via adminService', res);
        }
      } catch (e) { console.error('[Signup Error] Exception during fetchColleges:', e); }
    };
    fetchColleges();
  }, []);

  const handleCollegeChange = async (e) => {
    const collegeId = e.target.value;
    console.info(`[Signup] Selected collegeId: ${collegeId}, fetching departments`);
    setFormData({ ...formData, collegeId, departmentId: '' });
    // 2. Fetch Departments when College is selected
    try {
        const res = await adminService.getDepartments(collegeId);
        if (res.success) {
          console.info(`[Signup Success] Loaded ${res.data.length} departments for collegeId: ${collegeId}`);
          setDepartments(res.data);
        } else {
          console.warn(`[Signup Warning] Failed to fetch departments for collegeId: ${collegeId}`, res);
        }
    } catch (e) { console.error(`[Signup Error] Exception during fetchDepartments for collegeId ${collegeId}:`, e); }
  };

  const handleSendOTP = async () => {
    if (!formData.email) return alert("Please enter email first");
    console.info(`[Signup] Requesting registration OTP for email: ${formData.email}`);
    try {
        const res = await authService.sendOTP(formData.email);
        if (res.success) {
          console.info(`[Signup Success] OTP sent successfully to ${formData.email}`);
          setOtpSent(true);
        } else {
          console.warn(`[Signup Warning] Failed to send OTP to ${formData.email}`, res);
        }
    } catch (e) { console.error(`[Signup Error] Exception during sendOTP for email ${formData.email}:`, e); }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.info(`[Signup] Submitting student registration form for email: ${formData.email}`);
    try {
        const res = await authService.signup(formData);
        if (res.success) {
          console.info(`[Signup Success] Account registered successfully for ${formData.email}`);
          navigate('/login');
        } else {
          console.warn(`[Signup Warning] Registration failed for ${formData.email}`, res);
        }
    } catch (e) { 
      console.error(`[Signup Error] Critical error during registration submission for ${formData.email}:`, {
        message: e.message,
        response: e.response?.data
      });
    }
  };

  return (
    <Container maxWidth="md" className="py-12">
      <Paper elevation={4} className="p-8">
        <Typography variant="h5" className="font-bold text-center mb-8">Student Registration</Typography>
        
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth label="Full Name" disabled placeholder='Name taken from email later?' helperText="Name logic depends on backend implementation" />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth label="Enrollment Number" name="enrollmentNo" onChange={(e) => setFormData({...formData, enrollmentNo: e.target.value})} required />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField select fullWidth label="Select College" value={formData.collegeId} onChange={handleCollegeChange} required>
                {colleges.map((c) => <MenuItem key={c.id} value={c.id}>{c.name}</MenuItem>)}
              </TextField>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField select fullWidth label="Select Department" value={formData.departmentId} onChange={(e) => setFormData({...formData, departmentId: e.target.value})} disabled={!formData.collegeId} required>
                {departments.map((d) => <MenuItem key={d.id} value={d.id}>{d.name}</MenuItem>)}
              </TextField>
            </Grid>
            <Grid item xs={12}>
              <Box className="flex gap-4 items-start">
                <TextField fullWidth label="Email Address" name="email" onChange={(e) => setFormData({...formData, email: e.target.value})} required />
                <Button variant="outlined" startIcon={<SendIcon />} className="h-14 px-8" onClick={handleSendOTP} disabled={otpSent}>
                  {otpSent ? "Sent" : "Send OTP"}
                </Button>
              </Box>
            </Grid>
            {otpSent && (
              <Grid item xs={12}>
                <TextField fullWidth label="Enter 6-digit OTP" name="otp" onChange={(e) => setFormData({...formData, otp: e.target.value})} required />
              </Grid>
            )}
            <Grid item xs={12}>
              <TextField fullWidth type="password" label="Create Password" name="password" onChange={(e) => setFormData({...formData, password: e.target.value})} required />
            </Grid>
            <Grid item xs={12}>
              <Button fullWidth type="submit" variant="contained" size="large" startIcon={<PersonAddIcon />} className="bg-green-600 hover:bg-green-700 py-3">
                Register Account
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default Signup;