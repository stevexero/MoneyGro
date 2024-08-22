import { createClient } from '@supabase/supabase-js';
import { Database } from './database.types';

const supabaseUrl = import.meta.env.VITE_SUPABASE_API_URL as string;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

export const supaClient = createClient<Database>(supabaseUrl, supabaseAnonKey);

// supaClient.from('user_profiles').select('*').then(({ data }) => {}) Use later?
