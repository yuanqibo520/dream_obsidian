import { useAuthStore } from "../stores/auth.store";

export function useAuth() {
  return useAuthStore();
}
