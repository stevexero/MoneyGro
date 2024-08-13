import { create } from 'zustand';

interface Deduction {
  value: string | number;
  type: 'fixed' | 'percentage';
  name: string;
}

interface JarInputs {
  dreams: number;
  freedom: number;
  knowledge: number;
  generosity: number;
  joy: number;
}

interface CustomJar {
  value: number;
  name: string;
}

interface InputsState {
  initialAmount: string | number;
  deductions: Deduction[];
  totalDeductions: number;
  distributableAmount: number;
  jarInputs: JarInputs;
  customJars: CustomJar[];
  necessities: number;

  setinitialAmount: (amt: string | number) => void;
  addDeduction: () => void;
  updateDeduction: (
    index: number,
    name: string,
    value: string | number
  ) => void;
  toggleDeductionType: (index: number) => void;
  renameDeduction: (index: number, newName: string) => void;
  removeDeduction: (index: number) => void;
  setTotalDeductions: (initialAmt: number) => void;
  setDistributableAmount: (amt: number) => void;
  setJarInputs: (name: string, value: string | number) => void;
  addCustomJar: () => void;
  updateCustomJar: (
    index: number,
    name: string,
    value: string | number
  ) => void;
  renameCustomJar: (newName: string, index: number) => void;
  removeCustomJar: (index: number) => void;
  setNecessities: (amt: number) => void;
}

const useInputsStore = create<InputsState>((set) => ({
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

  updateDeduction: (index, name, value) => {
    const newValue = typeof value === 'string' ? parseFloat(value) : value;
    set((state) => ({
      deductions: state.deductions.map((deduction, i) =>
        i === index ? { ...deduction, [name]: newValue || value } : deduction
      ),
    }));
  },

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

  setDistributableAmount: (amt) => set({ distributableAmount: amt }),

  setJarInputs: (name, value) => {
    const newValue = typeof value === 'string' ? parseFloat(value) : value;
    set((state) => ({
      jarInputs: { ...state.jarInputs, [name]: newValue || value },
    }));
  },

  addCustomJar: () =>
    set((state) => ({
      customJars: [...state.customJars, { value: 0, name: 'Custom Jar' }],
    })),

  updateCustomJar: (index, name, value) => {
    const newValue = typeof value === 'string' ? parseFloat(value) : value;
    set((state) => ({
      customJars: state.customJars.map((jar, i) =>
        i === index ? { ...jar, [name]: newValue || value } : jar
      ),
    }));
  },

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
