import { useState, useCallback } from 'react';

type NotificationType = 'success' | 'error' | 'info';

interface Notification {
  message: string;
  type: NotificationType;
  id: number;
}

export const useNotification = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const addNotification = useCallback((message: string, type: NotificationType = 'info') => {
    const id = Date.now();
    setNotifications((prev) => [...prev, { message, type, id }]);
    setTimeout(() => {
      setNotifications((prev) => prev.filter((n) => n.id !== id));
    }, 5000);
  }, []);

  return { notifications, addNotification };
};
