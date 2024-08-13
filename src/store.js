import { create } from 'zustand';

const useInputsStore = create((set) => ({
  initialAmount: '',
  deductions: [],
  totalDeductions: 0,
  distributableAmount: 0,
  jarInputs: {
    dreams: 10,
    freedom: 10,
    knowledge: 10,
    generosity: 5,
    joy: 10,
  },
  customJars: [],
  necessities: 100,

  setinitialAmount: (amt) => set({ initialAmount: amt }),

  addDeduction: () =>
    set((state) => ({
      deductions: [
        ...state.deductions,
        { value: '', type: 'fixed', name: 'Deduction' },
      ],
    })),

  updateDeduction: (index, name, value) =>
    set((state) => ({
      deductions: state.deductions.map((deduction, i) =>
        i === index
          ? { ...deduction, [name]: parseFloat(value) || value }
          : deduction
      ),
    })),

  toggleDeductionType: (index) =>
    set((state) => ({
      deductions: state.deductions.map((deduction, i) =>
        i === index
          ? {
              ...deduction,
              type: deduction.type === 'fixed' ? 'percentage' : 'fixed',
            }
          : deduction
      ),
    })),

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

  setTotalDeductions: (initialAmt) =>
    set((state) => ({
      totalDeductions: state.deductions.reduce((acc, curr) => {
        const deductionValue = parseFloat(curr.value || 0);
        return (
          acc +
          (curr.type === 'percentage'
            ? (initialAmt * deductionValue) / 100
            : deductionValue)
        );
      }, 0),
    })),

  setDistributableAmount: (amt) => set({ distributableAmount: amt }),

  setJarInputs: (name, value) =>
    set((state) => ({
      jarInputs: { ...state.jarInputs, [name]: parseFloat(value) || value },
    })),

  addCustomJar: () =>
    set((state) => ({
      customJars: [...state.customJars, { value: 0, name: 'Custom Jar' }],
    })),

  updateCustomJar: (index, name, value) =>
    set((state) => ({
      customJars: state.customJars.map((jar, i) =>
        i === index ? { ...jar, [name]: parseFloat(value) || value } : jar
      ),
    })),

  renameCustomJar: (newName, index) =>
    set((state) => ({
      customJars: state.customJars.map((jar, i) =>
        i === index ? { ...jar, name: newName } : jar
      ),
    })),

  removeCustomJar: (index) =>
    set((state) => ({
      customJars: state.customJars.filter((_, i) => i !== index),
    })),

  setNecessities: (amt) => set({ necessities: amt }),
}));

export default useInputsStore;
