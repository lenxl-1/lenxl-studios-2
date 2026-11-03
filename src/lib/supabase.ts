import { createClient, type SupabaseClient } from "@supabase/supabase-js";

/**
 * LENZL Supabase Client Configuration
 *
 * Environment variables:
 * - VITE_SUPABASE_URL: Project URL (e.g. https://xyzcompany.supabase.co)
 * - VITE_SUPABASE_PUBLISHABLE_KEY: Client-safe anon / publishable key
 *
 * IMPORTANT SECURITY RULE:
 * Never use or expose the Supabase service_role secret key in client-side code.
 */

const envUrl =
  import.meta.env?.VITE_SUPABASE_URL ||
  (typeof process !== "undefined" ? process.env?.VITE_SUPABASE_URL : undefined);

const envKey =
  import.meta.env?.VITE_SUPABASE_PUBLISHABLE_KEY ||
  import.meta.env?.VITE_SUPABASE_ANON_KEY ||
  (typeof process !== "undefined"
    ? process.env?.VITE_SUPABASE_PUBLISHABLE_KEY || process.env?.VITE_SUPABASE_ANON_KEY
    : undefined);

/**
 * Returns true if real Supabase credentials have been configured in the environment.
 */
export const isSupabaseConfigured = (): boolean => {
  return Boolean(
    envUrl &&
    envKey &&
    !envUrl.includes("placeholder-project") &&
    !envKey.includes("placeholder-publishable-key"),
  );
};

// Safe defaults to ensure builds and initial hydration do not throw fatal exceptions
// before the user adds their credentials to .env.local or production host.
const supabaseUrl = envUrl || "https://placeholder-project.supabase.co";
const supabasePublishableKey = envKey || "placeholder-publishable-key";

if (!isSupabaseConfigured() && typeof window !== "undefined" && import.meta.env?.DEV) {
  console.info(
    "[LENZL Supabase] Supabase client initialized in placeholder mode. Add VITE_SUPABASE_URL and VITE_SUPABASE_PUBLISHABLE_KEY to your .env file to connect your project.",
  );
}

export const supabase: SupabaseClient = createClient(supabaseUrl, supabasePublishableKey, {
  auth: {
    persistSession: typeof window !== "undefined",
    autoRefreshToken: typeof window !== "undefined",
    detectSessionInUrl: typeof window !== "undefined",
  },
});

export default supabase;
