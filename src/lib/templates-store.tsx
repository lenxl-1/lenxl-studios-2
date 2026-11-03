import React, { createContext, useContext, useState, useEffect } from "react";
import { INITIAL_TEMPLATES, type Template } from "./templates-data";
import { useAuth } from "./auth-context";

interface UserProfile {
  name: string;
  email: string;
  avatar: string;
  bio: string;
  role: string;
}

interface TemplatesContextType {
  templates: Template[];
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  selectedType: string;
  setSelectedType: (type: string) => void;
  selectedCategory: string;
  setSelectedCategory: (cat: string) => void;
  selectedStack: string;
  setSelectedStack: (stack: string) => void;
  clearFilters: () => void;

  // Saved templates
  savedIds: string[];
  toggleSave: (id: string) => boolean; // returns new saved state
  isSaved: (id: string) => boolean;

  // Liked templates
  likedIds: string[];
  toggleLike: (id: string) => boolean; // returns new liked state
  isLiked: (id: string) => boolean;

  // Submission
  addTemplate: (data: Omit<Template, "id" | "likes" | "views" | "createdAt">) => Template;

  // User & Settings
  theme: "dark" | "light" | "system";
  setTheme: (t: "dark" | "light" | "system") => void;
  userProfile: UserProfile;
  updateUserProfile: (profile: Partial<UserProfile>) => void;
  preferences: {
    autoplayVideo: boolean;
    defaultStack: string;
    copyFormat: "plain" | "markdown";
    emailAlerts: boolean;
    weeklyDigest: boolean;
  };
  updatePreferences: (pref: Partial<TemplatesContextType["preferences"]>) => void;

  // Stats
  totalCount: number;
  freeCount: number;
  premiumCount: number;
}

const TemplatesContext = createContext<TemplatesContextType | null>(null);

const STORAGE_KEY_TEMPLATES = "lenzl_custom_templates";
const STORAGE_KEY_SAVED = "lenzl_saved_templates";
const STORAGE_KEY_LIKES = "lenzl_liked_templates";
const STORAGE_KEY_THEME = "lenzl_theme";
const STORAGE_KEY_PROFILE = "lenzl_user_profile";
const STORAGE_KEY_PREFS = "lenzl_user_prefs";

export function TemplatesProvider({ children }: { children: React.ReactNode }) {
  const [customTemplates, setCustomTemplates] = useState<Template[]>([]);
  const [savedIds, setSavedIds] = useState<string[]>([]);
  const [likedIds, setLikedIds] = useState<string[]>([]);

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState("All Templates");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [selectedStack, setSelectedStack] = useState("All Stacks");

  const [theme, setThemeState] = useState<"dark" | "light" | "system">("dark");
  const [userProfile, setUserProfileState] = useState<UserProfile>({
    name: "Alex Vance",
    email: "alex.vance@lenzl.dev",
    avatar:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80",
    bio: "Senior Product Designer & AI prompt enthusiast",
    role: "Pro Designer",
  });

  const [preferences, setPreferencesState] = useState({
    autoplayVideo: true,
    defaultStack: "All Stacks",
    copyFormat: "plain" as "plain" | "markdown",
    emailAlerts: true,
    weeklyDigest: false,
  });

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const storedCustom = localStorage.getItem(STORAGE_KEY_TEMPLATES);
      if (storedCustom) {
        setCustomTemplates(JSON.parse(storedCustom));
      }

      const storedSaved = localStorage.getItem(STORAGE_KEY_SAVED);
      if (storedSaved) {
        setSavedIds(JSON.parse(storedSaved));
      }

      const storedLikes = localStorage.getItem(STORAGE_KEY_LIKES);
      if (storedLikes) {
        setLikedIds(JSON.parse(storedLikes));
      }

      const storedProfile = localStorage.getItem(STORAGE_KEY_PROFILE);
      if (storedProfile) {
        setUserProfileState((prev) => ({ ...prev, ...JSON.parse(storedProfile) }));
      }

      const storedPrefs = localStorage.getItem(STORAGE_KEY_PREFS);
      if (storedPrefs) {
        setPreferencesState((prev) => ({ ...prev, ...JSON.parse(storedPrefs) }));
      }

      const storedTheme =
        (localStorage.getItem(STORAGE_KEY_THEME) as "dark" | "light" | "system") || "dark";
      setThemeState(storedTheme);
      applyTheme(storedTheme);
    } catch {
      // ignore
    }
  }, []);

  const { user: supabaseUser } = useAuth();

  useEffect(() => {
    if (supabaseUser) {
      const metadata = supabaseUser.user_metadata || {};
      const fullName =
        metadata.full_name || metadata.name || supabaseUser.email?.split("@")[0] || "Creator";
      const avatarUrl =
        metadata.avatar_url ||
        metadata.picture ||
        `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(fullName)}&backgroundColor=111111&textColor=ffffff`;

      setUserProfileState((prev) => ({
        ...prev,
        name: fullName,
        email: supabaseUser.email || prev.email,
        avatar: avatarUrl,
        role: "Pro Designer",
      }));
    }
  }, [supabaseUser]);

  const applyTheme = (targetTheme: "dark" | "light" | "system") => {
    const isDark =
      targetTheme === "dark" ||
      (targetTheme === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches);
    document.documentElement.classList.toggle("dark", isDark);
  };

  const setTheme = (t: "dark" | "light" | "system") => {
    setThemeState(t);
    applyTheme(t);
    try {
      localStorage.setItem(STORAGE_KEY_THEME, t);
    } catch {
      // ignore
    }
  };

  const toggleSave = (id: string): boolean => {
    setSavedIds((prev) => {
      const next = prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id];
      try {
        localStorage.setItem(STORAGE_KEY_SAVED, JSON.stringify(next));
      } catch {
        // ignore
      }
      return next;
    });
    return !savedIds.includes(id);
  };

  const isSaved = (id: string) => savedIds.includes(id);

  const toggleLike = (id: string): boolean => {
    const isNowLiked = !likedIds.includes(id);
    setLikedIds((prev) => {
      const next = isNowLiked ? [...prev, id] : prev.filter((i) => i !== id);
      try {
        localStorage.setItem(STORAGE_KEY_LIKES, JSON.stringify(next));
      } catch {
        // ignore
      }
      return next;
    });
    return isNowLiked;
  };

  const isLiked = (id: string) => likedIds.includes(id);

  const addTemplate = (data: Omit<Template, "id" | "likes" | "views" | "createdAt">): Template => {
    const newTemplate: Template = {
      ...data,
      id: `custom-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      likes: 1,
      views: 1,
      downloads: 0,
      createdAt: "Just now",
    };

    const nextCustom = [newTemplate, ...customTemplates];
    setCustomTemplates(nextCustom);
    try {
      localStorage.setItem(STORAGE_KEY_TEMPLATES, JSON.stringify(nextCustom));
    } catch {
      // ignore
    }
    return newTemplate;
  };

  const updateUserProfile = (patch: Partial<UserProfile>) => {
    setUserProfileState((prev) => {
      const next = { ...prev, ...patch };
      try {
        localStorage.setItem(STORAGE_KEY_PROFILE, JSON.stringify(next));
      } catch {
        // ignore
      }
      return next;
    });
  };

  const updatePreferences = (patch: Partial<TemplatesContextType["preferences"]>) => {
    setPreferencesState((prev) => {
      const next = { ...prev, ...patch };
      try {
        localStorage.setItem(STORAGE_KEY_PREFS, JSON.stringify(next));
      } catch {
        // ignore
      }
      return next;
    });
  };

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedType("All Templates");
    setSelectedCategory("All Categories");
    setSelectedStack("All Stacks");
  };

  // Combine initial templates + user created
  const allTemplates: Template[] = [...customTemplates, ...INITIAL_TEMPLATES].map((item) => {
    // If the template was liked, reflect it in likes count
    const liked = likedIds.includes(item.id);
    return {
      ...item,
      likes: liked ? item.likes + 1 : item.likes,
    };
  });

  const totalCount = allTemplates.length;
  const freeCount = allTemplates.filter((t) => !t.isPremium).length;
  const premiumCount = allTemplates.filter((t) => t.isPremium).length;

  return (
    <TemplatesContext.Provider
      value={{
        templates: allTemplates,
        searchQuery,
        setSearchQuery,
        selectedType,
        setSelectedType,
        selectedCategory,
        setSelectedCategory,
        selectedStack,
        setSelectedStack,
        clearFilters,
        savedIds,
        toggleSave,
        isSaved,
        likedIds,
        toggleLike,
        isLiked,
        addTemplate,
        theme,
        setTheme,
        userProfile,
        updateUserProfile,
        preferences,
        updatePreferences,
        totalCount,
        freeCount,
        premiumCount,
      }}
    >
      {children}
    </TemplatesContext.Provider>
  );
}

export function useTemplates() {
  const ctx = useContext(TemplatesContext);
  if (!ctx) {
    throw new Error("useTemplates must be used within a TemplatesProvider");
  }
  return ctx;
}
