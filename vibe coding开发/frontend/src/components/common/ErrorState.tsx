import { AlertTriangle } from "lucide-react";

export function ErrorState({ label = "加载失败，请稍后重试。" }) {
  return (
    <div className="glass-panel flex items-center gap-3 rounded-glass border-coral/30 px-5 py-4 text-sm font-medium text-rose-600">
      <AlertTriangle className="h-5 w-5" />
      {label}
    </div>
  );
}
