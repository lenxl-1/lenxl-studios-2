import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import React, { useState } from "react";
import { Eye, EyeOff, Loader2, ArrowLeft, AlertCircle, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";
import { LenxlLogo } from "@/components/LenxlLogo";
import { useAuth } from "@/lib/auth-context";

export const Route = createFileRoute("/reset-password")({
  head: () => ({
    meta: [
      { title: "Set New Password — LENZL" },
      {
        name: "description",
        content: "Set a new password for your LENZL account.",
      },
    ],
  }),
  component: ResetPasswordPage,
});

function ResetPasswordPage() {
  const navigate = useNavigate();
  const { updatePassword } = useAuth();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (password.length < 6) {
      setErrorMessage("New password must be at least 6 characters.");
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match.");
      return;
    }

    setSubmitting(true);
    try {
      const { error } = await updatePassword(password);
      if (error) {
        setErrorMessage(error.message);
        toast.error("Failed to update password");
      } else {
        toast.success("Password updated successfully!");
        navigate({ to: "/explore" });
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
          <div className="text-center mb-6">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-[#E5E5E5] bg-[#F7F7F7] px-2.5 py-0.5 text-[11px] font-medium text-[#666666] dark:border-[#222222] dark:bg-[#111111] dark:text-[#888888]">
              Security
            </span>
            <h1 className="mt-3 text-2xl font-bold tracking-tight text-[#111111] dark:text-[#FFFFFF]">
              Set new password
            </h1>
            <p className="mt-1 text-xs text-[#666666] dark:text-[#888888]">
              Enter a secure password for your LENZL account
            </p>
          </div>

          {errorMessage && (
            <div className="mb-5 flex items-start gap-2.5 rounded-xl border border-red-500/20 bg-red-500/10 p-3 text-xs text-red-600 dark:text-red-400">
              <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
              <div className="flex-1">{errorMessage}</div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="password"
                className="block text-xs font-medium text-[#444444] dark:text-[#AAAAAA] mb-1.5"
              >
                New password (6+ characters)
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

            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-xs font-medium text-[#444444] dark:text-[#AAAAAA] mb-1.5"
              >
                Confirm new password
              </label>
              <input
                id="confirmPassword"
                type={showPassword ? "text" : "password"}
                required
                minLength={6}
                autoComplete="new-password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••"
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
                  <span>Updating password...</span>
                </>
              ) : (
                <>
                  <CheckCircle2 className="h-4 w-4" />
                  <span>Save New Password</span>
                </>
              )}
            </button>
          </form>
        </div>
      </main>

      <footer className="py-4 text-center text-[11px] text-[#888888] dark:text-[#555555]">
        © {new Date().getFullYear()} LENZL Labs. All rights reserved.
      </footer>
    </div>
  );
}
