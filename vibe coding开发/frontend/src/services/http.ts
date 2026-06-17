import axios from "axios";
import { API_BASE_URL } from "../app/constants";
import { ApiError, type ApiResponse } from "../types/api";
import { useAuthStore } from "../stores/auth.store";

export const http = axios.create({
  baseURL: API_BASE_URL,
  timeout: 12_000,
});

http.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

http.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;
    const message = error.response?.data?.message ?? error.message ?? "请求失败，请稍后重试";
    return Promise.reject(new ApiError(message, status));
  },
);

export async function apiGet<T>(url: string, params?: unknown): Promise<T> {
  const response = await http.get<ApiResponse<T> | T>(url, { params });
  return unwrapResponse(response.data);
}

export async function apiPost<T>(url: string, data?: unknown): Promise<T> {
  const response = await http.post<ApiResponse<T> | T>(url, data);
  return unwrapResponse(response.data);
}

export async function apiPatch<T>(url: string, data?: unknown): Promise<T> {
  const response = await http.patch<ApiResponse<T> | T>(url, data);
  return unwrapResponse(response.data);
}

function unwrapResponse<T>(payload: ApiResponse<T> | T): T {
  if (payload && typeof payload === "object" && "data" in payload && "code" in payload) {
    return (payload as ApiResponse<T>).data;
  }
  return payload as T;
}
