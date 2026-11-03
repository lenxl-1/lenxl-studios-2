import React from "react";
import { Link, useRouterState, useNavigate } from "@tanstack/react-router";
import {
  Compass,
  Grid3X3,
  Bookmark,
  Upload,
  Settings,
  Search,
  X,
  Sun,
  Moon,
  ArrowLeft,
} from "lucide-react";
import { LenxlLogo } from "@/components/LenxlLogo";
import { useTemplates } from "@/lib/templates-store";

export function LibrarySidebar() {
  const routerState = useRouterState();
  const currentPath = routerState.location.pathname;
  const navigate = useNavigate();

  const { searchQuery, setSearchQuery, savedIds, theme, setTheme, userProfile } = useTemplates();

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setSearchQuery(val);
    // If user starts searching from another page, steer them to /explore
    if (currentPath !== "/explore" && val.trim().length > 0) {
      navigate({ to: "/explore" });
    }
  };

  const menuItems = [
    {
      label: "Explore",
      to: "/explore",
      icon: Compass,
      badge: null,
    },
    {
      label: "Categories",
      to: "/categories",
      icon: Grid3X3,
      badge: null,
    },
    {
      label: "Saved",
      to: "/saved",
      icon: Bookmark,
      badge: savedIds.length > 0 ? savedIds.length : null,
    },
    {
      label: "Submit",
      to: "/submit",
      icon: Upload,
      badge: null,
    },
    {
      label: "Settings",
      to: "/settings",
      icon: Settings,
      badge: null,
    },
  ];

  const isDarkMode =
    theme === "dark" ||
    (theme === "system" &&
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-color-scheme: dark)").matches);

  const toggleTheme = () => {
    setTheme(isDarkMode ? "light" : "dark");
  };

  return (
    <aside
      className="hidden md:flex fixed left-0 top-0 bottom-0 z-30 w-[270px] flex-col border-r border-[#E5E5E5] bg-[#FFFFFF] px-4 py-5 select-none dark:border-[#222222] dark:bg-[#000000]"
      style={{ width: "270px" }}
    >
      {/* Top Branding */}
      <div className="flex items-center justify-between px-2 mb-6">
        <Link
          to="/explore"
          className="flex items-center gap-2.5 font-bold tracking-tight text-lg text-[#111111] dark:text-[#FFFFFF]"
        >
          <LenxlLogo size={26} />
          <span className="tracking-wider">LENZL</span>
        </Link>

        <button
          onClick={toggleTheme}
          title={isDarkMode ? "Switch to Light mode" : "Switch to Dark mode"}
          className="flex h-8 w-8 items-center justify-center rounded-md border border-[#E5E5E5] text-[#666666] transition-colors hover:bg-neutral-100 hover:text-[#111111] dark:border-[#222222] dark:text-[#A1A1A1] dark:hover:bg-[#111111] dark:hover:text-[#FFFFFF]"
        >
          {isDarkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
        </button>
      </div>

      {/* Search templates... */}
      <div className="relative mb-5 px-1">
        <div className="relative flex items-center">
          <Search className="absolute left-3 h-4 w-4 text-[#888888] pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="Search templates..."
            className="w-full rounded-lg border border-[#E5E5E5] bg-[#FFFFFF] py-2 pl-9 pr-8 text-xs text-[#111111] placeholder-[#888888] transition-colors focus:border-[#111111] focus:outline-none dark:border-[#222222] dark:bg-[#080808] dark:text-[#FFFFFF] dark:placeholder-[#666666] dark:focus:border-[#444444]"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-2.5 flex h-4 w-4 items-center justify-center rounded-full text-[#888888] hover:text-[#111111] dark:hover:text-[#FFFFFF]"
            >
              <X className="h-3 w-3" />
            </button>
          )}
        </div>
      </div>

      {/* Navigation menu */}
      <div className="px-2 text-[11px] font-semibold uppercase tracking-wider text-[#888888] mb-2 dark:text-[#666666]">
        Menu
      </div>

      <nav className="flex-1 space-y-1">
        {menuItems.map((item) => {
          const isActive = currentPath === item.to;
          const Icon = item.icon;
          return (
            <Link
              key={item.label}
              to={item.to}
              className={`flex items-center justify-between rounded-lg px-3 py-2 text-xs font-medium transition-all ${
                isActive
                  ? "bg-[#F3F4F6] text-[#111111] font-semibold dark:bg-[#161616] dark:text-[#FFFFFF]"
                  : "text-[#666666] hover:bg-[#F9FAFB] hover:text-[#111111] dark:text-[#A1A1A1] dark:hover:bg-[#0C0C0C] dark:hover:text-[#FFFFFF]"
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon
                  className={`h-4 w-4 ${
                    isActive
                      ? "text-[#111111] dark:text-[#FFFFFF]"
                      : "text-[#888888] dark:text-[#666666]"
                  }`}
                />
                <span>{item.label}</span>
              </div>

              {item.badge !== null && (
                <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-amber-500/15 px-1.5 text-[10px] font-bold text-amber-600 dark:text-amber-400">
                  {item.badge}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Bottom Footer Section */}
      <div className="border-t border-[#E5E5E5] pt-4 mt-auto space-y-3 dark:border-[#222222]">
        {/* Link back to Landing page */}
        <Link
          to="/"
          className="flex items-center gap-2 rounded-lg px-3 py-2 text-xs text-[#666666] transition-colors hover:bg-neutral-100 hover:text-[#111111] dark:text-[#A1A1A1] dark:hover:bg-[#111111] dark:hover:text-[#FFFFFF]"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>Landing Page</span>
        </Link>

        {/* User Card */}
        <Link
          to="/settings"
          className="flex items-center gap-2.5 rounded-lg border border-[#E5E5E5] bg-[#FAFAFA] p-2 transition-colors hover:border-[#CCCCCC] dark:border-[#222222] dark:bg-[#080808] dark:hover:border-[#333333]"
        >
          <img
            src={userProfile.avatar}
            alt={userProfile.name}
            className="h-8 w-8 rounded-full object-cover border border-[#E5E5E5] dark:border-[#333333]"
          />
          <div className="min-w-0 flex-1">
            <div className="truncate text-xs font-semibold text-[#111111] dark:text-[#FFFFFF]">
              {userProfile.name}
            </div>
            <div className="truncate text-[10px] text-[#666666] dark:text-[#A1A1A1]">
              {userProfile.role}
            </div>
          </div>
        </Link>
      </div>
    </aside>
  );
}
