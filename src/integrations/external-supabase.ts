import { createClient, type SupabaseClient } from "@supabase/supabase-js";

const SUPABASE_URL = (import.meta.env.VITE_WAITLIST_SUPABASE_URL as string | undefined)?.trim();
const SUPABASE_KEY = (import.meta.env.VITE_WAITLIST_SUPABASE_KEY as string | undefined)?.trim();

export const waitlistConfigured = Boolean(SUPABASE_URL && SUPABASE_KEY);

// Eagerly create the client when configured. No proxy, no lazy re-entry.
export const waitlistSupabase: SupabaseClient | null = waitlistConfigured
  ? createClient(SUPABASE_URL!, SUPABASE_KEY!, {
      auth: { persistSession: false, autoRefreshToken: false, detectSessionInUrl: false },
    })
  : null;
