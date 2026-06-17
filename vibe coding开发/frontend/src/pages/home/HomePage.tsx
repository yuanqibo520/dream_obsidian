import { useState } from "react";
import { Sparkles, TrendingUp } from "lucide-react";
import { PageContainer } from "../../components/layout/PageContainer";
import { ActivityRankPanel } from "../../components/feature/home/ActivityRankPanel";
import { CalendarPanel } from "../../components/feature/home/CalendarPanel";
import { QuickPostBox } from "../../components/feature/home/QuickPostBox";
import { PostList } from "../../components/feature/posts/PostList";
import { Tabs } from "../../components/common/Tabs";
import { sortOptions } from "../../app/constants";
import { useInfinitePosts } from "../../hooks/useInfinitePosts";
import type { SortMode } from "../../types/api";

export function HomePage() {
  const [sort, setSort] = useState<SortMode>("hot");
  const { data, isLoading, isError } = useInfinitePosts(undefined, undefined, sort);

  return (
    <PageContainer>
      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_320px]">
        <section className="min-w-0 space-y-4">
          <div className="glass-panel overflow-hidden rounded-[28px] p-6 sm:p-7">
            <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-2xl">
                <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/72 px-3 py-1.5 text-xs font-bold text-primary shadow-sm">
                  <Sparkles className="h-4 w-4" />
                  SAU 大学今日热议
                </div>
                <h1 className="text-4xl font-black leading-tight text-ink sm:text-5xl">校园信息流</h1>
                <p className="mt-3 max-w-xl text-sm leading-6 text-muted">
                  发现本校正在发生的新鲜事，快速进入资讯、学习互助、二手交易和失物招领。
                </p>
              </div>
              <div className="grid grid-cols-3 gap-2 rounded-2xl bg-white/62 p-2 shadow-sm">
                {[
                  ["128", "今日动态"],
                  ["36", "互助回复"],
                  ["9", "待认领"],
                ].map(([value, label]) => (
                  <div key={label} className="rounded-xl bg-white/72 px-3 py-3 text-center">
                    <p className="text-lg font-black text-primary">{value}</p>
                    <p className="text-[11px] font-bold text-muted">{label}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-2 text-sm font-bold text-muted">
                <TrendingUp className="h-4 w-4 text-coral" />
                信息流按互动热度和发布时间排序
              </div>
              <Tabs value={sort} onChange={setSort} items={sortOptions} />
            </div>
          </div>
          <QuickPostBox />
          <PostList posts={data?.items} isLoading={isLoading} isError={isError} />
        </section>
        <aside className="space-y-4">
          <CalendarPanel />
          <ActivityRankPanel />
        </aside>
      </div>
    </PageContainer>
  );
}
