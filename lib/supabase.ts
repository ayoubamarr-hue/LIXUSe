import { createClient } from '@supabase/supabase-js';

// IMPORTANT: Replace these with your actual Supabase project URL and Anon Key
// You can find these in your Supabase project settings -> API
// If you are using a build tool like Vite, you can use import.meta.env.VITE_SUPABASE_URL
const supabaseUrl = (import.meta as any).env?.VITE_SUPABASE_URL || 'https://mkqdxjrautahxjawicyt.supabase.co';
const supabaseKey = (import.meta as any).env?.VITE_SUPABASE_ANON_KEY || 'sb_publishable_7iNFqb9Qr1gYMoWwzaGdig_aDKMXktv';

export const supabase = createClient(supabaseUrl, supabaseKey);