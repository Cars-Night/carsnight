import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL =
  import.meta.env.VITE_WAITLIST_SUPABASE_URL ||
  "https://hjujkaetqrpdukhumnat.supabase.co";
const SUPABASE_KEY =
  import.meta.env.VITE_WAITLIST_SUPABASE_KEY ||
  "sb_publishable_zZSlYqLS6tALwIJ4YL_wGg_qaBlJb1Y";

export const waitlistSupabase = createClient(SUPABASE_URL, SUPABASE_KEY, {
  auth: { persistSession: false },
});
