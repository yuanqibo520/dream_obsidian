import type { ReactNode } from "react";

type GlassPanelProps = {
  children: ReactNode;
  className?: string;
};

/** L1 玻璃容器（样式见 app/globals.css `.glass-panel`） */
export function GlassPanel({ children, className = "" }: GlassPanelProps) {
  return <div className={["glass-panel", className].filter(Boolean).join(" ")}>{children}</div>;
}
