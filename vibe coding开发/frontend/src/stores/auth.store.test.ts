import { describe, expect, it } from "vitest";
import { useAuthStore } from "./auth.store";
import { currentUser } from "../services/mockData";

describe("auth.store", () => {
  it("sets and clears a session", () => {
    useAuthStore.getState().setSession("token", currentUser);

    expect(useAuthStore.getState().token).toBe("token");
    expect(useAuthStore.getState().user?.id).toBe(currentUser.id);

    useAuthStore.getState().clearSession();

    expect(useAuthStore.getState().token).toBeNull();
    expect(useAuthStore.getState().user).toBeNull();
  });
});
