import { describe, expect, it, vi } from "vitest";
import { formatRelativeTime } from "./formatDate";

describe("formatRelativeTime", () => {
  it("formats recent timestamps in Chinese relative time", () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-06-15T12:00:00.000Z"));
    expect(formatRelativeTime("2026-06-15T11:45:00.000Z")).toBe("15 分钟前");
    expect(formatRelativeTime("2026-06-15T09:00:00.000Z")).toBe("3 小时前");
    vi.useRealTimers();
  });
});
