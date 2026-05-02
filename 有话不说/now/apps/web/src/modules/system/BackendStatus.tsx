"use client";

import { useEffect, useState } from "react";
import { fetchV1Json } from "@/lib/api/fetch-v1";

type Health = {
  status?: string;
  database?: string;
  database_detail?: string;
};

/** 系统 / 联调：展示后端与数据库连通状态 */
export function BackendStatus() {
  const [data, setData] = useState<Health | null>(null);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    fetchV1Json<Health>("/health")
      .then(setData)
      .catch((e: Error) => setErr(e.message));
  }, []);

  if (err) {
    return (
      <p className="text-sm text-red-700/90">
        API 未连接：{err}（请先 <code className="rounded bg-black/5 px-1">npm run dev</code> 并启动
        api）
      </p>
    );
  }
  if (!data) {
    return <p className="text-sm text-[var(--text-muted)]">正在检测 API…</p>;
  }

  return (
    <p className="text-sm text-[var(--text-muted)]">
      后端 <span className="font-medium text-emerald-700">{data.status}</span>
      {" · "}
      数据库{" "}
      <span className="font-medium text-violet-800">{data.database}</span>
      {data.database_detail ? (
        <span className="block text-xs opacity-80">{data.database_detail}</span>
      ) : null}
    </p>
  );
}
