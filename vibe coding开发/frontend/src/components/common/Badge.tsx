import type { ReactNode } from "react";
import { cn } from "../../lib/cn";

type BadgeProps = {
  children: ReactNode;
  tone?: "blue" | "green" | "pink" | "yellow" | "gray";
};

const tones = {
  blue: "bg-primary/10 text-primary",
  green: "bg-mint/15 text-emerald-700",
  pink: "bg-coral/15 text-rose-600",
  yellow: "bg-amber/20 text-amber-700",
  gray: "bg-slate-100 text-slate-600",
};

export function Badge({ children, tone = "blue" }: BadgeProps) {
  return <span className={cn("rounded-full px-3 py-1 text-xs font-semibold", tones[tone])}>{children}</span>;
}
