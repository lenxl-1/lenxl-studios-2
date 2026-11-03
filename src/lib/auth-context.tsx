import React, { createContext, useContext, useEffect, useState, useMemo, useCallback } from "react";
import type { User, Session, AuthError } from "@supabase/supabase-js";
import { supabase, isSupabaseConfigured } from "./supabase";

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  isConfigured: boolean;
  signInWithEmail: (email: string, password: string) => Promise<{ error: AuthError | null }>;
  signUpWithEmail: (
    email: string,
    password: string,
    name?: string,
  ) => Promise<{ error: AuthError | null; user: User | null; needsEmailVerification: boolean }>;
  signInWithGoogle: (redirectTo?: string) => Promise<{ error: AuthError | null }>;
  resetPasswordForEmail: (email: string) => Promise<{ error: AuthError | null }>;
  updatePassword: (newPassword: string) => Promise<{ error: AuthError | null }>;
  signOut: () => Promise<{ error: AuthError | null }>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const isConfigured = isSupabaseConfigured();

  useEffect(() => {
    if (!isConfigured) {
      setLoading(false);
      return;
    }

    let isMounted = true;

    // Fetch initial active session
    supabase.auth
      .getSession()
      .then(({ data: { session: initialSession }, error }) => {
        if (!isMounted) return;
        if (error) {
          console.warn("[Auth] Failed to retrieve session:", error.message);
        }
        setSession(initialSession);
        setUser(initialSession?.user ?? null);
      })
      .catch((err) => {
        console.warn("[Auth] Session initialization error:", err);
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    // Listen to continuous auth state transitions
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, currentSession) => {
      if (!isMounted) return;
      setSession(currentSession);
      setUser(currentSession?.user ?? null);
      setLoading(false);
    });

    return () => {
      isMounted = false;
      subscription.unsubscribe();
    };
  }, [isConfigured]);

  const signInWithEmail = useCallback(
    async (email: string, password: string) => {
      if (!isConfigured) {
        return {
          error: {
            name: "ConfigurationError",
            message:
              "Supabase is not configured. Please add VITE_SUPABASE_URL and VITE_SUPABASE_PUBLISHABLE_KEY to your .env file.",
          } as AuthError,
        };
      }
      const { error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      });
      return { error };
    },
    [isConfigured],
  );

  const signUpWithEmail = useCallback(
    async (email: string, password: string, name?: string) => {
      if (!isConfigured) {
        return {
          error: {
            name: "ConfigurationError",
            message:
              "Supabase is not configured. Please add VITE_SUPABASE_URL and VITE_SUPABASE_PUBLISHABLE_KEY to your .env file.",
          } as AuthError,
          user: null,
          needsEmailVerification: false,
        };
      }

      const { data, error } = await supabase.auth.signUp({
        email: email.trim(),
        password,
        options: {
          data: {
            full_name: name?.trim() || "",
            name: name?.trim() || "",
          },
        },
      });

      // If user was created but session is null, email confirmation is active
      const needsEmailVerification = Boolean(data.user && !data.session);

      return { error, user: data.user, needsEmailVerification };
    },
    [isConfigured],
  );

  const signInWithGoogle = useCallback(
    async (redirectTo?: string) => {
      if (!isConfigured) {
        return {
          error: {
            name: "ConfigurationError",
            message:
              "Supabase is not configured. Please add VITE_SUPABASE_URL and VITE_SUPABASE_PUBLISHABLE_KEY to your .env file.",
          } as AuthError,
        };
      }

      const origin = typeof window !== "undefined" ? window.location.origin : "";
      const targetPath = redirectTo || "/explore";
      const callbackUrl = `${origin}/auth/callback?redirect=${encodeURIComponent(targetPath)}`;

      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: callbackUrl,
          queryParams: {
            access_type: "offline",
            prompt: "consent",
          },
        },
      });

      return { error };
    },
    [isConfigured],
  );

  const resetPasswordForEmail = useCallback(
    async (email: string) => {
      if (!isConfigured) {
        return {
          error: {
            name: "ConfigurationError",
            message:
              "Supabase is not configured. Please add VITE_SUPABASE_URL and VITE_SUPABASE_PUBLISHABLE_KEY to your .env file.",
          } as AuthError,
        };
      }

      const origin = typeof window !== "undefined" ? window.location.origin : "";
      const redirectUrl = `${origin}/reset-password`;

      const { error } = await supabase.auth.resetPasswordForEmail(email.trim(), {
        redirectTo: redirectUrl,
      });

      return { error };
    },
    [isConfigured],
  );

  const updatePassword = useCallback(
    async (newPassword: string) => {
      if (!isConfigured) {
        return {
          error: {
            name: "ConfigurationError",
            message: "Supabase is not configured.",
          } as AuthError,
        };
      }

      const { error } = await supabase.auth.updateUser({
        password: newPassword,
      });

      return { error };
    },
    [isConfigured],
  );

  const signOut = useCallback(async () => {
    if (!isConfigured) {
      setUser(null);
      setSession(null);
      return { error: null };
    }

    const { error } = await supabase.auth.signOut();
    setUser(null);
    setSession(null);
    return { error };
  }, [isConfigured]);

  const value = useMemo(
    () => ({
      user,
      session,
      loading,
      isConfigured,
      signInWithEmail,
      signUpWithEmail,
      signInWithGoogle,
      resetPasswordForEmail,
      updatePassword,
      signOut,
    }),
    [
      user,
      session,
      loading,
      isConfigured,
      signInWithEmail,
      signUpWithEmail,
      signInWithGoogle,
      resetPasswordForEmail,
      updatePassword,
      signOut,
    ],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
