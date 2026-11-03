import { createFileRoute, Link } from "@tanstack/react-router";
import React, { useState } from "react";
import { Loader2, ArrowLeft, AlertCircle, Mail, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";
import { LenxlLogo } from "@/components/LenxlLogo";
import { useAuth } from "@/lib/auth-context";

export const Route = createFileRoute("/forgot-password")({
  head: () => ({
    meta: [
      { title: "Reset Password — LENZL" },
      {
        name: "description",
        content: "Reset your LENZL account password.",
      },
    ],
  }),
  component: ForgotPasswordPage,
});

function ForgotPasswordPage() {
  const { isConfigured, resetPasswordForEmail } = useAuth();
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!email.trim()) {
      setErrorMessage("Please enter your account email address.");
      return;
    }

    setSubmitting(true);
    try {
      const { error } = await resetPasswordForEmail(email);
      if (error) {
        setErrorMessage(error.message);
        toast.error("Failed to send reset link");
      } else {
        setSubmitted(true);
        toast.success("Password reset link sent!");
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "An unexpected error occurred.";
      setErrorMessage(msg);
      toast.error(msg);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-[#FFFFFF] text-[#111111] dark:bg-[#000000] dark:text-[#FFFFFF]">
      <header className="px-6 py-5 flex items-center justify-between border-b border-[#E5E5E5] dark:border-[#1E1E1E]">
        <Link
          to="/"
          className="flex items-center gap-2.5 font-bold tracking-tight text-base hover:opacity-80 transition-opacity"
        >
          <LenxlLogo size={26} />
          <span className="tracking-wider text-sm">LENZL</span>
        </Link>

        <Link
          to="/login"
          className="inline-flex items-center gap-1.5 text-xs text-[#666666] hover:text-[#111111] dark:text-[#888888] dark:hover:text-[#FFFFFF] transition-colors"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>Back to Log in</span>
        </Link>
      </header>

      <main className="flex-1 flex items-center justify-center p-4 sm:p-6 my-8">
        <div className="w-full max-w-[420px] rounded-2xl border border-[#E5E5E5] bg-[#FFFFFF] p-7 sm:p-8 shadow-sm dark:border-[#222222] dark:bg-[#050505]">
          {submitted ? (
            <div className="text-center py-4 space-y-4">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                <Mail className="h-6 w-6" />
              </div>
              <h1 className="text-xl font-bold tracking-tight text-[#111111] dark:text-[#FFFFFF]">
                Reset link sent
              </h1>
              <p className="text-xs text-[#666666] dark:text-[#888888] leading-relaxed max-w-sm mx-auto">
                If an account exists for{" "}
                <span className="font-semibold text-foreground">{email}</span>, you will receive an
                email shortly with instructions to reset your password.
              </p>
              <div className="pt-4 border-t border-[#E5E5E5] dark:border-[#222222] space-y-2">
                <Link
                  to="/login"
                  className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-[#111111] py-2.5 px-4 text-xs font-semibold text-white transition-all hover:opacity-90 dark:bg-white dark:text-black"
                >
                  <CheckCircle2 className="h-4 w-4" />
                  <span>Return to Log in</span>
                </Link>
                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="w-full text-center text-xs text-[#666666] hover:text-[#111111] dark:text-[#888888] dark:hover:text-white py-1"
                >
                  Didn&apos;t get the email? Try again
                </button>
              </div>
            </div>
          ) : (
            <>
              <div className="text-center mb-6">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-[#E5E5E5] bg-[#F7F7F7] px-2.5 py-0.5 text-[11px] font-medium text-[#666666] dark:border-[#222222] dark:bg-[#111111] dark:text-[#888888]">
                  Account Recovery
                </span>
                <h1 className="mt-3 text-2xl font-bold tracking-tight text-[#111111] dark:text-[#FFFFFF]">
                  Forgot password?
                </h1>
                <p className="mt-1 text-xs text-[#666666] dark:text-[#888888]">
                  Enter your email to receive a password reset link
                </p>
              </div>

              {!isConfigured && (
                <div className="mb-5 flex items-start gap-2.5 rounded-xl border border-amber-500/30 bg-amber-500/10 p-3 text-xs text-amber-700 dark:text-amber-400">
                  <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
                  <div className="space-y-1">
                    <span className="font-semibold block">Supabase credentials needed</span>
                    <span className="text-[11px] block text-amber-700/90 dark:text-amber-400/90">
                      Configure VITE_SUPABASE_URL and VITE_SUPABASE_PUBLISHABLE_KEY to enable
                      password recovery.
                    </span>
                  </div>
                </div>
              )}

              {errorMessage && (
                <div className="mb-5 flex items-start gap-2.5 rounded-xl border border-red-500/20 bg-red-500/10 p-3 text-xs text-red-600 dark:text-red-400">
                  <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
                  <div className="flex-1">{errorMessage}</div>
                </div>
              )}

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

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full flex items-center justify-center gap-2 rounded-xl bg-[#111111] py-2.5 px-4 text-xs font-semibold text-white transition-all hover:opacity-90 active:scale-[0.99] disabled:opacity-50 dark:bg-white dark:text-black mt-2"
                >
                  {submitting ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      <span>Sending reset link...</span>
                    </>
                  ) : (
                    <span>Send Reset Link</span>
                  )}
                </button>
              </form>

              <div className="mt-6 text-center text-xs text-[#666666] dark:text-[#888888]">
                Remember your password?{" "}
                <Link
                  to="/login"
                  className="font-semibold text-[#111111] hover:underline dark:text-white"
                >
                  Log in
                </Link>
              </div>
            </>
          )}
        </div>
      </main>

      <footer className="py-4 text-center text-[11px] text-[#888888] dark:text-[#555555]">
        © {new Date().getFullYear()} LENZL Labs. All rights reserved.
      </footer>
    </div>
  );
}
