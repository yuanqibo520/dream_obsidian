import { getPool } from "./pool.js";

export type DbHealthResult = { ok: boolean; detail?: string };

/** 用于 /api/v1/health 聚合展示；未配置 DATABASE_URL 时视为跳过 */
export async function checkDatabaseConnectivity(): Promise<DbHealthResult> {
  const p = getPool();
  if (!p) return { ok: false, detail: "DATABASE_URL not set" };
  try {
    const r = await p.query("SELECT 1 as ok");
    return { ok: r.rows[0]?.ok === 1 };
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e);
    return { ok: false, detail: msg };
  }
}
