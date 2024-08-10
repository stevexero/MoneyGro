import { create } from 'zustand';

const useInputsStore = create((set) => ({
  initialAmount: '',
  setinitialAmount: (amt) => set({ initialAmount: amt }),
}));

export default useInputsStore;
