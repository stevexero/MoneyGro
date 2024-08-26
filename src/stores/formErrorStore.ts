import {create} from 'zustand';

interface FormErrorState {
    formError: string;
    formIsDirty: boolean;
    setFormError: (error: string) => void;
    setFormIsDirty: (bool: boolean) => void;
    clearFormError: () => void;
  }

const useFormErrorStore = create<FormErrorState>((set) => ({
    formError: '',
    formIsDirty: false,

    setFormError: (error: string) => set({ formError: error }),
    setFormIsDirty: (bool) => set({ formIsDirty: bool}),
    clearFormError: () => set({ formError: '' }),
}))

export default useFormErrorStore;