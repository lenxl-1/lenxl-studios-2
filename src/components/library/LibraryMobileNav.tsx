import React, { useState, useEffect } from "react";
import { Link, useRouterState, useNavigate } from "@tanstack/react-router";
import {
  Menu,
  X,
  Search,
  Compass,
  Grid3X3,
  Bookmark,
  Upload,
  Settings,
  ArrowRight,
  Sun,
  Moon,
  Home,
} from "lucide-react";
import { LenxlLogo } from "@/components/LenxlLogo";
import { useTemplates } from "@/lib/templates-store";

export function LibraryMobileNav() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showSearchInput, setShowSearchInput] = useState(false);
  const routerState = useRouterState();
  const currentPath = routerState.location.pathname;
  const navigate = useNavigate();

  const { searchQuery, setSearchQuery, savedIds, theme, setTheme, userProfile } = useTemplates();

  // Prevent background scrolling when mobile menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const isDarkMode =
    theme === "dark" ||
    (theme === "system" &&
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-color-scheme: dark)").matches);

  const toggleTheme = () => {
    setTheme(isDarkMode ? "light" : "dark");
  };

  const navItems = [
    { label: "Explore", to: "/explore", icon: Compass },
    { label: "Categories", to: "/categories", icon: Grid3X3 },
    {
      label: "Saved",
      to: "/saved",
      icon: Bookmark,
      badge: savedIds.length > 0 ? savedIds.length : null,
    },
    { label: "Submit", to: "/submit", icon: Upload },
    { label: "Settings", to: "/settings", icon: Settings },
  ];

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    if (currentPath !== "/explore") {
      navigate({ to: "/explore" });
    }
  };

  return (
    <header className="sticky top-0 z-40 flex h-14 w-full items-center justify-between border-b border-[#E5E5E5] bg-[#FFFFFF] px-4 md:hidden dark:border-[#222222] dark:bg-[#000000]">
      {/* Left: Logo */}
      <Link
        to="/explore"
        className="flex items-center gap-2 font-bold tracking-tight text-base text-[#111111] dark:text-[#FFFFFF]"
      >
        <LenxlLogo size={22} />
        <span className="tracking-wider">LENZL</span>
      </Link>

      {/* Right controls: Search toggle, Theme toggle, Hamburger menu */}
      <div className="flex items-center gap-1.5">
        <button
          onClick={() => setShowSearchInput(!showSearchInput)}
          aria-label="Toggle search input"
          className="flex h-9 w-9 items-center justify-center rounded-md border border-[#E5E5E5] text-[#111111] dark:border-[#222222] dark:text-[#FFFFFF]"
        >
          <Search className="h-4 w-4" />
        </button>

        <button
          onClick={toggleTheme}
          aria-label="Toggle dark/light mode"
          className="flex h-9 w-9 items-center justify-center rounded-md border border-[#E5E5E5] text-[#111111] dark:border-[#222222] dark:text-[#FFFFFF]"
        >
          {isDarkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
        </button>

        <button
          onClick={() => setMenuOpen(true)}
          aria-label="Open menu"
          className="flex h-9 w-9 items-center justify-center rounded-md bg-[#111111] text-white dark:bg-white dark:text-black"
        >
          <Menu className="h-4 w-4" />
        </button>
      </div>

      {/* Collapsible Mobile Search Row */}
      {showSearchInput && (
        <div className="absolute top-14 left-0 right-0 z-30 border-b border-[#E5E5E5] bg-[#FFFFFF] p-3 shadow-md dark:border-[#222222] dark:bg-[#000000]">
          <div className="relative flex items-center">
            <Search className="absolute left-3 h-4 w-4 text-[#888888]" />
            <input
              type="text"
              autoFocus
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder="Search templates..."
              className="w-full rounded-lg border border-[#E5E5E5] bg-[#FFFFFF] py-2 pl-9 pr-8 text-xs text-[#111111] placeholder-[#888888] focus:border-[#111111] focus:outline-none dark:border-[#222222] dark:bg-[#080808] dark:text-[#FFFFFF] dark:placeholder-[#666666]"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-2.5 flex h-4 w-4 items-center justify-center text-[#888888]"
              >
                <X className="h-3 w-3" />
              </button>
            )}
          </div>
        </div>
      )}

      {/* Completely OPAQUE Mobile Drawer */}
      {menuOpen && (
        <div
          className="fixed inset-0 z-50 flex flex-col bg-[#FFFFFF] dark:bg-[#000000]"
          style={{
            backgroundColor: isDarkMode ? "#000000" : "#FFFFFF",
            opacity: 1,
          }}
        >
          {/* Drawer Header */}
          <div className="flex h-16 items-center justify-between border-b border-[#E5E5E5] px-6 dark:border-[#222222]">
            <div className="flex items-center gap-2.5 font-bold tracking-tight text-lg text-[#111111] dark:text-[#FFFFFF]">
              <LenxlLogo size={26} />
              <span className="tracking-wider">LENZL</span>
            </div>

            <button
              onClick={() => setMenuOpen(false)}
              aria-label="Close navigation"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-[#E5E5E5] text-[#111111] hover:bg-neutral-100 dark:border-[#222222] dark:text-[#FFFFFF] dark:hover:bg-[#111111]"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Drawer Search */}
          <div className="p-6 pb-2">
            <div className="relative flex items-center">
              <Search className="absolute left-3.5 h-4 w-4 text-[#888888]" />
              <input
                type="text"
                value={searchQuery}
                onChange={handleSearchChange}
                placeholder="Search templates..."
                className="w-full rounded-lg border border-[#E5E5E5] bg-[#FFFFFF] py-2.5 pl-10 pr-4 text-sm text-[#111111] placeholder-[#888888] dark:border-[#222222] dark:bg-[#080808] dark:text-[#FFFFFF]"
              />
            </div>
          </div>

          {/* Navigation Items */}
          <nav className="flex-1 space-y-1.5 px-6 py-4">
            {navItems.map((item) => {
              const isActive = currentPath === item.to;
              const Icon = item.icon;
              return (
                <Link
                  key={item.label}
                  to={item.to}
                  onClick={() => setMenuOpen(false)}
                  className={`flex items-center justify-between rounded-xl px-4 py-3.5 text-base font-semibold transition-colors ${
                    isActive
                      ? "bg-[#F3F4F6] text-[#111111] dark:bg-[#161616] dark:text-[#FFFFFF]"
                      : "text-[#666666] hover:bg-neutral-50 hover:text-[#111111] dark:text-[#A1A1A1] dark:hover:bg-[#0C0C0C] dark:hover:text-[#FFFFFF]"
                  }`}
                >
                  <div className="flex items-center gap-3.5">
                    <Icon className="h-5 w-5" />
                    <span>{item.label}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    {item.badge !== null && (
                      <span className="rounded-full bg-amber-500/20 px-2 py-0.5 text-xs font-bold text-amber-600 dark:text-amber-400">
                        {item.badge}
                      </span>
                    )}
                    <ArrowRight className="h-4 w-4 opacity-40" />
                  </div>
                </Link>
              );
            })}
          </nav>

          {/* Bottom user profile and return to home */}
          <div className="border-t border-[#E5E5E5] p-6 space-y-3 dark:border-[#222222]">
            <Link
              to="/"
              onClick={() => setMenuOpen(false)}
              className="flex items-center gap-2.5 rounded-lg border border-[#E5E5E5] px-4 py-2.5 text-sm font-medium text-[#111111] hover:bg-neutral-50 dark:border-[#222222] dark:text-[#FFFFFF] dark:hover:bg-[#111111]"
            >
              <Home className="h-4 w-4" />
              <span>Back to Landing Page</span>
            </Link>

            <div className="flex items-center gap-3 pt-2">
              <img
                src={userProfile.avatar}
                alt={userProfile.name}
                className="h-9 w-9 rounded-full object-cover border border-[#E5E5E5] dark:border-[#222222]"
              />
              <div className="min-w-0">
                <div className="truncate text-sm font-semibold text-[#111111] dark:text-[#FFFFFF]">
                  {userProfile.name}
                </div>
                <div className="truncate text-xs text-[#666666] dark:text-[#A1A1A1]">
                  {userProfile.email}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
