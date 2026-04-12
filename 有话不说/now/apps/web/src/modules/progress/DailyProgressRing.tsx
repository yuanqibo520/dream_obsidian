/** 当日目标完成比例（示意，后续接真实数据） */
export function DailyProgressRing({ percent = 68 }: { percent?: number }) {
  const r = 52;
  const c = 2 * Math.PI * r;
  const offset = c * (1 - percent / 100);

  return (
    <div className="relative flex h-40 w-40 items-center justify-center">
      <svg width="160" height="160" viewBox="0 0 160 160" className="-rotate-90">
        <defs>
          <linearGradient id="ringGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f472b6" />
            <stop offset="100%" stopColor="#7c3aed" />
          </linearGradient>
        </defs>
        <circle
          cx="80"
          cy="80"
          r={r}
          fill="none"
          stroke="rgba(255,255,255,0.35)"
          strokeWidth="12"
        />
        <circle
          cx="80"
          cy="80"
          r={r}
          fill="none"
          stroke="url(#ringGrad)"
          strokeWidth="12"
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={offset}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
        <span className="text-3xl font-bold text-white drop-shadow-sm">{percent}%</span>
        <span className="text-xs text-white/80">今日目标</span>
      </div>
    </div>
  );
}
