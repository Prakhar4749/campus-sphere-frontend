import React, { useState } from 'react';
import { Box, Drawer, AppBar, Toolbar, List, Typography, Divider, IconButton, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { Menu as MenuIcon, Dashboard, Notifications, ExitToApp, AccountCircle } from '@mui/icons-material';
import { Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const drawerWidth = 240;

const MainLayout = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { logout, user, role } = useAuth();
  const navigate = useNavigate();

  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);

  const userRole = role || localStorage.getItem('user_role');
  
  // Dashboard path helper
  const getDashboardPath = () => {
      switch(userRole) {
          case 'STUDENT': return '/student/dashboard';
          case 'FACULTY': return '/faculty/dashboard';
          case 'DEPT_ADMIN': return '/dept-admin/dashboard';
          case 'COLLEGE_ADMIN': return '/college-admin/dashboard';
          case 'SUPER_ADMIN': return '/super-admin/dashboard';
          default: return '/';
      }
  };

  const menuItems = [
    { text: 'Dashboard', icon: <Dashboard />, path: getDashboardPath() },
    { text: 'Notifications', icon: <Notifications />, path: '/notifications' },
    // { text: 'Profile', icon: <AccountCircle />, path: '/profile' }, // Placeholder for now
  ];

  const drawer = (
    <div>
      <Toolbar className="bg-blue-600 text-white font-bold">
        <Typography variant="h6" noWrap>Campus Sphere</Typography>
      </Toolbar>
      <Divider />
      <List>
        {menuItems.map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton onClick={() => navigate(item.path)}>
              <ListItemIcon className="text-blue-600">{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
        <Divider className="my-4" />
        <ListItem disablePadding>
          <ListItemButton onClick={logout} className="text-red-500">
            <ListItemIcon className="text-red-500"><ExitToApp /></ListItemIcon>
            <ListItemText primary="Logout" />
          </ListItemButton>
        </ListItem>
      </List>
    </div>
  );

  return (
    <Box sx={{ display: 'flex' }} className="bg-gray-50 min-h-screen">
      <AppBar position="fixed" sx={{ width: { sm: `calc(100% - ${drawerWidth}px)` }, ml: { sm: `${drawerWidth}px` } }} className="bg-white text-gray-800 shadow-sm">
        <Toolbar>
          <IconButton color="inherit" edge="start" onClick={handleDrawerToggle} sx={{ mr: 2, display: { sm: 'none' } }}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div" className="flex-grow font-semibold text-gray-800">
            University IT Portal
          </Typography>
          <Box className="flex items-center gap-2">
            <Typography variant="body2" className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-bold uppercase">
              {userRole || 'User'}
            </Typography>
          </Box>
        </Toolbar>
      </AppBar>

      <Box component="nav" sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}>
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          sx={{ display: { xs: 'block', sm: 'none' }, '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth } }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{ display: { xs: 'none', sm: 'block' }, '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth } }}
          open
        >
          {drawer}
        </Drawer>
      </Box>

      <Box component="main" sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` }, mt: '64px' }}>
        <Outlet />
      </Box>
    </Box>
  );
};

export default MainLayout;