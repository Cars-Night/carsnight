import { createClient, type SupabaseClient } from "@supabase/supabase-js";

const SUPABASE_URL = import.meta.env.VITE_WAITLIST_SUPABASE_URL as string | undefined;
const SUPABASE_KEY = import.meta.env.VITE_WAITLIST_SUPABASE_KEY as string | undefined;

let _client: SupabaseClient | null = null;

function getClient(): SupabaseClient {
  if (_client) return _client;
  if (!SUPABASE_URL || !SUPABASE_KEY) {
    throw new Error(
      "Waitlist is not configured. Missing VITE_WAITLIST_SUPABASE_URL or VITE_WAITLIST_SUPABASE_KEY.",
    );
  }
  _client = createClient(SUPABASE_URL, SUPABASE_KEY, {
    auth: { persistSession: false },
  });
  return _client;
}

// Lazy proxy — never throws at module init, only when actually used.
export const waitlistSupabase = new Proxy({} as SupabaseClient, {
  get(_target, prop) {
    const client = getClient();
    // @ts-expect-error dynamic forward
    const value = client[prop];
    return typeof value === "function" ? value.bind(client) : value;
  },
});
