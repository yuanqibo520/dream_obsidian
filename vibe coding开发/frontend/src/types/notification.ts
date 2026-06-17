export type NotificationType = "comment" | "like" | "mention" | "system";

export type NotificationItem = {
  id: string;
  type: NotificationType;
  title: string;
  content: string;
  createdAt: string;
  isRead: boolean;
};
