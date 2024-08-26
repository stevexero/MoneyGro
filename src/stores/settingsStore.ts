import { create } from "zustand";
import { supaClient } from "../supabaseClient";
import useAuthStore from "./authStore";
import useJarStore from "./jarStore";
import useDeductionStore from "./deductionStore";

interface CustomAllocation {
    name: string;
    alloc_custom: number;
}

interface Deduction {
    value: string | number;
    type: 'fixed' | 'percentage';
    name: string;
}

interface Allocation {
    name: string;
    alloc_id: string;
    alloc_freedom: number;
    alloc_dreams: number;
    alloc_generosity: number;
    alloc_knowledge: number;
    alloc_joy: number;
    custom_allocations: CustomAllocation[];
    alloc_deductions: Deduction[];
    alloc_theme: string;
  }

interface SettingsState {
    allocations: Allocation[];
    getAllocations: () => void;
    addAllocation: (
        name: string,
        alloc_id: string,
        alloc_freedom: number,
        alloc_dreams: number,
        alloc_generosity: number,
        alloc_knowledge: number,
        alloc_joy: number,
        custom_allocations: CustomAllocation[],
        alloc_deductions: Deduction[],
        alloc_theme: string) => void
    clearAllocations: () => void;
}

const useSettingsStore = create<SettingsState>((set) => ({
    allocations: [],

    getAllocations: async () => {
        const { profile } = useAuthStore.getState();
        const { setCustomJars } = useJarStore.getState();
        const { setDeductions } = useDeductionStore.getState();

        if (profile) {
            if (profile?.user_id) {
                const { data } = await supaClient
                    .from('user_settings')
                    .select('*')
                    .eq('user_id', profile.user_id)
                    .single();

                    if (data) {
                        const allocationNames = data.allocation_settings || [];
                        const allocations = allocationNames.map((jsonString: string) => {
                        const allocation = JSON.parse(jsonString);
                        return {
                            name: allocation.name,
                            alloc_id: allocation.alloc_id,
                            alloc_freedom: allocation.alloc_freedom,
                            alloc_dreams: allocation.alloc_dreams,
                            alloc_generosity: allocation.alloc_generosity,
                            alloc_knowledge: allocation.alloc_knowledge,
                            alloc_joy: allocation.alloc_joy,
                            custom_allocations: allocation.custom_allocations || [],
                            alloc_deductions: allocation.alloc_deductions || [],
                            alloc_theme: allocation.alloc_theme || 'light'
                            };
                        });
                    set({ allocations });

                    const selectName = "";
                    if (allocations.length > 0 && selectName) {
                        const selectedAllocation = allocations.find(
                            (allocation) => allocation.name === selectName
                        );
                        if (selectedAllocation) {
                            const customJars = selectedAllocation.custom_allocations.map(
                                (customAlloc: CustomAllocation) => ({
                                    name: customAlloc.name,
                                    value: customAlloc.alloc_custom,
                                })
                            );
                            setCustomJars(customJars);

                            const deductions = selectedAllocation.alloc_deductions.map(
                                (deduction: Deduction) => ({
                                    value: deduction.value,
                                    type: deduction.type,
                                    name: deduction.name,
                                })
                            );
                            setDeductions(deductions);
                        }
                    }
                }
            }
        } else {
            console.error("No user profile found");
        }
    },

    addAllocation: async (
        name: string,
        alloc_id: string,
        alloc_freedom: number,
        alloc_dreams: number,
        alloc_generosity: number,
        alloc_knowledge: number,
        alloc_joy: number,
        // customAllocations,
        // deducts,
        custom_allocations: CustomAllocation[],
        alloc_deductions: Deduction[],
        alloc_theme: string
    ) => {
        const { session } = useAuthStore.getState();
        if (session?.user.id) {
            const newAllocation = {
                name,
                alloc_id,
                alloc_freedom,
                alloc_dreams,
                alloc_generosity,
                alloc_knowledge,
                alloc_joy,
                custom_allocations,
                alloc_deductions,
                alloc_theme
            };

            set((state) => ({
                allocations: [...state.allocations, newAllocation]
            }));

            const { allocations } = useSettingsStore.getState();

            const allocationNames = allocations.map((allocation) =>
                JSON.stringify(allocation)
            );

            const { error } = await supaClient
                .from('user_settings')
                .update({ allocation_settings: allocationNames })
                .eq('user_id', session.user.id);

            if (error) {
                console.error("Error updating allocations in database:", error.message);
            }
        } else {
            console.error("No user profile SESSION found for updating allocations");
        }
    },

    clearAllocations: () => {
        set({ allocations: [] });
    }
}));

export default useSettingsStore;