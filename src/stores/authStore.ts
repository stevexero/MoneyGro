import { create } from "zustand";
import { supaClient } from "../supabaseClient";
import { Session, RealtimeChannel } from '@supabase/supabase-js';
import useSettingsStore from "./settingsStore";

interface UserProfile {
    user_id: string,
    username: string;
}
  
interface AuthState {
    session: Session | null;
    profile: UserProfile | null;
    channel: RealtimeChannel | null;
    isUsernameSet: boolean;
    isReturningUser: boolean;
    
    initializeAuth: () => Promise<void>;
    signOut: () => Promise<void>;
    setIsUsernameSetTrue: () => void;
    setIsUsernameSetFalse: () => void;
    getUserProfile: () => Promise<void>;
    setIsReturningUser: () => void;
}

const useAuthStore = create<AuthState>((set, get) => ({
    session: null,
    profile: null,
    channel: null,
    isUsernameSet: false,
    isReturningUser: false,

    initializeAuth: async () => {
        const { data: { session } } = await supaClient.auth.getSession();
        set({ session });

        supaClient.auth.onAuthStateChange((_event, session) => {
            set({ session, profile: null });
        });

        if (session?.user) {
            const { data: profileData } = await supaClient
                .from('user_profiles')
                .select('*')
                .eq('user_id', session.user.id)
                .single();

            if (profileData) {
                set({ profile: profileData });
                set({ isUsernameSet: true });
            }

            const { data: settingsData, error: settingsError } = await supaClient
                .from('user_settings')
                .select('*')
                .eq('user_id', session.user.id)
                .single();

            if (!settingsData && !settingsError) {
                const { error: insertError } = await supaClient
                    .from('user_settings')
                    .insert({
                        user_id: session.user.id,
                        settings_name: 'default',
                        allocation_settings: [],
                    });

                if (insertError) {
                    console.error("Error initializing user settings:", insertError.message);
                }
            } else if (settingsError) {
                console.error("Error fetching user settings:", settingsError.message);
            }

            const newChannel = supaClient
                .channel(`public:user_profiles`)
                .on(
                    'postgres_changes',
                    {
                        event: '*',
                        schema: 'public',
                        table: 'user_profiles',
                        filter: `user_id=eq.${session.user.id}`,
                    },
                    (payload) => {
                        set({ profile: payload.new as UserProfile });
                    }
                )
                .subscribe();

            set({ channel: newChannel });
        }
    },

    signOut: async () => {
        await supaClient.auth.signOut();
        set({ session: null, profile: null, isUsernameSet: false });
        useSettingsStore.getState().clearAllocations();
    },

    setIsUsernameSetTrue: () => set({ isUsernameSet: true }),
    setIsUsernameSetFalse: () => set({ isUsernameSet: false }),

    getUserProfile: async () => {
        const { session } = get();
        
        if (session?.user) {
            try {
                const { data, error } = await supaClient
                    .from('user_profiles')
                    .select('*')
                    .eq('user_id', session.user.id)
                    .single();
            
                if (error) {
                    console.error('Error fetching user profile:', error.message);
                    return;
                }
            
                if (data) {
                    set({ profile: data, isUsernameSet: !!data.username });
                } else {
                    set({ isUsernameSet: false });
                }
            } catch (err) {
                console.error('Unexpected error fetching user profile:', err);
            }
            
        }
    },

    setIsReturningUser: () => set({ isReturningUser: true})
}));

export default useAuthStore;