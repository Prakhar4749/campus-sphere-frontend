import React, { useState, useEffect } from 'react';
import { Box, Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, Chip } from '@mui/material';
import { VerifiedUser, Group } from '@mui/icons-material';
import adminService from '../../services/adminService';
import { useAuth } from '../../context/AuthContext';

const FacultyDashboard = () => {
  const [students, setStudents] = useState([]);
  const { user } = useAuth();

  const fetchStudents = async () => {
    try {
        // Logic: Use HOD's department ID to fetch students
        // If departmentId is missing from user context, this will fail or need handling
        if (!user?.departmentId) return;
        const res = await adminService.getDeptStudents(user.departmentId);
        if (res.success) setStudents(res.data);
    } catch (e) { console.error(e); }
  };

  useEffect(() => { if (user?.departmentId) fetchStudents(); }, [user]);

  const handleApprove = async (id) => {
    try {
        const res = await adminService.approveStudent(id);
        if (res.success) fetchStudents();
    } catch (e) { console.error(e); }
  };

  return (
    <Box>
      <Box className="flex items-center gap-3 mb-6">
        <Group className="text-blue-600" fontSize="large" />
        <Typography variant="h4" className="font-bold">Department Approvals</Typography>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead className="bg-gray-100">
            <TableRow>
              <TableCell className="font-bold">Student Name</TableCell>
              <TableCell className="font-bold">Enrollment No</TableCell>
              <TableCell className="font-bold">Email</TableCell>
              <TableCell className="font-bold">Status</TableCell>
              <TableCell className="font-bold text-center">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {students.length === 0 ? (
              <TableRow><TableCell colSpan={5} className="text-center py-10">No pending student requests.</TableCell></TableRow>
            ) : (
              students.map((student) => (
                <TableRow key={student.id}>
                  <TableCell>{student.name}</TableCell>
                  <TableCell>{student.enrollmentNo}</TableCell>
                  <TableCell>{student.email}</TableCell>
                  <TableCell>
                    <Chip label={student.status} color={student.status === 'APPROVED' ? 'success' : 'warning'} size="small" />
                  </TableCell>
                  <TableCell className="text-center">
                    {student.status === 'PENDING' && (
                      <Button variant="contained" size="small" color="success" startIcon={<VerifiedUser />} onClick={() => handleApprove(student.id)}>
                        Approve
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default FacultyDashboard;