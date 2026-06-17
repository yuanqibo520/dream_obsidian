import { create } from "zustand";

type UiState = {
  sidebarCollapsed: boolean;
  setSidebarCollapsed: (value: boolean) => void;
};

export const useUiStore = create<UiState>((set) => ({
  sidebarCollapsed: false,
  setSidebarCollapsed: (value) => set({ sidebarCollapsed: value }),
}));
