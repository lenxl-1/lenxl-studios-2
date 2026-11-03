import { createFileRoute, Link, useNavigate, useSearch } from "@tanstack/react-router";
import React, { useState, useEffect } from "react";
import { Eye, EyeOff, Loader2, ArrowLeft, AlertCircle, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";
import { LenxlLogo } from "@/components/LenxlLogo";
import { GoogleIcon } from "@/components/auth/GoogleIcon";
import { useAuth } from "@/lib/auth-context";

export const Route = createFileRoute("/login")({
  validateSearch: (search: Record<string, unknown>): { redirect?: string; message?: string } => ({
    redirect: typeof search.redirect === "string" ? search.redirect : undefined,
    message: typeof search.message === "string" ? search.message : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Log In — LENZL" },
      {
        name: "description",
        content: "Sign in to access your curated prompts and saved designs.",
      },
    ],
  }),
  component: LoginPage,
});

function LoginPage() {
  const { redirect, message } = useSearch({ from: "/login" });
  const navigate = useNavigate();
  const { user, loading: authLoading, isConfigured, signInWithEmail, signInWithGoogle } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const destination = redirect || "/explore";

  // Redirect if already authenticated
  useEffect(() => {
    if (!authLoading && user) {
      navigate({ to: destination });
    }
  }, [authLoading, user, navigate, destination]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!email.trim() || !password) {
      setErrorMessage("Please enter both your email and password.");
      return;
    }

    setSubmitting(true);
    try {
      const { error } = await signInWithEmail(email, password);
      if (error) {
        if (error.message.toLowerCase().includes("invalid login credentials")) {
          setErrorMessage(
            "Invalid email or password. Please verify your credentials and try again.",
          );
        } else {
          setErrorMessage(error.message);
        }
        toast.error("Sign in failed");
      } else {
        toast.success("Welcome back!");
        navigate({ to: destination });
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "An unexpected error occurred.";
      setErrorMessage(msg);
      toast.error(msg);
    } finally {
      setSubmitting(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setErrorMessage(null);
    setGoogleLoading(true);
    try {
      const { error } = await signInWithGoogle(destination);
      if (error) {
        if (error.message.toLowerCase().includes("provider is not enabled")) {
          setErrorMessage(
            "Google provider is not enabled in your Supabase project. Please enable Google in Authentication > Providers in your Supabase dashboard.",
          );
        } else {
          setErrorMessage(error.message);
        }
        toast.error("Google sign in failed");
        setGoogleLoading(false);
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Failed to initiate Google sign in.";
      setErrorMessage(msg);
      setGoogleLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-[#FFFFFF] text-[#111111] dark:bg-[#000000] dark:text-[#FFFFFF]">
      {/* Top Header */}
      <header className="px-6 py-5 flex items-center justify-between border-b border-[#E5E5E5] dark:border-[#1E1E1E]">
        <Link
          to="/"
          className="flex items-center gap-2.5 font-bold tracking-tight text-base hover:opacity-80 transition-opacity"
        >
          <LenxlLogo size={26} />
          <span className="tracking-wider text-sm">LENZL</span>
        </Link>

        <Link
          to="/"
          className="inline-flex items-center gap-1.5 text-xs text-[#666666] hover:text-[#111111] dark:text-[#888888] dark:hover:text-[#FFFFFF] transition-colors"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>Back to Home</span>
        </Link>
      </header>

      {/* Main Card */}
      <main className="flex-1 flex items-center justify-center p-4 sm:p-6 my-8">
        <div className="w-full max-w-[420px] rounded-2xl border border-[#E5E5E5] bg-[#FFFFFF] p-7 sm:p-8 shadow-sm dark:border-[#222222] dark:bg-[#050505]">
          {/* Header */}
          <div className="text-center mb-6">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-[#E5E5E5] bg-[#F7F7F7] px-2.5 py-0.5 text-[11px] font-medium text-[#666666] dark:border-[#222222] dark:bg-[#111111] dark:text-[#888888]">
              Authentication
            </span>
            <h1 className="mt-3 text-2xl font-bold tracking-tight text-[#111111] dark:text-[#FFFFFF]">
              Welcome back
            </h1>
            <p className="mt-1 text-xs text-[#666666] dark:text-[#888888]">
              Sign in to access your saved prompts and templates
            </p>
          </div>

          {/* Info/Success message from URL if present */}
          {message && (
            <div className="mb-5 flex items-start gap-2.5 rounded-xl border border-emerald-500/20 bg-emerald-500/10 p-3 text-xs text-emerald-700 dark:text-emerald-400">
              <CheckCircle2 className="h-4 w-4 shrink-0 mt-0.5" />
              <span>{message}</span>
            </div>
          )}

          {/* Config warning if credentials missing */}
          {!isConfigured && (
            <div className="mb-5 flex items-start gap-2.5 rounded-xl border border-amber-500/30 bg-amber-500/10 p-3 text-xs text-amber-700 dark:text-amber-400">
              <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
              <div className="space-y-1">
                <span className="font-semibold block">Supabase credentials needed</span>
                <span className="text-[11px] block text-amber-700/90 dark:text-amber-400/90 leading-relaxed">
                  Add <code className="font-mono">VITE_SUPABASE_URL</code> and{" "}
                  <code className="font-mono">VITE_SUPABASE_PUBLISHABLE_KEY</code> in your .env file
                  to enable live authentication.
                </span>
              </div>
            </div>
          )}

          {/* Error Banner */}
          {errorMessage && (
            <div className="mb-5 flex items-start gap-2.5 rounded-xl border border-red-500/20 bg-red-500/10 p-3 text-xs text-red-600 dark:text-red-400">
              <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
              <div className="flex-1">{errorMessage}</div>
            </div>
          )}

          {/* Google OAuth Button */}
          <button
            type="button"
            onClick={handleGoogleSignIn}
            disabled={googleLoading || submitting}
            className="w-full flex items-center justify-center gap-2.5 rounded-xl border border-[#E5E5E5] bg-[#FFFFFF] py-2.5 px-4 text-xs font-semibold text-[#111111] transition-all hover:bg-[#F9FAFB] active:scale-[0.99] disabled:opacity-50 dark:border-[#222222] dark:bg-[#0C0C0C] dark:text-[#FFFFFF] dark:hover:bg-[#141414]"
          >
            {googleLoading ? (
              <Loader2 className="h-4 w-4 animate-spin text-[#888888]" />
            ) : (
              <GoogleIcon className="h-4 w-4" />
            )}
            <span>Continue with Google</span>
          </button>

          {/* Divider */}
          <div className="relative my-5">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-[#E5E5E5] dark:border-[#222222]" />
            </div>
            <div className="relative flex justify-center text-[11px]">
              <span className="bg-[#FFFFFF] px-2 text-[#888888] dark:bg-[#050505] dark:text-[#666666]">
                or continue with email
              </span>
            </div>
          </div>

          {/* Email / Password Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="email"
                className="block text-xs font-medium text-[#444444] dark:text-[#AAAAAA] mb-1.5"
              >
                Email address
              </label>
              <input
                id="email"
                type="email"
                required
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@company.com"
                className="w-full rounded-xl border border-[#E5E5E5] bg-[#FFFFFF] px-3.5 py-2.5 text-xs text-[#111111] placeholder-[#888888] transition-colors focus:border-[#111111] focus:outline-none dark:border-[#222222] dark:bg-[#0A0A0A] dark:text-[#FFFFFF] dark:placeholder-[#555555] dark:focus:border-[#444444]"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label
                  htmlFor="password"
                  className="block text-xs font-medium text-[#444444] dark:text-[#AAAAAA]"
                >
                  Password
                </label>
                <Link
                  to="/forgot-password"
                  className="text-[11px] font-medium text-[#666666] hover:text-[#111111] dark:text-[#888888] dark:hover:text-[#FFFFFF] transition-colors"
                >
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  required
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full rounded-xl border border-[#E5E5E5] bg-[#FFFFFF] px-3.5 py-2.5 pr-10 text-xs text-[#111111] placeholder-[#888888] transition-colors focus:border-[#111111] focus:outline-none dark:border-[#222222] dark:bg-[#0A0A0A] dark:text-[#FFFFFF] dark:placeholder-[#555555] dark:focus:border-[#444444]"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#888888] hover:text-[#111111] dark:hover:text-[#FFFFFF]"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={submitting || googleLoading}
              className="w-full flex items-center justify-center gap-2 rounded-xl bg-[#111111] py-2.5 px-4 text-xs font-semibold text-white transition-all hover:opacity-90 active:scale-[0.99] disabled:opacity-50 dark:bg-white dark:text-black mt-2"
            >
              {submitting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>Signing in...</span>
                </>
              ) : (
                <span>Sign in</span>
              )}
            </button>
          </form>

          {/* Footer link to Sign up */}
          <div className="mt-6 text-center text-xs text-[#666666] dark:text-[#888888]">
            Don&apos;t have an account?{" "}
            <Link
              to="/signup"
              search={{ redirect }}
              className="font-semibold text-[#111111] hover:underline dark:text-white"
            >
              Sign up
            </Link>
          </div>
        </div>
      </main>

      {/* Subtle Footer */}
      <footer className="py-4 text-center text-[11px] text-[#888888] dark:text-[#555555]">
        © {new Date().getFullYear()} LENZL Labs. All rights reserved.
      </footer>
    </div>
  );
}
