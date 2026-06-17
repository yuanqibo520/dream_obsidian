import { USE_MOCK_API } from "../app/constants";
import type { NotificationItem } from "../types/notification";
import { apiGet, apiPost } from "./http";
import { notifications } from "./mockData";

export async function getNotifications(): Promise<NotificationItem[]> {
  if (!USE_MOCK_API) {
    return apiGet<NotificationItem[]>("/notifications");
  }
  return notifications;
}

export async function markNotificationRead(notificationId: string): Promise<void> {
  if (!USE_MOCK_API) {
    await apiPost<void>(`/notifications/${notificationId}/read`);
    return;
  }
  const notification = notifications.find((item) => item.id === notificationId);
  if (notification) notification.isRead = true;
}

export async function markAllNotificationsRead(): Promise<void> {
  if (!USE_MOCK_API) {
    await apiPost<void>("/notifications/read-all");
    return;
  }
  notifications.forEach((notification) => {
    notification.isRead = true;
  });
}
