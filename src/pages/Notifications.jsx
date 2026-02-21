import React, { useEffect, useState } from 'react';
import { Box, Typography, Paper, List, ListItem, ListItemText, IconButton, Button, Divider, Badge } from '@mui/material';
import { DoneAll, CheckCircleOutline, NotificationsActive } from '@mui/icons-material';
import { useAuth } from '../context/AuthContext';
import { useNotifications } from '../hooks/useNotifications';
import notificationService from '../services/notificationService';

const Notifications = () => {
  const { user } = useAuth();
  const userId = user?.id || localStorage.getItem('user_id');
  const { notifications: liveNotifications } = useNotifications(userId);
  const [history, setHistory] = useState([]);

  const fetchHistory = async () => {
    try {
        console.info('[Notifications Page] Fetching unread history');
        const res = await notificationService.getNotifications(true); // Fetch unread only first as per tester
        if (res.success) setHistory(res.data);
    } catch (e) { console.error('[Notifications Page] Error fetching history:', e); }
  };

  useEffect(() => { 
    fetchHistory(); 
  }, [userId]);

  // Sync live notifications with history list
  useEffect(() => {
    if (liveNotifications.length > 0) {
      setHistory((prev) => [...liveNotifications, ...prev]);
    }
  }, [liveNotifications]);
  
  const handleMarkRead = async (id) => {
    try {
        const res = await notificationService.markAsRead(id);
        if (res.success) fetchHistory();
    } catch (e) { console.error(e); }
  };

  const handleMarkAllRead = async () => {
    try {
        const res = await notificationService.markAllAsRead();
        if (res.success) fetchHistory();
    } catch (e) { console.error(e); }
  };

  return (
    <Box className="max-w-4xl mx-auto p-4">
      <Box className="flex justify-between items-center mb-6">
        <Typography variant="h4" className="font-bold flex items-center gap-3">
          <NotificationsActive className="text-yellow-600" /> Notifications
        </Typography>
        <Button startIcon={<DoneAll />} variant="outlined" color="primary" onClick={handleMarkAllRead}>
          Mark All as Read
        </Button>
      </Box>

      <Paper elevation={2}>
        <List className="p-0">
          {history.length === 0 ? (
            <Box className="p-10 text-center text-gray-400">No notifications found.</Box>
          ) : (
            history.map((notif, index) => (
              <React.Fragment key={notif.id}>
                <ListItem 
                  className={`py-4 hover:bg-gray-50 transition-colors ${!notif.isRead ? 'bg-blue-50 border-l-4 border-blue-500' : ''}`}
                  secondaryAction={
                    !notif.isRead && (
                      <IconButton edge="end" color="success" onClick={() => handleMarkRead(notif.id)}>
                        <CheckCircleOutline />
                      </IconButton>
                    )
                  }
                >
                  <ListItemText 
                    primary={
                      <Box className="flex items-center gap-2">
                        <Typography className={`font-bold ${!notif.isRead ? 'text-blue-900' : 'text-gray-700'}`}>
                          {notif.title}
                        </Typography>
                        {!notif.isRead && <Badge badgeContent="NEW" color="error" className="ml-2 scale-75" />}
                      </Box>
                    }
                    secondary={
                      <>
                        <Typography variant="body2" className="mt-1 text-gray-600">{notif.message}</Typography>
                        <Typography variant="caption" className="text-gray-400 block mt-1">
                          {new Date(notif.createdAt).toLocaleString()}
                        </Typography>
                      </>
                    }
                  />
                </ListItem>
                {index < history.length - 1 && <Divider />}
              </React.Fragment>
            ))
          )}
        </List>
      </Paper>
    </Box>
  );
};

export default Notifications;