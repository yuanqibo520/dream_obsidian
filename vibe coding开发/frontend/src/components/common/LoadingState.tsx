export function LoadingState({ label = "加载中..." }) {
  return (
    <div className="glass-panel rounded-glass px-6 py-10 text-center text-sm font-medium text-muted">
      <div className="mx-auto mb-3 h-8 w-8 animate-spin rounded-full border-2 border-primary/20 border-t-primary" />
      {label}
    </div>
  );
}
