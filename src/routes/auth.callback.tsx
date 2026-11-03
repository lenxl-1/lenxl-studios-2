import { createFileRoute, useNavigate, useSearch } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Loader2, AlertCircle } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { LenxlLogo } from "@/components/LenxlLogo";

export const Route = createFileRoute("/auth/callback")({
  validateSearch: (search: Record<string, unknown>): { redirect?: string } => ({
    redirect: typeof search.redirect === "string" ? search.redirect : undefined,
  }),
  component: AuthCallbackPage,
});

function AuthCallbackPage() {
  const { redirect } = useSearch({ from: "/auth/callback" });
  const navigate = useNavigate();
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    let isSubscribed = true;
    const targetUrl = redirect || "/explore";

    async function handleAuth() {
      try {
        // If there is an auth code in the query params (PKCE flow)
        if (typeof window !== "undefined") {
          const urlParams = new URLSearchParams(window.location.search);
          const code = urlParams.get("code");
          if (code) {
            const { error } = await supabase.auth.exchangeCodeForSession(code);
            if (error) {
              console.warn("[Auth Callback] Exchange error:", error.message);
            }
          }
        }

        // Get the active session
        const {
          data: { session },
          error,
        } = await supabase.auth.getSession();
        if (error) {
          throw error;
        }

        if (!isSubscribed) return;

        if (session) {
          navigate({ to: targetUrl });
        } else {
          // If no immediate session, subscribe to next auth change (e.g. hash fragment processing)
          const {
            data: { subscription },
          } = supabase.auth.onAuthStateChange((event, changedSession) => {
            if (changedSession && isSubscribed) {
              subscription.unsubscribe();
              navigate({ to: targetUrl });
            }
          });

          // Safety timeout after 4 seconds
          setTimeout(() => {
            if (isSubscribed) {
              subscription.unsubscribe();
              navigate({ to: targetUrl });
            }
          }, 4000);
        }
      } catch (err: unknown) {
        if (!isSubscribed) return;
        const msg = err instanceof Error ? err.message : "Authentication failed.";
        setErrorMsg(msg);
      }
    }

    handleAuth();

    return () => {
      isSubscribed = false;
    };
  }, [navigate, redirect]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#FFFFFF] text-[#111111] dark:bg-[#000000] dark:text-[#FFFFFF] p-6">
      <div className="flex flex-col items-center gap-4 text-center max-w-sm">
        <LenxlLogo size={36} />

        {errorMsg ? (
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 text-red-500 text-sm font-semibold">
              <AlertCircle className="h-5 w-5" />
              <span>Authentication Error</span>
            </div>
            <p className="text-xs text-[#666666] dark:text-[#888888]">{errorMsg}</p>
            <a
              href="/login"
              className="mt-2 inline-block rounded-xl bg-[#111111] px-4 py-2 text-xs font-semibold text-white dark:bg-white dark:text-black"
            >
              Back to Log In
            </a>
          </div>
        ) : (
          <div className="space-y-2">
            <div className="flex items-center justify-center gap-2 text-sm font-medium">
              <Loader2 className="h-4 w-4 animate-spin text-neutral-500" />
              <span>Completing sign in...</span>
            </div>
            <p className="text-xs text-[#666666] dark:text-[#888888]">
              Redirecting you to the LENZL template library
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
