/**
 * L2 深色统计区（方案 B）：内层不高依赖 backdrop-filter。
 * 后续接 GET /checkin/calendar
 */
const weekdays = ["日", "一", "二", "三", "四", "五", "六"];

export function CheckinCalendarCard() {
  const cells = Array.from({ length: 42 }, (_, i) => {
    const dayNum = i - 2;
    return dayNum >= 1 && dayNum <= 30 ? dayNum : null;
  });
  return (
    <div className="rounded-2xl bg-zinc-900/95 p-4 text-zinc-100 shadow-inner ring-1 ring-white/10">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-sm font-semibold tracking-wide">每日英语背诵</h3>
        <div className="flex items-center gap-2 rounded-full bg-zinc-800 px-2 py-1 text-xs text-zinc-300">
          <span className="cursor-default">‹</span>
          <span>本月</span>
          <span className="cursor-default">›</span>
        </div>
      </div>
      <div className="mb-2 grid grid-cols-7 gap-1 text-center text-[10px] font-medium uppercase text-zinc-500">
        {weekdays.map((d) => (
          <span key={d}>{d}</span>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-y-2 text-center text-xs">
        {cells.map((d, idx) => {
          if (d === null) {
            return <div key={idx} className="h-8" />;
          }
          const done = d <= 11;
          const today = d === 12;
          return (
            <div key={idx} className="flex flex-col items-center gap-1">
              <span
                className={`flex h-7 w-7 items-center justify-center rounded-full ${
                  today
                    ? "bg-emerald-500 font-semibold text-white"
                    : d > 22
                      ? "text-zinc-600"
                      : "text-zinc-200"
                }`}
              >
                {d}
              </span>
              {done ? (
                <span className="h-1 w-1 rounded-full bg-amber-400" aria-hidden />
              ) : (
                <span className="h-1 w-1" aria-hidden />
              )}
            </div>
          );
        })}
      </div>
      <p className="mt-3 text-[10px] text-zinc-500">示意数据 · 接口就绪后绑定真实打卡</p>
    </div>
  );
}
