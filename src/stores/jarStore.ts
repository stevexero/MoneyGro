import {create} from 'zustand';

interface JarInputs {
    dreams: number;
    freedom: number;
    knowledge: number;
    generosity: number;
    joy: number;
  }
  
  interface CustomJar {
    name: string;
    value: number;
  }

  interface JarState {
    jarInputs: JarInputs;
    customJars: CustomJar[];
    necessities: number;
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
    setCustomJars: (customAllocations: CustomJar[]) => void;
  }

  const useJarStore = create<JarState>((set) => ({
    jarInputs: {
        dreams: 10,
        freedom: 10,
        knowledge: 10,
        generosity: 5,
        joy: 10,
      },
      customJars: [],
      necessities: 100,

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

  setCustomJars: (customAllocations: CustomJar[]) => {
    set({ customJars: customAllocations });
  },

  addCustomJar: () =>
    set((state) => ({
      customJars: [...state.customJars, { name: 'Custom Jar', value: 0 }],
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

    setNecessities: (amt) => set({ necessities: amt }),
  }))

export default useJarStore;