import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "#F5F8FF",
        primary: "#6366F1",
        mint: "#34D399",
        coral: "#FB7185",
        amber: "#FBBF24",
        ink: "#172033",
        muted: "#64748B",
        line: "rgba(148, 163, 184, 0.28)"
      },
      fontFamily: {
        sans: ["Inter", "Geist", "system-ui", "sans-serif"],
        display: ["Inter", "Geist", "system-ui", "sans-serif"]
      },
      boxShadow: {
        glass: "0 24px 70px rgba(37, 48, 82, 0.14)",
        soft: "0 12px 35px rgba(15, 23, 42, 0.08)",
        lift: "0 18px 38px rgba(99, 102, 241, 0.18)"
      },
      borderRadius: {
        glass: "16px"
      }
    }
  },
  plugins: []
} satisfies Config;
