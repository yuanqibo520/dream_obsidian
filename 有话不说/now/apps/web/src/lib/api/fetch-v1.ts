import { API_V1_PREFIX } from "shared";
import { getPublicApiBaseUrl } from "./public-base-url";

/** GET /api/v1 下的资源；失败时抛出便于调用方统一 catch */
export async function fetchV1Json<T>(path: string): Promise<T> {
  const base = getPublicApiBaseUrl().replace(/\/$/, "");
  const url = `${base}${API_V1_PREFIX}${path.startsWith("/") ? path : `/${path}`}`;
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`${res.status} ${res.statusText}`);
  }
  return res.json() as Promise<T>;
}
