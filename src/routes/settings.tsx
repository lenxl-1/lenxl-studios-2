import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import React, { useState, useEffect } from "react";
import {
  Sun,
  Moon,
  Laptop,
  Check,
  User,
  Bell,
  Sliders,
  Save,
  LogOut,
  LogIn,
  ShieldCheck,
  KeyRound,
  Mail,
} from "lucide-react";
import { toast } from "sonner";
import { LibraryLayout } from "@/components/library/LibraryLayout";
import { useTemplates } from "@/lib/templates-store";
import { useAuth } from "@/lib/auth-context";
import { STACKS } from "@/lib/templates-data";

export const Route = createFileRoute("/settings")({
  head: () => ({
    meta: [
      { title: "Settings — LENZL" },
      {
        name: "description",
        content:
          "Customize your LENZL theme, account, notification preferences, and workspace settings.",
      },
    ],
  }),
  component: SettingsPage,
});

function SettingsPage() {
  const { theme, setTheme, userProfile, updateUserProfile, preferences, updatePreferences } =
    useTemplates();
  const { user, signOut, isConfigured } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState(userProfile.name);
  const [email, setEmail] = useState(userProfile.email);
  const [bio, setBio] = useState(userProfile.bio);
  const [avatar, setAvatar] = useState(userProfile.avatar);

  useEffect(() => {
    setName(userProfile.name);
    setEmail(userProfile.email);
    setAvatar(userProfile.avatar);
    setBio(userProfile.bio);
  }, [userProfile.name, userProfile.email, userProfile.avatar, userProfile.bio]);

  const [autoplayVideo, setAutoplayVideo] = useState(preferences.autoplayVideo);
  const [defaultStack, setDefaultStack] = useState(preferences.defaultStack);
  const [copyFormat, setCopyFormat] = useState<"plain" | "markdown">(preferences.copyFormat);
  const [emailAlerts, setEmailAlerts] = useState(preferences.emailAlerts);
  const [weeklyDigest, setWeeklyDigest] = useState(preferences.weeklyDigest);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateUserProfile({ name, email, bio, avatar });
    updatePreferences({
      autoplayVideo,
      defaultStack,
      copyFormat,
      emailAlerts,
      weeklyDigest,
    });
    toast.success("Settings saved successfully!");
  };

  const appearanceOptions: Array<{
    id: "dark" | "light" | "system";
    label: string;
    icon: React.ComponentType<{ className?: string }>;
    desc: string;
  }> = [
    {
      id: "dark",
      label: "Dark mode",
      icon: Moon,
      desc: "Pure #000000 background with high-contrast surfaces",
    },
    {
      id: "light",
      label: "Light mode",
      icon: Sun,
      desc: "Crisp #FFFFFF canvas with subtle natural borders",
    },
    {
      id: "system",
      label: "System",
      icon: Laptop,
      desc: "Automatically synchronize with your operating system",
    },
  ];

  return (
    <LibraryLayout>
      {() => (
        <div className="mx-auto max-w-3xl space-y-8">
          {/* Header */}
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-[#666666] dark:text-[#A1A1A1]">
              Preferences
            </span>
            <h1 className="mt-1 text-2xl font-bold tracking-tight text-[#111111] dark:text-[#FFFFFF] sm:text-3xl">
              Settings
            </h1>
            <p className="mt-1 text-xs text-[#666666] dark:text-[#A1A1A1]">
              Manage your appearance theme, account credentials, and prompt tool preferences.
            </p>
          </div>

          <form onSubmit={handleSaveProfile} className="space-y-8">
            {/* Section 1: Appearance */}
            <div className="rounded-2xl border border-[#E5E5E5] bg-[#FFFFFF] p-6 shadow-sm dark:border-[#222222] dark:bg-[#050505]">
              <div className="flex items-center gap-2 mb-4">
                <Sun className="h-4 w-4 text-[#111111] dark:text-[#FFFFFF]" />
                <h2 className="text-base font-semibold text-[#111111] dark:text-[#FFFFFF]">
                  Appearance
                </h2>
              </div>
              <p className="text-xs text-[#666666] dark:text-[#A1A1A1] mb-4">
                Choose how LENZL looks to you. Seamlessly switch between pitch-black dark mode and
                bright light mode.
              </p>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                {appearanceOptions.map((opt) => {
                  const Icon = opt.icon;
                  const isSelected = theme === opt.id;
                  return (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => {
                        setTheme(opt.id);
                        toast.success(`Theme set to ${opt.label}`);
                      }}
                      className={`flex flex-col items-start justify-between rounded-xl border p-4 text-left transition-all ${
                        isSelected
                          ? "border-[#111111] bg-neutral-50 shadow-sm dark:border-white dark:bg-[#111111]"
                          : "border-[#E5E5E5] bg-[#FFFFFF] hover:border-neutral-400 dark:border-[#222222] dark:bg-[#080808] dark:hover:border-[#444444]"
                      }`}
                    >
                      <div className="flex w-full items-center justify-between">
                        <Icon className="h-5 w-5 text-[#111111] dark:text-[#FFFFFF]" />
                        {isSelected && (
                          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#111111] text-white dark:bg-white dark:text-black">
                            <Check className="h-3 w-3" />
                          </span>
                        )}
                      </div>
                      <div className="mt-4">
                        <div className="text-xs font-semibold text-[#111111] dark:text-[#FFFFFF]">
                          {opt.label}
                        </div>
                        <div className="mt-0.5 text-[11px] text-[#666666] dark:text-[#A1A1A1]">
                          {opt.desc}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Supabase Authentication & Session */}
            <div className="rounded-2xl border border-[#E5E5E5] bg-[#FFFFFF] p-6 shadow-sm dark:border-[#222222] dark:bg-[#050505]">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4 text-[#111111] dark:text-[#FFFFFF]" />
                  <h2 className="text-base font-semibold text-[#111111] dark:text-[#FFFFFF]">
                    Authentication &amp; Session
                  </h2>
                </div>
                {user && (
                  <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-[11px] font-semibold text-emerald-600 dark:text-emerald-400">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                    Active Session
                  </span>
                )}
              </div>

              {user ? (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 text-xs">
                    <div className="rounded-xl border border-[#E5E5E5] bg-[#FBFBFB] p-3 dark:border-[#222222] dark:bg-[#0A0A0A]">
                      <div className="text-[10px] font-medium uppercase tracking-wider text-[#888888]">
                        Signed in as
                      </div>
                      <div className="mt-1 font-semibold text-[#111111] dark:text-[#FFFFFF] truncate">
                        {user.email}
                      </div>
                      <div className="mt-1 flex items-center gap-1.5 text-[11px] text-emerald-600 dark:text-emerald-400">
                        <Check className="h-3 w-3" />
                        <span>Email verified</span>
                      </div>
                    </div>

                    <div className="rounded-xl border border-[#E5E5E5] bg-[#FBFBFB] p-3 dark:border-[#222222] dark:bg-[#0A0A0A]">
                      <div className="text-[10px] font-medium uppercase tracking-wider text-[#888888]">
                        Login Provider
                      </div>
                      <div className="mt-1 font-semibold text-[#111111] dark:text-[#FFFFFF] capitalize">
                        {user.app_metadata?.provider || "Email & Password"}
                      </div>
                      <div className="mt-1 text-[11px] text-[#888888]">
                        ID: {user.id.slice(0, 8)}...{user.id.slice(-4)}
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-[#E5E5E5] dark:border-[#222222]">
                    <Link
                      to="/forgot-password"
                      className="inline-flex items-center gap-1.5 text-xs text-[#666666] hover:text-[#111111] dark:text-[#888888] dark:hover:text-[#FFFFFF] transition-colors"
                    >
                      <KeyRound className="h-3.5 w-3.5" />
                      <span>Change Password</span>
                    </Link>

                    <button
                      type="button"
                      onClick={async () => {
                        await signOut();
                        toast.success("Signed out successfully");
                        navigate({ to: "/" });
                      }}
                      className="inline-flex items-center gap-1.5 rounded-lg border border-red-500/20 bg-red-500/10 px-3.5 py-1.5 text-xs font-semibold text-red-600 hover:bg-red-500/20 dark:text-red-400 transition-colors"
                    >
                      <LogOut className="h-3.5 w-3.5" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-3 rounded-xl border border-dashed border-[#CCCCCC] dark:border-[#333333]">
                  <div>
                    <div className="text-xs font-semibold text-[#111111] dark:text-[#FFFFFF]">
                      Guest Browsing Mode
                    </div>
                    <div className="text-[11px] text-[#666666] dark:text-[#888888] mt-0.5">
                      Sign in to synchronize your saved prompts and templates across all devices.
                    </div>
                  </div>

                  <Link
                    to="/login"
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#111111] px-4 py-2 text-xs font-semibold text-white transition-opacity hover:opacity-90 dark:bg-white dark:text-black shrink-0"
                  >
                    <LogIn className="h-3.5 w-3.5" />
                    <span>Sign In to LENZL</span>
                  </Link>
                </div>
              )}
            </div>

            {/* Section 2: Account & Profile */}
            <div className="rounded-2xl border border-[#E5E5E5] bg-[#FFFFFF] p-6 shadow-sm dark:border-[#222222] dark:bg-[#050505]">
              <div className="flex items-center gap-2 mb-4">
                <User className="h-4 w-4 text-[#111111] dark:text-[#FFFFFF]" />
                <h2 className="text-base font-semibold text-[#111111] dark:text-[#FFFFFF]">
                  Account &amp; Profile
                </h2>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <img
                    src={avatar}
                    alt={name}
                    className="h-16 w-16 rounded-full object-cover border border-[#E5E5E5] dark:border-[#222222]"
                  />
                  <div className="flex-1 space-y-1">
                    <label className="text-xs font-medium text-[#666666] dark:text-[#A1A1A1]">
                      Avatar Image URL
                    </label>
                    <input
                      type="url"
                      value={avatar}
                      onChange={(e) => setAvatar(e.target.value)}
                      className="w-full rounded-lg border border-[#E5E5E5] bg-[#FFFFFF] px-3 py-1.5 text-xs text-[#111111] dark:border-[#222222] dark:bg-[#080808] dark:text-[#FFFFFF]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="space-y-1">
                    <label className="text-xs font-medium text-[#666666] dark:text-[#A1A1A1]">
                      Display Name
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full rounded-lg border border-[#E5E5E5] bg-[#FFFFFF] px-3 py-2 text-xs text-[#111111] dark:border-[#222222] dark:bg-[#080808] dark:text-[#FFFFFF]"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-medium text-[#666666] dark:text-[#A1A1A1]">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full rounded-lg border border-[#E5E5E5] bg-[#FFFFFF] px-3 py-2 text-xs text-[#111111] dark:border-[#222222] dark:bg-[#080808] dark:text-[#FFFFFF]"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-medium text-[#666666] dark:text-[#A1A1A1]">
                    Bio
                  </label>
                  <input
                    type="text"
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    className="w-full rounded-lg border border-[#E5E5E5] bg-[#FFFFFF] px-3 py-2 text-xs text-[#111111] dark:border-[#222222] dark:bg-[#080808] dark:text-[#FFFFFF]"
                  />
                </div>
              </div>
            </div>

            {/* Section 3: Preferences */}
            <div className="rounded-2xl border border-[#E5E5E5] bg-[#FFFFFF] p-6 shadow-sm dark:border-[#222222] dark:bg-[#050505]">
              <div className="flex items-center gap-2 mb-4">
                <Sliders className="h-4 w-4 text-[#111111] dark:text-[#FFFFFF]" />
                <h2 className="text-base font-semibold text-[#111111] dark:text-[#FFFFFF]">
                  Prompt &amp; Preview Preferences
                </h2>
              </div>

              <div className="space-y-4">
                {/* Autoplay Video Toggle */}
                <div className="flex items-center justify-between rounded-xl border border-[#E5E5E5] p-3.5 dark:border-[#222222]">
                  <div>
                    <div className="text-xs font-semibold text-[#111111] dark:text-[#FFFFFF]">
                      Autoplay Preview Videos on Hover
                    </div>
                    <div className="text-[11px] text-[#666666] dark:text-[#A1A1A1]">
                      Muted video previews will start automatically when hovering over cards
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setAutoplayVideo(!autoplayVideo)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      autoplayVideo
                        ? "bg-[#111111] dark:bg-white"
                        : "bg-neutral-300 dark:bg-neutral-700"
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform dark:bg-black ${
                        autoplayVideo ? "translate-x-6" : "translate-x-1"
                      }`}
                    />
                  </button>
                </div>

                {/* Copy Format */}
                <div className="flex items-center justify-between rounded-xl border border-[#E5E5E5] p-3.5 dark:border-[#222222]">
                  <div>
                    <div className="text-xs font-semibold text-[#111111] dark:text-[#FFFFFF]">
                      Default Copy Prompt Format
                    </div>
                    <div className="text-[11px] text-[#666666] dark:text-[#A1A1A1]">
                      Choose between raw prompt text or Markdown block with template title
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={() => setCopyFormat("plain")}
                      className={`rounded-md px-2.5 py-1 text-xs font-medium ${
                        copyFormat === "plain"
                          ? "bg-[#111111] text-white dark:bg-white dark:text-black"
                          : "border border-[#E5E5E5] text-[#666666] dark:border-[#222222] dark:text-[#A1A1A1]"
                      }`}
                    >
                      Plain
                    </button>
                    <button
                      type="button"
                      onClick={() => setCopyFormat("markdown")}
                      className={`rounded-md px-2.5 py-1 text-xs font-medium ${
                        copyFormat === "markdown"
                          ? "bg-[#111111] text-white dark:bg-white dark:text-black"
                          : "border border-[#E5E5E5] text-[#666666] dark:border-[#222222] dark:text-[#A1A1A1]"
                      }`}
                    >
                      Markdown
                    </button>
                  </div>
                </div>

                {/* Default Stack preference */}
                <div className="flex items-center justify-between rounded-xl border border-[#E5E5E5] p-3.5 dark:border-[#222222]">
                  <div>
                    <div className="text-xs font-semibold text-[#111111] dark:text-[#FFFFFF]">
                      Preferred Tech Stack
                    </div>
                    <div className="text-[11px] text-[#666666] dark:text-[#A1A1A1]">
                      Set the default filter applied when opening the library
                    </div>
                  </div>
                  <select
                    value={defaultStack}
                    onChange={(e) => setDefaultStack(e.target.value)}
                    className="rounded-lg border border-[#E5E5E5] bg-[#FFFFFF] px-2.5 py-1.5 text-xs text-[#111111] dark:border-[#222222] dark:bg-[#080808] dark:text-[#FFFFFF]"
                  >
                    {STACKS.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Section 4: Notifications */}
            <div className="rounded-2xl border border-[#E5E5E5] bg-[#FFFFFF] p-6 shadow-sm dark:border-[#222222] dark:bg-[#050505]">
              <div className="flex items-center gap-2 mb-4">
                <Bell className="h-4 w-4 text-[#111111] dark:text-[#FFFFFF]" />
                <h2 className="text-base font-semibold text-[#111111] dark:text-[#FFFFFF]">
                  Notifications
                </h2>
              </div>

              <div className="space-y-3">
                <label className="flex items-center justify-between rounded-lg border border-[#E5E5E5] p-3 cursor-pointer dark:border-[#222222]">
                  <div>
                    <div className="text-xs font-semibold text-[#111111] dark:text-[#FFFFFF]">
                      New template release alerts
                    </div>
                    <div className="text-[11px] text-[#666666] dark:text-[#A1A1A1]">
                      Receive updates when new templates are curated and verified
                    </div>
                  </div>
                  <input
                    type="checkbox"
                    checked={emailAlerts}
                    onChange={(e) => setEmailAlerts(e.target.checked)}
                    className="h-4 w-4 rounded accent-[#111111] dark:accent-white"
                  />
                </label>

                <label className="flex items-center justify-between rounded-lg border border-[#E5E5E5] p-3 cursor-pointer dark:border-[#222222]">
                  <div>
                    <div className="text-xs font-semibold text-[#111111] dark:text-[#FFFFFF]">
                      Weekly prompt digest
                    </div>
                    <div className="text-[11px] text-[#666666] dark:text-[#A1A1A1]">
                      A weekly roundup of the highest-rated prompts for v0 and Lovable
                    </div>
                  </div>
                  <input
                    type="checkbox"
                    checked={weeklyDigest}
                    onChange={(e) => setWeeklyDigest(e.target.checked)}
                    className="h-4 w-4 rounded accent-[#111111] dark:accent-white"
                  />
                </label>
              </div>
            </div>

            {/* Save Buttons */}
            <div className="flex justify-end">
              <button
                type="submit"
                className="inline-flex items-center gap-2 rounded-xl bg-[#111111] px-6 py-2.5 text-xs font-semibold text-white shadow-md transition-opacity hover:opacity-90 dark:bg-white dark:text-black"
              >
                <Save className="h-4 w-4" />
                <span>Save Changes</span>
              </button>
            </div>
          </form>
        </div>
      )}
    </LibraryLayout>
  );
}
