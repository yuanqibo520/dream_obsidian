import { USE_MOCK_API } from "../app/constants";
import type { User, UserSettings } from "../types/user";
import { apiGet, apiPatch } from "./http";
import { currentUser } from "./mockData";

let settings: UserSettings = {
  pushEnabled: true,
  privacyMode: false,
  doNotDisturb: false,
  theme: "system",
};

export async function getCurrentUser(): Promise<User> {
  if (!USE_MOCK_API) {
    return apiGet<User>("/users/me");
  }
  return currentUser;
}

export async function getUserById(userId: string): Promise<User> {
  if (!USE_MOCK_API) {
    return apiGet<User>(`/users/${userId}`);
  }
  void userId;
  return currentUser;
}

export async function updateCurrentUser(payload: Partial<User>): Promise<User> {
  if (!USE_MOCK_API) {
    return apiPatch<User>("/users/me", payload);
  }
  Object.assign(currentUser, payload);
  return currentUser;
}

export async function updateUserSettings(payload: UserSettings): Promise<UserSettings> {
  if (!USE_MOCK_API) {
    return apiPatch<UserSettings>("/users/me/settings", payload);
  }
  settings = payload;
  return settings;
}
