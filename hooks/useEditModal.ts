import create from "zustand";

interface EditModalState {
  isOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
}

const useEditModal = create<EditModalState>((set) => ({
  isOpen: false,
  openModal: () => set({ isOpen: true }),
  closeModal: () => set({ isOpen: false }),
}));

export default useEditModal;
