import { create } from "zustand";
import { supaClient } from "../supabaseClient";
import { Session, RealtimeChannel } from '@supabase/supabase-js';

interface UserProfile {
    username: string;
}
  
interface AuthState {
    session: Session | null;
    profile: UserProfile | null;
    channel: RealtimeChannel | null;
    isUsernameSet: boolean;
    
    initializeAuth: () => Promise<void>;
    signOut: () => Promise<void>;
    setIsUsernameSetTrue: () => void;
    setIsUsernameSetFalse: () => void;
    getUserProfile: () => Promise<void>;
}

const useAuthStore = create<AuthState>((set, get) => ({
    session: null,
    profile: null,
    channel: null,
    isUsernameSet: false,

    initializeAuth: async () => {
        const { data: { session } } = await supaClient.auth.getSession();
        set({ session });

        // Listen to auth state changes
        supaClient.auth.onAuthStateChange((_event, session) => {
            set({ session, profile: null });
        });

        // Fetch profile data if session exists
        if (session?.user) {
            const { data } = await supaClient
                .from('user_profiles')
                .select('*')
                .eq('user_id', session.user.id)
                .single();

            if (data) {
                set({ profile: data });
                set({ isUsernameSet: true });
            }

            // Listen for profile changes
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
}));

export default useAuthStore;