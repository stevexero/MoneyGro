import { create } from "zustand";
import { supaClient } from "../supabaseClient";
import useAuthStore from "./authStore";

interface Allocation {
    name: string;
  }

interface SettingsState {
    allocations: Allocation[];
    getAllocations: () => void;
    addAllocation: (allocationName: string) => void;
    clearAllocations: () => void;
}

const useSettingsStore = create<SettingsState>((set) => ({
    allocations: [],

    getAllocations: async () => {
        const { profile } = useAuthStore.getState();
        if (profile) {
            console.log(`Fetching allocation settings for user: ${profile.user_id}`);
            
            if (profile?.user_id) {
                const { data } = await supaClient
                    .from('user_settings')
                    .select('*')
                    .eq('user_id', profile.user_id)
                    .single();

                if (data) {
                    const allocationNames = data.allocation_settings || [];
                    const allocations = allocationNames.map((name: string) => ({ name }));
                    set({ allocations });
                }
            }
        } else {
            console.error("No user profile found");
        }
    },

    addAllocation: async (allocationName) => {
        const { session } = useAuthStore.getState();
        if (session?.user.id) {
            const newAllocation = { name: allocationName };

            set((state) => ({
                allocations: [...state.allocations, newAllocation]
            }));

            const { allocations } = useSettingsStore.getState();

            const allocationNames = allocations.map((allocation) => allocation.name);

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