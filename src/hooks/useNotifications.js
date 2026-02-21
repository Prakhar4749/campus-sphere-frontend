import { useEffect, useState } from 'react';
import SockJS from 'sockjs-client';
import { Client } from '@stomp/stompjs';
import { toast } from 'react-toastify';

export const useNotifications = (userId) => {
  const [notifications, setNotifications] = useState([]);
  const effectiveUserId = userId || localStorage.getItem('user_id');

  useEffect(() => {
    if (!effectiveUserId) {
      console.warn('[WebSocket] Cannot connect: userId is missing');
      return;
    }

    console.info(`[WebSocket] Attempting connection for userId: ${effectiveUserId}`);

    const client = new Client({
      webSocketFactory: () => {
        // Use the host from your tester if available, otherwise fallback to env
        const gatewayBase = import.meta.env.VITE_API_GATEWAY_URL;
        const wsUrl = `${gatewayBase}/notification/ws-notifications`;
        
        console.info(`[WebSocket] Initializing SockJS connection to ${wsUrl}`);
        return new SockJS(wsUrl);
      },
      connectHeaders: { userId: effectiveUserId },
      debug: (str) => {
        console.log("[STOMP DEBUG] " + str);
      },
      onConnect: () => {
        console.info(`[WebSocket] Successfully connected for userId: ${effectiveUserId}`);
        const destination = `/topic/notifications/${effectiveUserId}`;
        console.info(`[WebSocket] Subscribing to ${destination}`);
        
        client.subscribe(destination, (notification) => {
          try {
            const newNotif = JSON.parse(notification.body);
            console.info(`[WebSocket] Received live notification:`, newNotif);
            setNotifications((prev) => [newNotif, ...prev]);
            toast.info(`🔔 ${newNotif.title}: ${newNotif.message}`);
          } catch (err) {
            console.error(`[WebSocket] Failed to parse notification body:`, notification.body);
          }
        });
      },
      onStompError: (frame) => {
        console.error('[WebSocket STOMP Error]', {
          message: frame.headers['message'],
          body: frame.body,
          details: frame
        });
      },
      onWebSocketClose: (event) => {
        console.warn(`[WebSocket] Connection closed for userId: ${userId}`, event);
      }
    });

    client.activate();

    return () => {
      if (client) client.deactivate();
    };
  }, [userId]);

  return { notifications, setNotifications };
};