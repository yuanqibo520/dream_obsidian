import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "../../lib/cn";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "ghost" | "danger";
  children: ReactNode;
};

const variants = {
  primary: "bg-primary text-white shadow-lift hover:-translate-y-0.5 hover:bg-indigo-500",
  secondary: "border border-line bg-white/75 text-ink shadow-sm hover:-translate-y-0.5 hover:bg-white",
  ghost: "text-muted hover:bg-white/70 hover:text-ink",
  danger: "bg-coral text-white shadow-soft hover:-translate-y-0.5 hover:bg-rose-400",
};

export function Button({ className, variant = "primary", children, ...props }: ButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition duration-200 disabled:cursor-not-allowed disabled:opacity-60",
        variants[variant],
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}
