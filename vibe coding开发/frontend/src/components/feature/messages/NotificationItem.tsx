import { Bell, Heart, MessageCircle, Shield } from "lucide-react";
import { Badge } from "../../common/Badge";
import { formatRelativeTime } from "../../../lib/formatDate";
import type { NotificationItem as NotificationItemType } from "../../../types/notification";

const icons = {
  comment: MessageCircle,
  like: Heart,
  mention: Bell,
  system: Shield,
};

type NotificationItemProps = {
  item: NotificationItemType;
};

export function NotificationItem({ item }: NotificationItemProps) {
  const Icon = icons[item.type];

  return (
    <div className="flex gap-3 rounded-xl bg-white/60 p-4">
      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
        <Icon className="h-5 w-5" />
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <h3 className="font-bold text-ink">{item.title}</h3>
          {!item.isRead && <Badge tone="pink">未读</Badge>}
        </div>
        <p className="mt-1 text-sm text-muted">{item.content}</p>
        <p className="mt-2 text-xs font-semibold text-slate-400">{formatRelativeTime(item.createdAt)}</p>
      </div>
    </div>
  );
}
