import { create } from "zustand";

interface State {
  isOpen: boolean;
  open: () => void;
  close: () => void;
}

const useRegisterModal = create<State>((set) => ({
  isOpen: false,
  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false }),
}));

export default useRegisterModal;
