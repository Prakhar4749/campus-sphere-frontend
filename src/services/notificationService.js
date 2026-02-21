import axiosInstance from '../utils/axiosInstance';

const notificationService = {
  getNotifications: (unreadOnly = false) => {
    console.info(`[NotificationService] Fetching notifications (unreadOnly: ${unreadOnly})`);
    return axiosInstance.get(`/notification/notifications?unreadOnly=${unreadOnly}`);
  },

  markAsRead: (id) => {
    console.info(`[NotificationService] Marking notification ${id} as read`);
    return axiosInstance.patch(`/notification/notifications/${id}/read`);
  },

  markAllAsRead: () => {
    console.info('[NotificationService] Marking all notifications as read');
    return axiosInstance.patch('/notification/notifications/read-all');
  },
};

export default notificationService;