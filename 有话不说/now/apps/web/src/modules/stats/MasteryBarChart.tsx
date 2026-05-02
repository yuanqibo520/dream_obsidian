"use client";

import {
  Bar,
  BarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const mock = [
  { day: "一", value: 3 },
  { day: "二", value: 5 },
  { day: "三", value: 2 },
  { day: "四", value: 8 },
  { day: "五", value: 6 },
  { day: "六", value: 4 },
  { day: "日", value: 7 },
];

/** 掌握量柱状示意 → 后续接 GET /stats/mastery-series */
export function MasteryBarChart() {
  return (
    <div className="h-48 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={mock} margin={{ top: 8, right: 8, left: -20, bottom: 0 }}>
          <defs>
            <linearGradient id="barGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#f472b6" />
              <stop offset="100%" stopColor="#7c3aed" />
            </linearGradient>
          </defs>
          <XAxis
            dataKey="day"
            tick={{ fill: "rgba(30,20,60,0.5)", fontSize: 12 }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis hide />
          <Tooltip
            cursor={{ fill: "rgba(255,255,255,0.15)" }}
            contentStyle={{
              borderRadius: 12,
              border: "1px solid rgba(255,255,255,0.3)",
              background: "rgba(255,255,255,0.85)",
            }}
          />
          <Bar dataKey="value" fill="url(#barGrad)" radius={[10, 10, 0, 0]} maxBarSize={36} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
