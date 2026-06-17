import { Inbox } from "lucide-react";

export function EmptyState({ title = "暂无内容", description = "换个条件试试，或者稍后再来看看。" }) {
  return (
    <div className="glass-panel flex flex-col items-center justify-center rounded-glass px-6 py-14 text-center">
      <Inbox className="mb-3 h-9 w-9 text-primary" />
      <h3 className="text-base font-bold text-ink">{title}</h3>
      <p className="mt-1 text-sm text-muted">{description}</p>
    </div>
  );
}
