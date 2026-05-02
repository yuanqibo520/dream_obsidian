function readPort(): number {
  const raw = process.env.PORT;
  if (!raw) return 4000;
  const n = Number(raw);
  return Number.isFinite(n) && n > 0 ? n : 4000;
}

export const env = {
  PORT: readPort(),
  CORS_ORIGIN: process.env.CORS_ORIGIN ?? "http://localhost:3000",
  DATABASE_URL: process.env.DATABASE_URL ?? "",
} as const;
