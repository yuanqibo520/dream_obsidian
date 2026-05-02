import { Bell, User } from "lucide-react";
import { APP_NAME } from "shared";
import { GlassPanel } from "@/modules/ui/glass-panel";
import { BackendStatus } from "@/modules/system/BackendStatus";
import { CheckinCalendarCard } from "@/modules/checkin/CheckinCalendarCard";
import { DailyProgressRing } from "@/modules/progress/DailyProgressRing";
import { MasteryBarChart } from "@/modules/stats/MasteryBarChart";

/** 首页仪表盘：组合各业务模块，便于单测与 Storybook 挂载 */
export function DashboardView() {
  return (
    <div className="page-atmosphere text-[var(--text-primary)]">
      <div className="relative z-10 mx-auto max-w-lg px-4 pb-28 pt-10 md:max-w-2xl">
        <header className="mb-8 flex items-center justify-between">
          <div>
            <p className="text-xs font-medium uppercase tracking-widest text-[var(--text-muted)]">
              now / 落地骨架
            </p>
            <h1 className="mt-1 text-2xl font-bold text-violet-950">{APP_NAME}</h1>
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-white/30 bg-white/20 text-violet-900 shadow-sm backdrop-blur-md transition hover:bg-white/35"
              aria-label="通知"
            >
              <Bell className="h-5 w-5" strokeWidth={1.75} />
            </button>
            <button
              type="button"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-white/30 bg-white/20 text-violet-900 shadow-sm backdrop-blur-md transition hover:bg-white/35"
              aria-label="账户"
            >
              <User className="h-5 w-5" strokeWidth={1.75} />
            </button>
          </div>
        </header>

        <GlassPanel className="mb-5 p-5">
          <BackendStatus />
        </GlassPanel>

        <GlassPanel className="mb-5 p-5">
          <h2 className="mb-1 text-lg font-semibold text-violet-950">掌握量（示意）</h2>
          <p className="mb-4 text-sm text-[var(--text-muted)]">对接 GET /stats/mastery-series</p>
          <MasteryBarChart />
        </GlassPanel>

        <div className="grid gap-5 md:grid-cols-2">
          <GlassPanel className="flex flex-col items-center justify-center p-6">
            <h2 className="mb-2 self-start text-lg font-semibold text-violet-950">今日进度</h2>
            <div className="rounded-3xl bg-gradient-to-br from-violet-600/90 to-fuchsia-500/90 p-6 shadow-lg ring-1 ring-white/20">
              <DailyProgressRing percent={68} />
            </div>
          </GlassPanel>
          <GlassPanel className="p-4">
            <CheckinCalendarCard />
          </GlassPanel>
        </div>

        <GlassPanel className="mt-5 p-5">
          <h2 className="mb-3 text-lg font-semibold text-violet-950">最近词条（示意）</h2>
          <ul className="divide-y divide-white/15">
            {["serendipity", "ephemeral", "resilience"].map((w) => (
              <li
                key={w}
                className="flex items-center justify-between py-3 text-sm first:pt-0 last:pb-0"
              >
                <span className="font-medium capitalize text-violet-950">{w}</span>
                <span className="text-xs text-[var(--text-muted)]">复习</span>
              </li>
            ))}
          </ul>
        </GlassPanel>
      </div>
    </div>
  );
}
