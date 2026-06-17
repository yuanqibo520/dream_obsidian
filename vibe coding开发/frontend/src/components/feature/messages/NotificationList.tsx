import { NotificationItem } from "./NotificationItem";
import type { NotificationItem as NotificationItemType } from "../../../types/notification";

type NotificationListProps = {
  items: NotificationItemType[];
};

export function NotificationList({ items }: NotificationListProps) {
  return (
    <div className="glass-panel space-y-3 rounded-glass p-5">
      {items.map((item) => (
        <NotificationItem key={item.id} item={item} />
      ))}
    </div>
  );
}
