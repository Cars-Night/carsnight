import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = import.meta.env.VITE_WAITLIST_SUPABASE_URL as string | undefined;
const SUPABASE_KEY = import.meta.env.VITE_WAITLIST_SUPABASE_KEY as string | undefined;

if (!SUPABASE_URL || !SUPABASE_KEY) {
  // Surface the real cause in the browser console instead of a silent failure
  console.error(
    "[waitlist] Missing VITE_WAITLIST_SUPABASE_URL or VITE_WAITLIST_SUPABASE_KEY env vars. Configure them in Vercel and redeploy.",
  );
}

export const waitlistSupabase = createClient(SUPABASE_URL, SUPABASE_KEY, {
  auth: { persistSession: false },
});
