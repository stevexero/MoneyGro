import {create} from 'zustand';

interface Deduction {
  value: string | number;
  type: 'fixed' | 'percentage';
  name: string;
  }

interface DeductionState {
  deductions: Deduction[];
  totalDeductions: number;
  deductionsHidden: boolean;
  isDeductionsRenameModalOpen: boolean;
  currentDeductionIndex: number | null;
  newDeductionName: string;
  distributableAmount: number;

  addDeduction: () => void;
  updateDeduction: (
    index: number,
    name: string,
    value: string | number
  ) => void;
  toggleDeductionType: (index: number) => void;
  toggleDeductionsHidden: () => void;
  renameDeduction: (index: number, newName: string) => void;
  removeDeduction: (index: number) => void;
  removeAllDeductions: () => void;
  setTotalDeductions: (initialAmt: number) => void;
  setIsDeductionsRenameModalOpen: (
    isDeductionsRenameModalOpen: boolean
  ) => void;
  setCurrentDeductionIndex: (index: number) => void;
  setNewDeductionName: (newName: string) => void;
  setDistributableAmount: (amt: number) => void;
  setDeductions: (deducts: Deduction[]) => void;
  }

const useDeductionStore = create<DeductionState>((set) => ({
    deductions: [],
  totalDeductions: 0,
  deductionsHidden: false,
  isDeductionsRenameModalOpen: false,
  currentDeductionIndex: null,
  newDeductionName: '',
  distributableAmount: 0,

  addDeduction: () =>
    set((state) => ({
      deductions: [
        ...state.deductions,
        { value: '', type: 'fixed', name: 'Deduction' },
      ],
    })),

  setDeductions: (deducts: Deduction[]) => {
    set({ deductions: deducts });
  },

  updateDeduction: (index, name, value) => {
    const newValue = typeof value === 'string' ? parseFloat(value) : value;

    set((state) => {
      const updatedDeductions = state.deductions.map((deduction, i) =>
        i === index ? { ...deduction, [name]: newValue || value } : deduction
      );

      if (updatedDeductions[index].type === 'percentage') {
        if (newValue > 100) {
          updatedDeductions[index].value = 100;
        }
      }

      return { deductions: updatedDeductions };
    });
  },

  toggleDeductionType: (index) =>
    set((state) => {
      const updatedDeductions = state.deductions.map((deduction, i) => {
        if (i === index) {
          const newType: 'fixed' | 'percentage' =
            deduction.type === 'fixed' ? 'percentage' : 'fixed';
          const newValue =
            newType === 'percentage' &&
            typeof deduction.value === 'number' &&
            deduction.value > 100
              ? 100
              : deduction.value;

          return {
            ...deduction,
            type: newType,
            value: newValue,
          };
        }
        return deduction;
      });

      return { deductions: updatedDeductions };
    }),

  renameDeduction: (index, newName) =>
    set((state) => ({
      deductions: state.deductions.map((deduction, i) =>
        i === index
          ? {
              ...deduction,
              name: newName,
            }
          : deduction
      ),
    })),

  removeDeduction: (index) =>
    set((state) => ({
      deductions: state.deductions.filter((_, i) => i !== index),
    })),

  removeAllDeductions: () => set({ deductions: [] }),

  setTotalDeductions: (initialAmt) =>
    set((state) => ({
      totalDeductions: state.deductions.reduce((acc, curr) => {
        const deductionValue =
          typeof curr.value === 'number'
            ? curr.value
            : parseFloat(curr.value || '0');
        return (
          acc +
          (curr.type === 'percentage'
            ? (initialAmt * deductionValue) / 100
            : deductionValue)
        );
      }, 0),
    })),

  toggleDeductionsHidden: () =>
    set((state) => ({ deductionsHidden: !state.deductionsHidden })),

  setIsDeductionsRenameModalOpen: (modalState) =>
    set({
      isDeductionsRenameModalOpen: modalState,
    }),

  setCurrentDeductionIndex: (index) =>
    set({
      currentDeductionIndex: index,
    }),

  setNewDeductionName: (newName) => set({ newDeductionName: newName }),

  setDistributableAmount: (amt) => set({ distributableAmount: amt }),
}))

export default useDeductionStore;