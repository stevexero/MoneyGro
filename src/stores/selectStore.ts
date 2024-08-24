import { create } from "zustand";

interface SelectState {
    selectName: string,
    setSelectName: (nme: string) => void,
}

const useSelectStore = create<SelectState>((set) => ({
    selectName: '',
    setSelectName: (nme) => set({ selectName: nme})
}))

export default useSelectStore;