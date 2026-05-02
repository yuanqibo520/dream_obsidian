/**
 * 浏览器端 API 根地址（调试时可在 .env.local 覆盖）。
 * 集中在一处便于排查 CORS / 反向代理问题。
 */
export function getPublicApiBaseUrl(): string {
  return process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000";
}
