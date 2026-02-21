import axiosInstance from '../utils/axiosInstance';

const adminService = {
  // Public: Fetch Colleges for registration dropdown
  getColleges: () => {
    console.info('[AdminService] Fetching all colleges');
    return axiosInstance.get('/admin/colleges');
  },

  // Public: Fetch Departments based on selected college
  getDepartments: (collegeId) => {
    console.info(`[AdminService] Fetching departments for collegeId: ${collegeId}`);
    return axiosInstance.get(`/admin/departments/${collegeId}`);
  },

  // Secured: Get HOD Details
  getHODDetails: (deptId) => {
    console.info(`[AdminService] Fetching HOD details for deptId: ${deptId}`);
    return axiosInstance.get(`/admin/departments/${deptId}/hod`);
  },

  // Super Admin: Add College/Dept
  addCollege: (data) => {
    console.info(`[AdminService] Adding new college: ${data.name}`);
    return axiosInstance.post('/admin/add-college', data);
  },
  addDepartment: (data) => {
    console.info(`[AdminService] Adding new department: ${data.name} to collegeId: ${data.collegeId}`);
    return axiosInstance.post('/admin/add-department', data);
  },

  // Faculty/HOD: Fetch students in their department
  getDeptStudents: (deptId) => {
    console.info(`[AdminService] Fetching students for deptId: ${deptId}`);
    return axiosInstance.get(`/admin/departments/${deptId}/students`);
  },

  // Faculty/HOD: Approve a pending student
  approveStudent: (studentId) => {
    console.info(`[AdminService] Approving studentId: ${studentId}`);
    return axiosInstance.patch(`/admin/students/${studentId}/approve`);
  },
};

export default adminService;