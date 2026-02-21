import React, { useState, useEffect } from 'react';
import { Grid, Paper, Typography, TextField, Button, Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, MenuItem } from '@mui/material';
import { AddBusiness, DomainAdd, ListAlt } from '@mui/icons-material';
import adminService from '../../services/adminService';

const SuperAdminDashboard = () => {
  const [colleges, setColleges] = useState([]);
  const [newCollege, setNewCollege] = useState({ name: '', location: '', adminEmail: '' });
  const [newDept, setNewDept] = useState({ name: '', code: '', collegeId: '', adminEmail: '' });

  const fetchData = async () => {
    try {
        const res = await adminService.getColleges();
        if (res.success) setColleges(res.data);
    } catch (e) { console.error(e); }
  };

  useEffect(() => { fetchData(); }, []);

  const handleAddCollege = async (e) => {
    e.preventDefault();
    try {
        const res = await adminService.addCollege(newCollege);
        if (res.success) {
            setNewCollege({ name: '', location: '', adminEmail: '' });
            fetchData();
        }
    } catch (e) { console.error(e); }
  };

  const handleAddDept = async (e) => {
    e.preventDefault();
    try {
        const res = await adminService.addDepartment(newDept);
        if (res.success) setNewDept({ name: '', code: '', collegeId: '', adminEmail: '' });
    } catch (e) { console.error(e); }
  };

  return (
    <Box className="p-4">
      <Typography variant="h4" className="font-bold mb-6">Super Admin Management</Typography>
      
      <Grid container spacing={4}>
        {/* Add College Form */}
        <Grid item xs={12} md={6}>
          <Paper className="p-6">
            <Typography variant="h6" className="flex items-center gap-2 mb-4">
              <AddBusiness className="text-blue-600" /> Add New College
            </Typography>
            <form onSubmit={handleAddCollege}>
              <TextField fullWidth label="College Name" margin="normal" value={newCollege.name} onChange={(e) => setNewCollege({...newCollege, name: e.target.value})} required />
              <TextField fullWidth label="Location (e.g. North Campus)" margin="normal" value={newCollege.location} onChange={(e) => setNewCollege({...newCollege, location: e.target.value})} required />
              <TextField fullWidth label="Admin Email" type="email" margin="normal" value={newCollege.adminEmail} onChange={(e) => setNewCollege({...newCollege, adminEmail: e.target.value})} required />
              <Button fullWidth type="submit" variant="contained" className="mt-4 bg-blue-600">Register College</Button>
            </form>
          </Paper>
        </Grid>

        {/* Add Department Form */}
        <Grid item xs={12} md={6}>
          <Paper className="p-6">
            <Typography variant="h6" className="flex items-center gap-2 mb-4">
              <DomainAdd className="text-green-600" /> Add New Department
            </Typography>
            <form onSubmit={handleAddDept}>
              <TextField select fullWidth label="Select College" margin="normal" value={newDept.collegeId} onChange={(e) => setNewDept({...newDept, collegeId: e.target.value})} required>
                {colleges.map((c) => <MenuItem key={c.id} value={c.id}>{c.name}</MenuItem>)}
              </TextField>
              <TextField fullWidth label="Department Name" margin="normal" value={newDept.name} onChange={(e) => setNewDept({...newDept, name: e.target.value})} required />
              <TextField fullWidth label="Dept Code (e.g. IT, CSE)" margin="normal" value={newDept.code} onChange={(e) => setNewDept({...newDept, code: e.target.value})} required />
              <TextField fullWidth label="HOD Email" type="email" margin="normal" value={newDept.adminEmail} onChange={(e) => setNewDept({...newDept, adminEmail: e.target.value})} required />
              <Button fullWidth type="submit" variant="contained" className="mt-4 bg-green-600">Register Department</Button>
            </form>
          </Paper>
        </Grid>

        {/* Colleges List Table */}
        <Grid item xs={12}>
          <TableContainer component={Paper} className="mt-4">
            <Box className="p-4 bg-gray-100 flex items-center gap-2">
              <ListAlt /> <Typography variant="h6" className="font-bold">Active Colleges</Typography>
            </Box>
            <Table>
              <TableHead>
                <TableRow className="bg-gray-50">
                  <TableCell className="font-bold">ID</TableCell>
                  <TableCell className="font-bold">Name</TableCell>
                  <TableCell className="font-bold">Location</TableCell>
                  <TableCell className="font-bold">Admin User ID</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {colleges.map((college) => (
                  <TableRow key={college.id}>
                    <TableCell>{college.id}</TableCell>
                    <TableCell className="font-semibold text-blue-700">{college.name}</TableCell>
                    <TableCell>{college.location}</TableCell>
                    <TableCell>{college.adminUserId}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </Box>
  );
};

export default SuperAdminDashboard;