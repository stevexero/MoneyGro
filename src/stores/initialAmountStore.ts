import { create } from 'zustand';

interface InputsState {
  initialAmount: string | number;
  setinitialAmount: (amt: string | number) => void;
}

const useInputsStore = create<InputsState>((set) => ({
  initialAmount: '',

  setinitialAmount: (amt) => set({ initialAmount: amt }),
}));

export default useInputsStore;
