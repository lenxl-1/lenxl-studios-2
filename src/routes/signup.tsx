import { createFileRoute, Link, useNavigate, useSearch } from "@tanstack/react-router";
import React, { useState, useEffect } from "react";
import { Eye, EyeOff, Loader2, ArrowLeft, AlertCircle, Mail, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";
import { LenxlLogo } from "@/components/LenxlLogo";
import { GoogleIcon } from "@/components/auth/GoogleIcon";
import { useAuth } from "@/lib/auth-context";

export const Route = createFileRoute("/signup")({
  validateSearch: (search: Record<string, unknown>): { redirect?: string } => ({
    redirect: typeof search.redirect === "string" ? search.redirect : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Sign Up — LENZL" },
      {
        name: "description",
        content: "Create a free account to browse, copy, and export AI-generated UI prompts.",
      },
    ],
  }),
  component: SignupPage,
});

function SignupPage() {
  const { redirect } = useSearch({ from: "/signup" });
  const navigate = useNavigate();
  const { user, loading: authLoading, isConfigured, signUpWithEmail, signInWithGoogle } = useAuth();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [verificationPending, setVerificationPending] = useState(false);

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

    if (!name.trim()) {
      setErrorMessage("Please enter your name.");
      return;
    }
    if (!email.trim()) {
      setErrorMessage("Please enter a valid email address.");
      return;
    }
    if (password.length < 6) {
      setErrorMessage("Password must be at least 6 characters long.");
      return;
    }

    setSubmitting(true);
    try {
      const { error, needsEmailVerification } = await signUpWithEmail(email, password, name);
      if (error) {
        if (error.message.toLowerCase().includes("user already registered")) {
          setErrorMessage("An account with this email already exists. Try logging in instead.");
        } else {
          setErrorMessage(error.message);
        }
        toast.error("Sign up failed");
      } else if (needsEmailVerification) {
        setVerificationPending(true);
        toast.success("Verification link sent!");
      } else {
        toast.success("Account created successfully!");
        navigate({ to: destination });
      }
    } catch (err: unknown) {
      const msg =
        err instanceof Error ? err.message : "An unexpected error occurred during signup.";
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
        toast.error("Google sign up failed");
        setGoogleLoading(false);
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Failed to initiate Google sign up.";
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
        <div className="w-full max-w-[440px] rounded-2xl border border-[#E5E5E5] bg-[#FFFFFF] p-7 sm:p-8 shadow-sm dark:border-[#222222] dark:bg-[#050505]">
          {/* Email Verification State */}
          {verificationPending ? (
            <div className="text-center py-4 space-y-4">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                <Mail className="h-6 w-6" />
              </div>
              <h1 className="text-xl font-bold tracking-tight text-[#111111] dark:text-[#FFFFFF]">
                Check your email
              </h1>
              <p className="text-xs text-[#666666] dark:text-[#888888] leading-relaxed max-w-sm mx-auto">
                We sent a verification link to{" "}
                <span className="font-semibold text-foreground">{email}</span>. Click the link in
                your email to confirm your account and start exploring LENZL.
              </p>
              <div className="pt-4 border-t border-[#E5E5E5] dark:border-[#222222] space-y-2">
                <Link
                  to="/login"
                  search={{ message: "Once verified, log in here to enter your library." }}
                  className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-[#111111] py-2.5 px-4 text-xs font-semibold text-white transition-all hover:opacity-90 dark:bg-white dark:text-black"
                >
                  <CheckCircle2 className="h-4 w-4" />
                  <span>Go to Log in</span>
                </Link>
              </div>
            </div>
          ) : (
            <>
              {/* Header */}
              <div className="text-center mb-6">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-[#E5E5E5] bg-[#F7F7F7] px-2.5 py-0.5 text-[11px] font-medium text-[#666666] dark:border-[#222222] dark:bg-[#111111] dark:text-[#888888]">
                  Join LENZL
                </span>
                <h1 className="mt-3 text-2xl font-bold tracking-tight text-[#111111] dark:text-[#FFFFFF]">
                  Create your account
                </h1>
                <p className="mt-1 text-xs text-[#666666] dark:text-[#888888]">
                  Access 30+ verified AI prompt templates for v0 and Lovable
                </p>
              </div>

              {/* Config warning if credentials missing */}
              {!isConfigured && (
                <div className="mb-5 flex items-start gap-2.5 rounded-xl border border-amber-500/30 bg-amber-500/10 p-3 text-xs text-amber-700 dark:text-amber-400">
                  <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
                  <div className="space-y-1">
                    <span className="font-semibold block">Supabase credentials needed</span>
                    <span className="text-[11px] block text-amber-700/90 dark:text-amber-400/90 leading-relaxed">
                      Add <code className="font-mono">VITE_SUPABASE_URL</code> and{" "}
                      <code className="font-mono">VITE_SUPABASE_PUBLISHABLE_KEY</code> in your .env
                      file to enable live authentication.
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
                    or sign up with email
                  </span>
                </div>
              </div>

              {/* Signup Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-xs font-medium text-[#444444] dark:text-[#AAAAAA] mb-1.5"
                  >
                    Full name
                  </label>
                  <input
                    id="name"
                    type="text"
                    required
                    autoComplete="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Alex Vance"
                    className="w-full rounded-xl border border-[#E5E5E5] bg-[#FFFFFF] px-3.5 py-2.5 text-xs text-[#111111] placeholder-[#888888] transition-colors focus:border-[#111111] focus:outline-none dark:border-[#222222] dark:bg-[#0A0A0A] dark:text-[#FFFFFF] dark:placeholder-[#555555] dark:focus:border-[#444444]"
                  />
                </div>

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
                  <label
                    htmlFor="password"
                    className="block text-xs font-medium text-[#444444] dark:text-[#AAAAAA] mb-1.5"
                  >
                    Password (6+ characters)
                  </label>
                  <div className="relative">
                    <input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      required
                      minLength={6}
                      autoComplete="new-password"
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
                      <span>Creating account...</span>
                    </>
                  ) : (
                    <span>Create account</span>
                  )}
                </button>
              </form>

              {/* Footer link to Log in */}
              <div className="mt-6 text-center text-xs text-[#666666] dark:text-[#888888]">
                Already have an account?{" "}
                <Link
                  to="/login"
                  search={{ redirect }}
                  className="font-semibold text-[#111111] hover:underline dark:text-white"
                >
                  Log in
                </Link>
              </div>
            </>
          )}
        </div>
      </main>

      {/* Subtle Footer */}
      <footer className="py-4 text-center text-[11px] text-[#888888] dark:text-[#555555]">
        © {new Date().getFullYear()} LENZL Labs. All rights reserved.
      </footer>
    </div>
  );
}
