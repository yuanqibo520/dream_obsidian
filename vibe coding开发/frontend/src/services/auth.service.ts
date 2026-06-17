import { USE_MOCK_API } from "../app/constants";
import { ApiError } from "../types/api";
import type { AuthSession, LoginRequest, RegisterRequest } from "../types/auth";
import { apiGet, apiPost } from "./http";
import { currentUser } from "./mockData";

export async function login(payload: LoginRequest): Promise<AuthSession> {
  if (!USE_MOCK_API) {
    return apiPost<AuthSession>("/auth/login", payload);
  }
  if (!payload.account.trim() || !payload.password.trim()) {
    throw new ApiError("请输入账号和密码", 400);
  }
  return { token: "mock-token", user: currentUser };
}

export async function register(payload: RegisterRequest): Promise<AuthSession> {
  if (!USE_MOCK_API) {
    return apiPost<AuthSession>("/auth/register", payload);
  }
  if (!payload.phone.trim() || !payload.password.trim()) {
    throw new ApiError("请填写手机号和密码", 400);
  }
  return { token: "mock-token", user: { ...currentUser, nickname: payload.realName || currentUser.nickname } };
}

export async function logout(): Promise<void> {
  if (!USE_MOCK_API) {
    await apiPost<void>("/auth/logout");
  }
}

export async function getMe(): Promise<AuthSession> {
  if (!USE_MOCK_API) {
    return apiGet<AuthSession>("/auth/me");
  }
  return { token: "mock-token", user: currentUser };
}
