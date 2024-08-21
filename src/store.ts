import { create } from 'zustand';
import { supaClient } from './supabaseClient';
import { Session } from '@supabase/supabase-js';

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
  deductionsHidden: boolean;
  isDeductionsRenameModalOpen: boolean;
  currentDeductionIndex: number | null;
  newDeductionName: string;
  distributableAmount: number;
  jarInputs: JarInputs;
  customJars: CustomJar[];
  necessities: number;

  session: Session | null;
  setSession: (session: Session | null) => void;
  initializeAuth: () => Promise<void>;
  signOut: () => Promise<void>;

  setinitialAmount: (amt: string | number) => void;
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
  deductionsHidden: false,
  isDeductionsRenameModalOpen: false,
  currentDeductionIndex: null,
  newDeductionName: '',
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

  // Initial Amount
  setinitialAmount: (amt) => set({ initialAmount: amt }),

  // Deductions
  addDeduction: () =>
    set((state) => ({
      deductions: [
        ...state.deductions,
        { value: '', type: 'fixed', name: 'Deduction' },
      ],
    })),

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

  // Jars
  setJarInputs: (name, value) => {
    const newValue =
      value === '' ? 0 : typeof value === 'string' ? parseFloat(value) : value;

    set((state) => {
      const updatedJarInputs = { ...state.jarInputs, [name]: newValue || 0 };

      const totalJarPercentage = Object.values(updatedJarInputs).reduce(
        (acc, curr) => acc + (typeof curr === 'number' ? curr : 0),
        0
      );

      const necessities = 100 - totalJarPercentage;

      return {
        jarInputs: updatedJarInputs,
        necessities: necessities >= 0 ? necessities : 0,
      };
    });
  },

  // Custom Jars
  addCustomJar: () =>
    set((state) => ({
      customJars: [...state.customJars, { value: 0, name: 'Custom Jar' }],
    })),

  updateCustomJar: (index, name, value) => {
    const newValue =
      value === '' ? 0 : typeof value === 'string' ? parseFloat(value) : value;

    set((state) => {
      const updatedCustomJars = state.customJars.map((jar, i) =>
        i === index ? { ...jar, [name]: newValue || 0 } : jar
      );

      const totalJarPercentage =
        Object.values(state.jarInputs).reduce(
          (acc, curr) => acc + (typeof curr === 'number' ? curr : 0),
          0
        ) +
        updatedCustomJars.reduce(
          (acc, jar) => acc + (typeof jar.value === 'number' ? jar.value : 0),
          0
        );

      const necessities = 100 - totalJarPercentage;

      return {
        customJars: updatedCustomJars,
        necessities: necessities >= 0 ? necessities : 0,
      };
    });
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

  // Necessities
  setNecessities: (amt) => set({ necessities: amt }),

  // Auth states
  session: null,
  setSession: (session) => set({ session }),

  initializeAuth: async () => {
    const {
      data: { session },
    } = await supaClient.auth.getSession();
    set({ session });

    supaClient.auth.onAuthStateChange((_event, session) => {
      set({ session });
    });
  },

  signOut: async () => {
    await supaClient.auth.signOut();
    set({ session: null });
  },
}));

export default useInputsStore;
