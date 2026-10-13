import { create } from "zustand";

type UiState = {
  isNavOpen: boolean;
  setNavOpen: (isNavOpen: boolean) => void;
};

export const useUiStore = create<UiState>((set) => ({
  isNavOpen: false,
  setNavOpen: (isNavOpen) => set({ isNavOpen }),
}));
