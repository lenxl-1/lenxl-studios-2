import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import {
  Eye,
  Crosshair,
  Smile,
  ArrowUpRight,
  ArrowDownRight,
  Search,
  LayoutDashboard,
  FileText,
  Database,
  Sparkles,
  Settings,
  ChevronDown,
  Calendar,
  Tag,
  Bot,
  Download,
  HelpCircle,
  Activity,
  BarChart3,
  Check,
  Plus,
  ArrowRight,
  Upload,
  Quote,
  Twitter,
  Github,
  Linkedin,
  Mail,
  Menu,
  X,
  Heart,
  Share2,
  MessageSquare,
  Copy,
  Star,
  Play,
  Lock,
  Layers,
  Filter,
  Zap,
  Rocket,
  Clipboard,
  Bookmark,
} from "lucide-react";
import { useAuth } from "@/lib/auth-context";
import { LeadDialog } from "@/components/LeadDialog";
import { ThemeToggle, CustomCursor, Reveal } from "@/components/SiteEnhancements";
import { LenxlLogo } from "@/components/LenxlLogo";
import LogoCloudBlock from "@/components/ui/logo-cloud-3";
import MegaMenu, { type MegaMenuItem } from "@/components/ui/mega-menu";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "lenxl — AI search analytics for marketing teams" },
      {
        name: "description",
        content:
          "Track, analyze, and improve how your brand appears across AI search platforms like ChatGPT, Perplexity, and Gemini.",
      },
      { property: "og:title", content: "Lumen — AI search analytics" },
      {
        property: "og:description",
        content: "Monitor brand visibility, position, and sentiment across AI answer engines.",
      },
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap",
      },
    ],
  }),
  component: Index,
});

function Chip({
  icon: Icon,
  children,
}: {
  icon: React.ComponentType<{ className?: string }>;
  children: React.ReactNode;
}) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-md border border-border bg-chip px-2 py-1 text-[0.95em] text-chip-foreground align-middle">
      <Icon className="h-3.5 w-3.5" />
      {children}
    </span>
  );
}

function Index() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <CustomCursor />
      <Nav />
      <section id="home">
        <Hero />
      </section>
      <section id="explore">
        <Reveal>
          <DashboardPreview />
        </Reveal>
      </section>
      <section id="categories">
        <Reveal>
          <Logos />
        </Reveal>
      </section>
      <section id="popular">
        <Reveal>
          <KeyFeatures />
        </Reveal>
      </section>
      <Reveal>
        <Testimonial />
      </Reveal>
      <section id="latest">
        <Reveal>
          <Features />
        </Reveal>
      </section>
      <Reveal>
        <FAQ />
      </Reveal>
      <section id="pricing">
        <Reveal>
          <CTA />
        </Reveal>
      </section>
      <section id="about">
        <Footer />
      </section>
    </div>
  );
}

const NAV_ITEMS = [
  { label: "Home", id: "home" },
  { label: "Explore", id: "explore", to: "/explore" },
  { label: "Categories", id: "categories", to: "/categories" },
  { label: "Popular", id: "popular" },
  { label: "Latest", id: "latest" },
  { label: "Pricing", id: "pricing" },
  { label: "Favorites", id: "explore", to: "/saved" },
  { label: "About", id: "about" },
];

const MEGA_MENU_ITEMS: MegaMenuItem[] = [
  {
    id: 1,
    label: "Products",
    subMenus: [
      {
        title: "Analytics & Insights",
        items: [
          {
            label: "Dashboard",
            description: "Live search query visibility & rankings",
            icon: LayoutDashboard,
          },
          {
            label: "AI Brand Mentions",
            description: "Track ChatGPT, Perplexity & Gemini responses",
            icon: Bot,
          },
        ],
      },
      {
        title: "Growth & Optimization",
        items: [
          {
            label: "Competitive Intelligence",
            description: "Compare citation share with market rivals",
            icon: BarChart3,
          },
          {
            label: "Content Optimization",
            description: "AI engine friendly source suggestions",
            icon: Sparkles,
          },
        ],
      },
    ],
  },
  {
    id: 2,
    label: "Solutions",
    subMenus: [
      {
        title: "Use Cases",
        items: [
          {
            label: "B2B SaaS Marketing",
            description: "Own the AI conversation in your category",
            icon: Eye,
          },
          {
            label: "Enterprise SEO",
            description: "Adapt legacy search teams for generative AI",
            icon: Crosshair,
          },
          {
            label: "Reputation Protection",
            description: "Detect and flag hallucinated brand errors",
            icon: Activity,
          },
        ],
      },
      {
        title: "Integrations",
        items: [
          {
            label: "CRM Sync",
            description: "Connect Salesforce, HubSpot, and Pipedrive",
            icon: Database,
          },
          {
            label: "Custom API & Export",
            description: "Automate daily reporting & data streams",
            icon: Download,
          },
        ],
      },
    ],
  },
  {
    id: 3,
    label: "Pricing",
    link: "#pricing",
  },
  {
    id: 4,
    label: "About",
    link: "#about",
  },
];

function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
}

function Nav() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("home");
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    const ids = Array.from(new Set(NAV_ITEMS.map((n) => n.id)));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: 0 },
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const handleClick = (item: (typeof NAV_ITEMS)[number]) => {
    setOpen(false);
    if (item.to) {
      navigate({ to: item.to });
    } else {
      setTimeout(() => scrollToId(item.id), 50);
    }
  };

  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <a href="/" className="flex items-center gap-2.5 font-semibold tracking-tight text-lg">
          <LenxlLogo size={28} />
          <span>lenxl</span>
        </a>
        <nav className="hidden items-center gap-6 text-sm text-muted-foreground md:flex">
          <MegaMenu items={MEGA_MENU_ITEMS} />
        </nav>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          {user ? (
            <Link
              to="/explore"
              className="hidden items-center gap-1.5 rounded-md bg-primary px-3.5 py-1.5 text-sm font-medium text-primary-foreground hover:opacity-90 md:inline-flex"
            >
              <span>Explore Library</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          ) : (
            <>
              <Link
                to="/login"
                className="hidden rounded-md px-3 py-1.5 text-sm text-foreground hover:bg-muted md:inline-flex"
              >
                Log in
              </Link>
              <Link
                to="/signup"
                className="hidden items-center rounded-md bg-primary px-3.5 py-1.5 text-sm font-medium text-primary-foreground hover:opacity-90 md:inline-flex"
              >
                Sign up
              </Link>
            </>
          )}
          <button
            aria-label="Open menu"
            onClick={() => setOpen(true)}
            className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-border bg-card text-foreground md:hidden"
          >
            <Menu className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      <div className={`md:hidden ${open ? "" : "pointer-events-none"}`} aria-hidden={!open}>
        <div
          onClick={() => setOpen(false)}
          style={{ zIndex: 9998, backgroundColor: "rgba(0,0,0,0.6)" } as React.CSSProperties}
          className={`fixed inset-0 transition-opacity duration-300 ${
            open ? "opacity-100" : "opacity-0"
          }`}
        />
        <aside
          style={{ zIndex: 9999 } as React.CSSProperties}
          className={`fixed left-0 top-0 h-full w-[85%] max-w-sm rounded-r-3xl border-r border-border bg-[#FFFFFF] dark:bg-[#000000] p-6 shadow-2xl transition-transform duration-300 ${
            open ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="mb-8 flex items-center justify-between">
            <div className="flex items-center gap-2.5 font-semibold tracking-tight text-lg">
              <LenxlLogo size={28} />
              <span>lenxl</span>
            </div>
            <button
              aria-label="Close menu"
              onClick={() => setOpen(false)}
              className="sticky top-0 inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-background hover:bg-muted"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          <nav className="flex flex-col gap-1">
            {NAV_ITEMS.map((n) => {
              const isActive = active === n.id;
              return (
                <button
                  key={n.label}
                  onClick={() => handleClick(n)}
                  style={{ fontSize: "22px", fontWeight: 600, lineHeight: 1.8 }}
                  className={`relative flex items-center justify-between rounded-lg px-4 py-2 text-left transition-colors ${
                    isActive ? "text-primary" : "text-foreground/80 hover:text-foreground"
                  }`}
                >
                  {isActive && (
                    <span className="absolute left-0 top-1/2 h-6 w-1 -translate-y-1/2 rounded-full bg-primary" />
                  )}
                  <span>{n.label}</span>
                  <ArrowRight className="h-4 w-4 opacity-40" />
                </button>
              );
            })}
          </nav>
          <div className="mt-8 flex flex-col gap-2 border-t border-border pt-6">
            {user ? (
              <Link
                to="/explore"
                onClick={() => setOpen(false)}
                className="w-full flex items-center justify-center gap-2 rounded-md bg-primary px-4 py-2.5 text-center text-sm font-medium text-primary-foreground hover:opacity-90"
              >
                <span>Open Explore Library</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            ) : (
              <>
                <Link
                  to="/login"
                  onClick={() => setOpen(false)}
                  className="w-full rounded-md border border-border px-4 py-2.5 text-center text-sm font-medium hover:bg-muted"
                >
                  Log in
                </Link>
                <Link
                  to="/signup"
                  onClick={() => setOpen(false)}
                  className="w-full rounded-md bg-primary px-4 py-2.5 text-center text-sm font-medium text-primary-foreground hover:opacity-90"
                >
                  Sign up
                </Link>
              </>
            )}
          </div>
        </aside>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-40 [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]" />
      <div className="relative mx-auto max-w-5xl px-6 pt-20 pb-12 text-center">
        <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs text-muted-foreground shadow-sm">
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-danger opacity-60" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-danger" />
          </span>
          browse---copy---bulid
        </span>

        <h1
          className="mt-7 text-[clamp(1.875rem,4.5vw,3.5rem)] font-extrabold leading-[1.05] tracking-tight"
          style={{ fontFamily: '"OffBit", "Inter", sans-serif' }}
        >
          The complete prompt library for
          <br />
          <span className="text-muted-foreground">modern designers</span>
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-balance text-[1.05rem] leading-relaxed text-muted-foreground">
          Browse AI-generated web designs, copy the prompt, and build instantly with{" "}
          <Chip icon={Sparkles}>v0</Chip>, <Chip icon={Bot}>Bolt</Chip>, or{" "}
          <Chip icon={Heart}>Lovable</Chip> — no starting from scratch
        </p>

        <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
          <Link
            to="/explore"
            className="inline-flex items-center gap-2 rounded-md border border-border bg-card px-4 py-2.5 text-sm font-medium hover:bg-muted"
          >
            <span className="h-1.5 w-1.5 rounded-sm bg-muted-foreground/60" />
            Browse Templates
          </Link>
          <button
            onClick={() => scrollToId("popular")}
            className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground hover:opacity-90"
          >
            <Play className="h-3.5 w-3.5 fill-current" />
            See how it works
          </button>
        </div>
      </div>
    </section>
  );
}

function DashboardPreview() {
  return (
    <section className="relative px-6 pb-24">
      <div className="mx-auto max-w-6xl overflow-hidden rounded-xl border border-border bg-card shadow-[0_24px_80px_-24px_rgba(0,0,0,0.18)]">
        <div className="grid grid-cols-[220px_1fr]">
          {/* Sidebar */}
          <aside className="border-r border-border bg-secondary/40 p-3 text-sm">
            <Link
              to="/explore"
              className="mb-3 flex items-center gap-2 rounded-md px-2 py-1.5 transition-opacity hover:opacity-80"
            >
              <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-[10px] font-bold text-primary-foreground">
                L
              </div>
              <span className="font-medium text-foreground">LenxlUI</span>
            </Link>
            <Link
              to="/explore"
              className="mb-4 flex items-center gap-2 rounded-md border border-border bg-card px-2 py-1.5 text-muted-foreground transition-colors hover:border-primary/40 hover:text-foreground"
            >
              <Search className="h-3.5 w-3.5" />
              <span className="text-xs">Search templates...</span>
            </Link>
            <div className="px-2 text-[11px] uppercase tracking-wider text-muted-foreground">
              MENU
            </div>
            <nav className="mt-2 space-y-0.5 text-[13px]">
              <SideItem to="/explore" icon={LayoutDashboard} label="Explore" active />
              <SideItem to="/categories" icon={FileText} label="Categories" />
              <SideItem to="/saved" icon={Bookmark} label="Saved" />
              <SideItem to="/submit" icon={Upload} label="Submit" />
              <SideItem to="/settings" icon={Settings} label="Settings" />
            </nav>
          </aside>

          {/* Main */}
          <div className="p-4">
            {/* Toolbar */}
            <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
              <div className="flex flex-wrap items-center gap-2 text-xs">
                <Link to="/explore">
                  <ToolChip
                    icon={() => (
                      <div className="flex h-3.5 w-3.5 items-center justify-center rounded-sm bg-primary text-[8px] font-bold text-primary-foreground">
                        L
                      </div>
                    )}
                  >
                    LenxlUI
                  </ToolChip>
                </Link>
                <Link to="/explore">
                  <ToolChip icon={Calendar}>All Templates</ToolChip>
                </Link>
                <Link to="/categories">
                  <ToolChip icon={Tag}>All Categories</ToolChip>
                </Link>
                <Link to="/explore">
                  <ToolChip icon={Bot}>All Stacks</ToolChip>
                </Link>
              </div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Link
                  to="/explore"
                  className="inline-flex items-center gap-1 rounded-md border border-border bg-card px-2.5 py-1 text-foreground transition-colors hover:bg-muted"
                >
                  <ArrowRight className="h-3.5 w-3.5" /> Open Full Library
                </Link>
              </div>
            </div>

            {/* Stats bar */}
            <Link
              to="/explore"
              className="mb-4 flex flex-wrap items-center justify-between gap-2 rounded-lg border border-border bg-secondary/30 px-3 py-2 text-xs transition-colors hover:border-primary/40 block"
            >
              <div className="flex items-center gap-2 text-muted-foreground">
                <Activity className="h-3.5 w-3.5 text-primary" />
                Overview · <span className="text-foreground">New templates added this week</span>
              </div>
              <div className="flex items-center gap-3 text-muted-foreground">
                <span>
                  Templates: <span className="text-foreground font-medium">9</span>
                </span>
                <span>
                  Free: <span className="text-foreground font-medium">5</span>
                </span>
                <span>
                  Premium: <span className="text-foreground font-medium">4</span>
                </span>
              </div>
            </Link>

            <GalleryGrid />
          </div>
        </div>
      </div>
    </section>
  );
}

type GalleryItem = {
  title: string;
  author: string;
  price: string;
  category: string;
  description: string;
  tags: string[];
  views: number;
  downloads: number;
  likes: number;
  date: string;
  img: string;
  video?: string;
  prompt: string;
};

const GALLERY_ITEMS: GalleryItem[] = [
  {
    title: "SaaS Landing Page",
    author: "React + Tailwind",
    price: "Free",
    category: "Landing",
    description:
      "A sleek, high-converting SaaS landing page with dark aesthetic, hero waitlist, and feature grids.",
    tags: ["Landing", "SaaS", "React", "Tailwind"],
    views: 14200,
    downloads: 840,
    likes: 1240,
    date: "Apr 14, 2026",
    img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&auto=format&fit=crop&q=70",
    video: "https://cdn.dribbble.com/userupload/47775769/file/814cf81f46a91ed258f093fd0577df99.mp4",
    prompt:
      "Create a modern high-converting dark mode SaaS landing page in React and Tailwind CSS with a hero section, feature cards, and clean typography.",
  },
  {
    title: "Analytics Dashboard",
    author: "React + Recharts",
    price: "Free",
    category: "Dashboard",
    description:
      "Comprehensive analytics dashboard featuring line charts, metric cards, and responsive sidebar.",
    tags: ["Dashboard", "Analytics", "Recharts", "React"],
    views: 9800,
    downloads: 512,
    likes: 890,
    date: "Apr 12, 2026",
    img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&q=80",
    video:
      "https://cdn.dribbble.com/userupload/43898638/file/original-1971d8b552b526fed60a6bdba6c8ef59.mp4",
    prompt:
      "Build an interactive analytics dashboard in React with Recharts, key metric summary cards, and time-range filters.",
  },
  {
    title: "Dev Portfolio",
    author: "HTML + CSS + JS",
    price: "Free",
    category: "Portfolio",
    description:
      "Minimalist developer portfolio with project showcases, experience timeline, and contact trigger.",
    tags: ["Portfolio", "Minimal", "HTML/CSS"],
    views: 8100,
    downloads: 430,
    likes: 720,
    date: "Apr 10, 2026",
    img: "https://images.unsplash.com/photo-1547658719-da2b51169166?w=600&q=80",
    video: "https://cdn.dribbble.com/userupload/46369825/file/66de4eff2518c6308a5eda684251822a.mp4",
    prompt:
      "A minimalist, high-contrast developer portfolio layout with project grid, skills tags, and clean bio section.",
  },
  {
    title: "E-commerce Store",
    author: "React + Tailwind",
    price: "$9",
    category: "Ecommerce",
    description:
      "Curated product grid, drawer cart, category filters, and polished product detail modals.",
    tags: ["Ecommerce", "Store", "Shop", "Tailwind"],
    views: 16400,
    downloads: 920,
    likes: 1540,
    date: "Apr 08, 2026",
    img: "https://images.unsplash.com/photo-1561069934-eee225952461?w=600&q=80",
    video: "https://cdn.dribbble.com/userupload/44548846/file/7f470e7f133054a02d49f79348e2bd3c.mp4",
    prompt:
      "An elegant e-commerce storefront with product cards, filter drawer, badge tags, and cart summary.",
  },
  {
    title: "Startup Waitlist",
    author: "HTML + CSS",
    price: "Free",
    category: "Marketing",
    description:
      "Ultra-clean startup waitlist page with email capture, social proof avatar stack, and feature pills.",
    tags: ["Waitlist", "Startup", "LeadGen"],
    views: 7300,
    downloads: 340,
    likes: 610,
    date: "Apr 05, 2026",
    img: "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=600&q=80",
    video: "https://cdn.dribbble.com/userupload/45349094/file/79ec4bf629f27cf86e1cb630a6334643.mp4",
    prompt:
      "A clean, high-conversion startup pre-launch waitlist page with email form and live countdown counter.",
  },
  {
    title: "AI Chatbot UI",
    author: "React + Tailwind",
    price: "$9",
    category: "AI/Chat",
    description:
      "Streaming message bubbles, prompt suggestions bar, model selector dropdown, and markdown support.",
    tags: ["AI", "Chat", "LLM", "React"],
    views: 22100,
    downloads: 1450,
    likes: 2180,
    date: "Apr 02, 2026",
    img: "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=600&q=80",
    video: "https://cdn.dribbble.com/userupload/48015410/file/246fee6ef2dac18d5e530eb185aad155.mp4",
    prompt:
      "A modern conversational AI chatbot interface with suggested prompts chips, chat bubbles, and model selector.",
  },
  {
    title: "SaaS Pricing Page",
    author: "React + Tailwind",
    price: "$9",
    category: "Pricing",
    description:
      "Tier comparison table, monthly/annual toggle switch, feature checklist, and FAQ accordion.",
    tags: ["Pricing", "SaaS", "Billing"],
    views: 11500,
    downloads: 670,
    likes: 980,
    date: "Mar 29, 2026",
    img: "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=600&q=80",
    video:
      "https://cdn.dribbble.com/userupload/45892543/file/large-27856ee44638596ba1ef72007d2bb179.mp4",
    prompt:
      "A clean 3-tier SaaS pricing comparison page with monthly/yearly toggle and highlighted popular plan.",
  },
  {
    title: "Mobile App Landing",
    author: "HTML + CSS + JS",
    price: "Free",
    category: "Mobile",
    description:
      "App store badges, mobile mockup slider, feature highlights, and user rating reviews.",
    tags: ["Mobile", "App", "Landing"],
    views: 6400,
    downloads: 290,
    likes: 540,
    date: "Mar 25, 2026",
    img: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=600&q=80",
    video:
      "https://cdn.dribbble.com/userupload/12370236/file/original-3fd1770fb116f9649858a7c3bb40e40d.mp4",
    prompt:
      "A modern mobile app landing page with phone mockup framing, app download badges, and feature highlights.",
  },
  {
    title: "Admin Panel",
    author: "React + Tailwind",
    price: "$9",
    category: "Admin",
    description:
      "Data table with sorting, bulk actions, user management permissions, and activity timeline.",
    tags: ["Admin", "Table", "Dashboard"],
    views: 18700,
    downloads: 1100,
    likes: 1690,
    date: "Mar 20, 2026",
    img: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600&q=80",
    video:
      "https://cdn.dribbble.com/userupload/48106679/file/large-0388e25a4bed901f580f834ac3e7d0f7.mp4",
    prompt:
      "A full-featured responsive admin management panel with data tables, search/filter bars, and user status badges.",
  },
];

function GalleryGrid() {
  const [openItem, setOpenItem] = useState<GalleryItem | null>(null);
  const [likes, setLikes] = useState<Record<string, boolean>>({});

  const copyPrompt = (e: React.MouseEvent, item: GalleryItem) => {
    e.stopPropagation();
    e.preventDefault();
    navigator.clipboard?.writeText(item.prompt).catch(() => {});
    toast.success("Prompt copied!");
  };

  const toggleLike = (title: string) => {
    setLikes((l) => ({ ...l, [title]: !l[title] }));
  };

  return (
    <>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {GALLERY_ITEMS.map((it, i) => (
          <div
            key={it.title}
            role="button"
            tabIndex={0}
            onClick={() => setOpenItem(it)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                setOpenItem(it);
              }
            }}
            className="group relative flex cursor-pointer flex-col overflow-hidden rounded-[18px] border border-border bg-card text-left shadow-sm transition-all duration-300 ease-out hover:z-10 hover:-translate-y-1 hover:border-primary/50 hover:shadow-[0_24px_60px_-20px_color-mix(in_oklab,var(--color-foreground)_35%,transparent)]"
            style={{ animation: `fade-in 0.5s ease-out ${i * 50}ms both` }}
          >
            <div
              className="relative w-full overflow-hidden bg-muted"
              style={{ aspectRatio: "16 / 9" }}
            >
              <video
                src={it.video || it.img}
                autoPlay
                muted
                loop
                playsInline
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  borderRadius: "inherit",
                  display: "block",
                  pointerEvents: "none",
                }}
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.06]"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <button
                onClick={(e) => copyPrompt(e, it)}
                className="absolute bottom-3 right-3 inline-flex translate-y-1 items-center gap-1.5 rounded-full bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground opacity-0 shadow-lg transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 hover:opacity-90"
              >
                <Copy className="h-3.5 w-3.5" /> Copy Prompt
              </button>
            </div>
            <div className="flex items-center justify-between gap-3 px-4 py-3">
              <div className="min-w-0">
                <div className="truncate text-sm font-medium text-foreground">{it.title}</div>
                <div className="truncate text-xs text-muted-foreground">{it.author}</div>
              </div>
              <div
                className={`shrink-0 text-xs font-semibold ${it.price === "Free" ? "text-success" : "text-foreground"}`}
              >
                {it.price}
              </div>
            </div>
          </div>
        ))}
      </div>

      <DesignModal
        item={openItem}
        open={!!openItem}
        onOpenChange={(v) => !v && setOpenItem(null)}
        liked={openItem ? !!likes[openItem.title] : false}
        onToggleLike={() => openItem && toggleLike(openItem.title)}
        onOpenItem={setOpenItem}
      />
    </>
  );
}

function DesignModal({
  item,
  open,
  onOpenChange,
  liked,
  onToggleLike,
  onOpenItem,
}: {
  item: GalleryItem | null;
  open: boolean;
  onOpenChange: (v: boolean) => void;
  liked: boolean;
  onToggleLike: () => void;
  onOpenItem: (i: GalleryItem) => void;
}) {
  if (!item) return null;
  const related = GALLERY_ITEMS.filter((g) => g.title !== item.title).slice(0, 4);
  const copyPrompt = () => {
    navigator.clipboard?.writeText(item.prompt).catch(() => {});
    toast.success("Prompt copied!");
  };
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[95vw] max-w-6xl gap-0 overflow-hidden rounded-2xl border-border bg-card p-0 sm:w-[90vw]">
        <div className="max-h-[90vh] overflow-y-auto">
          <div
            className="relative w-full overflow-hidden bg-muted"
            style={{ aspectRatio: "16 / 9" }}
          >
            {item.video ? (
              <video
                src={item.video}
                autoPlay
                loop
                muted
                playsInline
                controls
                className="absolute inset-0 h-full w-full object-cover"
              />
            ) : (
              <img
                src={item.img}
                alt={item.title}
                className="absolute inset-0 h-full w-full object-cover"
              />
            )}
          </div>
          <div className="grid gap-8 p-6 md:grid-cols-[1fr_280px] md:p-8">
            <div>
              <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                <span className="rounded-full border border-border bg-secondary px-2 py-0.5">
                  {item.category}
                </span>
                <span>·</span>
                <span>{item.date}</span>
              </div>
              <h2 className="mt-3 text-2xl font-semibold tracking-tight md:text-3xl">
                {item.title}
              </h2>
              <div className="mt-1 text-sm text-muted-foreground">by {item.author}</div>
              <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
                {item.description}
              </p>

              <div className="mt-5 flex flex-wrap gap-1.5">
                {item.tags.map((t) => (
                  <span
                    key={t}
                    className="rounded-full border border-border bg-secondary px-2.5 py-1 text-xs text-muted-foreground"
                  >
                    #{t}
                  </span>
                ))}
              </div>

              <div className="mt-6 flex flex-wrap gap-2">
                <button
                  onClick={onToggleLike}
                  className={`inline-flex items-center gap-1.5 rounded-full border px-3.5 py-2 text-sm transition-all ${
                    liked
                      ? "border-danger bg-danger/10 text-danger"
                      : "border-border hover:bg-muted"
                  }`}
                >
                  <Heart
                    className={`h-4 w-4 transition-transform ${liked ? "scale-110 fill-current" : ""}`}
                  />
                  {liked ? "Liked" : "Like"}
                </button>
                <button className="inline-flex items-center gap-1.5 rounded-full border border-border px-3.5 py-2 text-sm hover:bg-muted">
                  <Star className="h-4 w-4" /> Reviews
                </button>
                <button
                  onClick={copyPrompt}
                  className="inline-flex items-center gap-1.5 rounded-full bg-primary px-3.5 py-2 text-sm font-medium text-primary-foreground hover:opacity-90"
                >
                  <Copy className="h-4 w-4" /> Copy Prompt
                </button>
                <button
                  onClick={() => {
                    navigator.clipboard?.writeText(window.location.href).catch(() => {});
                    toast.success("Link copied!");
                  }}
                  className="inline-flex items-center gap-1.5 rounded-full border border-border px-3.5 py-2 text-sm hover:bg-muted"
                >
                  <Share2 className="h-4 w-4" /> Share
                </button>
                <button className="inline-flex items-center gap-1.5 rounded-full border border-border px-3.5 py-2 text-sm hover:bg-muted">
                  <Download className="h-4 w-4" /> Download
                </button>
              </div>

              <div className="mt-10">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold tracking-tight">Reviews</h3>
                  <div className="flex items-center gap-1 text-sm">
                    <Star className="h-4 w-4 fill-current text-amber-500" />
                    <span className="font-medium">4.8</span>
                    <span className="text-muted-foreground">(126)</span>
                  </div>
                </div>
                <div className="mt-4 space-y-4">
                  {[
                    {
                      name: "Ava Ito",
                      rating: 5,
                      comment: "Beautifully composed. The spacing rhythm is chef's kiss.",
                      date: "Apr 14, 2026",
                    },
                    {
                      name: "Diego Lima",
                      rating: 4,
                      comment: "Loved the palette. Would use for a client pitch.",
                      date: "Apr 10, 2026",
                    },
                  ].map((r) => (
                    <div key={r.name} className="rounded-xl border border-border bg-background p-4">
                      <div className="flex items-center gap-3">
                        <div className="h-9 w-9 rounded-full bg-gradient-to-br from-amber-200 to-rose-300" />
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <div className="text-sm font-medium">{r.name}</div>
                            <div className="text-xs text-muted-foreground">{r.date}</div>
                          </div>
                          <div className="mt-0.5 flex text-amber-500">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <Star
                                key={i}
                                className={`h-3.5 w-3.5 ${i < r.rating ? "fill-current" : "opacity-30"}`}
                              />
                            ))}
                          </div>
                        </div>
                      </div>
                      <p className="mt-2 text-sm text-muted-foreground">{r.comment}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <aside className="space-y-3">
              <div className="rounded-xl border border-border bg-background p-4">
                <div className="text-xs uppercase tracking-wider text-muted-foreground">Price</div>
                <div
                  className={`mt-1 text-2xl font-semibold ${item.price === "Free" ? "text-success" : ""}`}
                >
                  {item.price}
                </div>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { label: "Views", value: item.views },
                  { label: "Downloads", value: item.downloads },
                  { label: "Likes", value: item.likes },
                ].map((s) => (
                  <div
                    key={s.label}
                    className="rounded-xl border border-border bg-background p-3 text-center"
                  >
                    <div className="text-sm font-semibold">{s.value.toLocaleString()}</div>
                    <div className="text-[10px] uppercase tracking-wider text-muted-foreground">
                      {s.label}
                    </div>
                  </div>
                ))}
              </div>
            </aside>
          </div>

          <div className="border-t border-border p-6 md:p-8">
            <h3 className="text-lg font-semibold tracking-tight">Related designs</h3>
            <div className="mt-4 grid grid-cols-2 gap-4 md:grid-cols-4">
              {related.map((r) => (
                <button
                  key={r.title}
                  onClick={() => onOpenItem(r)}
                  className="group overflow-hidden rounded-xl border border-border bg-background text-left transition-all hover:-translate-y-0.5 hover:border-primary/50"
                >
                  <div
                    className="relative w-full overflow-hidden bg-muted"
                    style={{ aspectRatio: "16 / 9" }}
                  >
                    <img
                      src={r.img}
                      alt={r.title}
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="flex items-center justify-between px-3 py-2">
                    <div className="min-w-0">
                      <div className="truncate text-xs font-medium">{r.title}</div>
                      <div className="truncate text-[11px] text-muted-foreground">{r.author}</div>
                    </div>
                    <div
                      className={`text-[11px] font-semibold ${r.price === "Free" ? "text-success" : ""}`}
                    >
                      {r.price}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function SideItem({
  icon: Icon,
  label,
  active,
  to,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  active?: boolean;
  to?: string;
}) {
  if (to) {
    return (
      <Link
        to={to}
        className={`flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-left transition-colors ${
          active
            ? "bg-card border border-border text-foreground font-medium"
            : "text-muted-foreground hover:bg-muted hover:text-foreground"
        }`}
      >
        <Icon className="h-3.5 w-3.5" />
        {label}
      </Link>
    );
  }
  return (
    <button
      className={`flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-left ${
        active ? "bg-card border border-border" : "text-muted-foreground hover:bg-muted"
      }`}
    >
      <Icon className="h-3.5 w-3.5" />
      {label}
    </button>
  );
}

function ToolChip({
  icon: Icon,
  children,
  small,
}: {
  icon: React.ComponentType<{ className?: string }>;
  children: React.ReactNode;
  small?: boolean;
}) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-md border border-border bg-card text-foreground ${
        small ? "px-1.5 py-0.5" : "px-2 py-1"
      }`}
    >
      <Icon className="h-3.5 w-3.5" />
      {children}
    </span>
  );
}

function Chart() {
  // Simple inline SVG line chart
  const lines = [
    {
      color: "oklch(0.55 0.18 250)",
      d: "M0,80 C40,70 80,55 120,50 S200,30 240,35 320,20 360,25 440,18 480,22",
    },
    {
      color: "oklch(0.62 0.18 25)",
      d: "M0,95 C40,90 80,85 120,75 S200,55 240,58 320,45 360,40 440,35 480,30",
    },
    {
      color: "oklch(0.7 0.16 90)",
      d: "M0,110 C40,108 80,100 120,95 S200,80 240,82 320,70 360,65 440,55 480,48",
    },
    {
      color: "oklch(0.6 0.14 145)",
      d: "M0,130 C40,125 80,120 120,115 S200,100 240,98 320,90 360,85 440,75 480,70",
    },
  ];
  return (
    <div className="relative h-56 w-full">
      <svg viewBox="0 0 480 160" className="h-full w-full" preserveAspectRatio="none">
        {[0, 40, 80, 120].map((y) => (
          <line
            key={y}
            x1="0"
            x2="480"
            y1={y}
            y2={y}
            stroke="var(--color-border)"
            strokeDasharray="2 4"
          />
        ))}
        {lines.map((l, i) => (
          <path key={i} d={l.d} fill="none" stroke={l.color} strokeWidth="1.8" />
        ))}
        <line x1="320" x2="320" y1="0" y2="160" stroke="var(--color-border)" />
      </svg>
      <div className="absolute right-3 top-1 rounded-md border border-border bg-card p-2 text-[10px] shadow-sm">
        <div className="mb-1 font-medium">April 2026</div>
        {[
          ["Monday", "65%", "oklch(0.55 0.18 250)"],
          ["Salesforce", "62%", "oklch(0.62 0.18 25)"],
          ["Acme", "47%", "oklch(0.7 0.16 90)"],
          ["Zero", "32%", "oklch(0.6 0.14 145)"],
        ].map(([n, v, c]) => (
          <div key={n} className="flex items-center justify-between gap-3">
            <span className="flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full" style={{ background: c as string }} />
              {n}
            </span>
            <span className="font-medium">{v}</span>
          </div>
        ))}
      </div>
      <div className="absolute inset-x-0 bottom-0 flex justify-between px-1 text-[10px] text-muted-foreground">
        {["Jan", "Feb", "Mar", "Apr", "May", "Jun"].map((m) => (
          <span key={m}>{m}</span>
        ))}
      </div>
    </div>
  );
}

function Logos() {
  return <LogoCloudBlock />;
}

function Features() {
  const items = [
    {
      icon: Clipboard,
      title: "Browse",
      body: "Explore 50+ hand-picked AI-generated UI templates filtered by category, stack, and style. Every design is tested and production-quality.",
    },
    {
      icon: Zap,
      title: "Copy",
      body: "Grab the exact AI prompt behind every design in one click — hand-tested to work in v0, Bolt, and Lovable on the first try.",
    },
    {
      icon: Rocket,
      title: "Build",
      body: "Open your prompt directly in your AI tool, generate the UI, customise the code, and ship your project faster than ever before.",
    },
  ];
  return (
    <section className="px-6 py-24">
      <div className="mx-auto max-w-5xl text-center">
        <h2 className="font-display text-4xl tracking-tight md:text-5xl">
          The three steps that matter
          <br />
          <span className="text-muted-foreground">in the age of AI design.</span>
        </h2>
        <div className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-3">
          {items.map((it) => (
            <div
              key={it.title}
              className="card-lift rounded-xl border border-border bg-card p-6 text-left"
            >
              <div className="mb-4 inline-flex h-9 w-9 items-center justify-center rounded-md border border-border bg-secondary">
                <it.icon className="h-4 w-4" />
              </div>
              <div className="text-lg font-semibold tracking-tight">{it.title}</div>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{it.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTA() {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="px-6 pb-24">
      <div className="mx-auto max-w-5xl overflow-hidden rounded-2xl border border-border bg-primary p-12 text-center text-primary-foreground">
        <h2 className="font-display text-4xl tracking-tight md:text-5xl">
          Start building beautiful
          <br />
          UIs today.
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-sm text-primary-foreground/70">
          Free plan available. No credit card required.
        </p>
        <div className="mt-7 flex justify-center gap-3">
          <button
            onClick={() => scrollTo("explore")}
            className="rounded-md bg-background px-4 py-2.5 text-sm font-medium text-foreground hover:opacity-90"
          >
            Browse templates
          </button>
          <Link
            to="/signup"
            className="rounded-md border border-primary-foreground/30 px-4 py-2.5 text-sm font-medium hover:bg-primary-foreground/10"
          >
            Create free account
          </Link>
        </div>
      </div>
    </section>
  );
}

function KeyFeatures() {
  return (
    <section className="px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10">
          <span className="inline-flex items-center gap-1.5 rounded-md border border-border bg-card px-2.5 py-1 text-xs text-muted-foreground">
            <Sparkles className="h-3.5 w-3.5" /> Key features
          </span>
          <div className="mt-6 grid grid-cols-1 gap-8 md:grid-cols-2">
            <h2 className="font-display text-4xl leading-[1.05] tracking-tight md:text-5xl">
              Turn AI prompts into production-ready designs with lenxl UI
            </h2>
            <p className="self-end border-l border-border pl-5 text-muted-foreground">
              Browse the designs that inspire, copy the prompt that works, and build before the
              deadline hits
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <FeatureCard
            title="Browse Templates"
            body="Templates are the foundation of your design workflow. Find and save the ones that match your project type and stack."
            visual={<PromptsVisual />}
            tall
          />
          <FeatureCard
            title="Copy the Prompt"
            body="Every template comes with a hand-tested AI prompt. Copy it to your clipboard in one click — no editing needed."
            visual={<SuggestedVisual />}
            tall
          />
          <FeatureCard
            title="Open in AI"
            body="Launch your prompt directly into your favourite AI tool — pre-filled and ready to generate in one click."
            visual={<BrandsVisual />}
            tall
          />
          <FeatureCard
            title="Choose Your Stack"
            body="Filter templates by tech stack so you only see designs that match your project setup."
            visual={<ModelsVisual />}
            tall
          />
          <FeatureCard
            title="Export as Code"
            body="Pro members can download clean, production-ready code directly — no AI tool needed. Just drop it into your project."
            visual={<SourcesVisual />}
          />
          <FeatureCard
            title="Customise and Ship"
            body="Use the generated code as your starting point. Swap colours, update content, and deploy when you're ready."
            visual={<InsightsVisual />}
          />
        </div>
      </div>
    </section>
  );
}

function FeatureCard({
  title,
  body,
  visual,
  tall,
}: {
  title: string;
  body: string;
  visual: React.ReactNode;
  tall?: boolean;
}) {
  return (
    <div className="card-lift overflow-hidden rounded-xl border border-border bg-card p-6">
      <h3 className="text-lg font-semibold tracking-tight">{title}</h3>
      <p className="mt-2 max-w-md text-sm leading-relaxed text-muted-foreground">{body}</p>
      <div className={`mt-6 ${tall ? "h-64" : "h-56"} relative overflow-hidden`}>{visual}</div>
    </div>
  );
}

function PromptsVisual() {
  const templates = [
    { name: "SaaS Landing Page", type: "popular" },
    { name: "Dashboard UI", type: "popular" },
    { name: "Developer Portfolio", type: "free" },
    { name: "E-commerce Storefront", type: "premium" },
  ];

  return (
    <div className="absolute inset-x-0 top-0 rounded-lg border border-border bg-card p-3 shadow-sm">
      <div className="mb-2.5 flex items-center justify-between text-xs">
        <span className="flex items-center gap-1.5 font-medium text-foreground">
          <Layers className="h-3.5 w-3.5 text-primary" /> Tracked templates
        </span>
        <span className="inline-flex items-center gap-1 rounded-md border border-border bg-secondary px-2 py-0.5 text-[10.5px] text-muted-foreground">
          Filter by stack <ChevronDown className="h-3 w-3" />
        </span>
      </div>

      <div className="space-y-1.5 text-xs">
        {templates.map((item) => (
          <div
            key={item.name}
            className="flex items-center justify-between rounded-md border border-border/80 bg-secondary/30 px-2.5 py-1 text-[11.5px]"
          >
            <span className="truncate font-medium text-foreground">{item.name}</span>
            <div className="shrink-0 text-[10.5px]">
              {item.type === "popular" && (
                <span className="inline-flex items-center gap-1 rounded px-1.5 py-0.5 font-medium text-amber-500">
                  <Star className="h-3 w-3 fill-amber-500 text-amber-500" /> Popular
                </span>
              )}
              {item.type === "premium" && (
                <span className="inline-flex items-center gap-1 rounded px-1.5 py-0.5 font-medium text-muted-foreground">
                  <Lock className="h-3 w-3 text-foreground" /> Premium
                </span>
              )}
              {item.type === "free" && (
                <span className="inline-flex items-center rounded px-1.5 py-0.5 font-medium text-emerald-600 dark:text-emerald-400">
                  Free
                </span>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-3 rounded-md border border-border bg-background p-2 text-xs">
        <div className="grid grid-cols-3 gap-2 border-b border-border/60 pb-1 text-[9.5px] font-semibold tracking-wider text-muted-foreground uppercase">
          <span>Category</span>
          <span>Stack</span>
          <span className="text-right">Status</span>
        </div>
        <div className="mt-1.5 space-y-1">
          <div className="grid grid-cols-3 gap-2 items-center text-[11px]">
            <span className="truncate font-medium text-foreground">Landing Page</span>
            <span className="truncate text-muted-foreground font-mono text-[10px]">
              React+Tailwind
            </span>
            <span className="text-right font-medium text-emerald-600 dark:text-emerald-400">
              Free
            </span>
          </div>
          <div className="grid grid-cols-3 gap-2 items-center text-[11px]">
            <span className="truncate font-medium text-foreground">Dashboard</span>
            <span className="truncate text-muted-foreground font-mono text-[10px]">
              React+Recharts
            </span>
            <span className="text-right font-medium text-emerald-600 dark:text-emerald-400">
              Free
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

function SuggestedVisual() {
  const cards = [
    {
      text: "Design a modern SaaS landing page with dark theme, gradient headline, 3-tier pricing section, testimonials, and sticky navbar using Tailwind CSS",
      tool: "Works in v0",
    },
    {
      text: "Design a modern SaaS landing page with dark theme, gradient headline, 3-tier pricing section...",
      tool: "Works in Bolt",
    },
  ];
  const swayClass = ["animate-swipe-sway", "animate-swipe-sway-delay-1"];

  return (
    <div className="absolute inset-0">
      {cards.map((card, i) => (
        <div
          key={i}
          className={`absolute left-0 right-0 ${swayClass[i % swayClass.length]}`}
          style={{ top: `${i * 26}px` }}
        >
          <div
            className="rounded-lg border border-border bg-card p-3 shadow-sm"
            style={{ transform: `rotate(${i === 0 ? -1 : 1.2}deg)` }}
          >
            <div className="mb-2 flex items-center justify-between text-xs text-muted-foreground">
              <span className="flex items-center gap-1.5 font-medium text-foreground">
                <Copy className="h-3.5 w-3.5 text-primary" /> Copied prompts (12)
              </span>
              <Sparkles className="h-3.5 w-3.5 text-muted-foreground" />
            </div>
            <div className="text-xs font-normal leading-relaxed text-foreground">{card.text}</div>
            <div className="mt-2.5 flex flex-wrap gap-1.5 text-[10px]">
              <span className="rounded-md border border-border bg-secondary px-1.5 py-0.5 font-medium text-foreground">
                Auto-tested
              </span>
              <span className="rounded-md border border-primary/20 bg-primary/10 px-1.5 py-0.5 font-medium text-primary">
                {card.tool}
              </span>
              <span className="rounded-md border border-emerald-500/20 bg-emerald-500/10 px-1.5 py-0.5 font-medium text-emerald-600 dark:text-emerald-400">
                Production ready
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function BrandsVisual() {
  const tools = [
    {
      name: "v0 by Vercel",
      url: "v0.dev",
      icon: (
        <div
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[10px] border shadow-xs"
          style={{
            backgroundColor: "#000000",
            borderColor: "rgba(255, 255, 255, 0.15)",
          }}
        >
          <img
            src="https://v0.dev/favicon.ico"
            alt="v0 by Vercel"
            className="h-6 w-6 object-contain"
            referrerPolicy="no-referrer"
            onError={(e) => {
              // Fallback if network blocks favicon
              (e.currentTarget as HTMLElement).style.display = "none";
            }}
          />
        </div>
      ),
      action: (
        <span className="inline-flex items-center gap-1 rounded-md border border-border bg-secondary px-2 py-1 text-[11px] font-medium text-foreground hover:bg-secondary/80">
          <ArrowUpRight className="h-3 w-3 text-primary" /> Open now
        </span>
      ),
    },
    {
      name: "Bolt.new",
      url: "bolt.new",
      icon: (
        <div
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[10px] border shadow-xs"
          style={{
            backgroundColor: "#1c1400",
            borderColor: "rgba(251, 191, 36, 0.2)",
          }}
        >
          <img
            src="https://bolt.new/favicon.ico"
            alt="Bolt.new"
            className="h-6 w-6 object-contain"
            referrerPolicy="no-referrer"
            onError={(e) => {
              (e.currentTarget as HTMLElement).style.display = "none";
            }}
          />
        </div>
      ),
      action: (
        <span className="inline-flex items-center gap-1 rounded-md border border-border bg-secondary px-2 py-1 text-[11px] font-medium text-foreground hover:bg-secondary/80">
          <ArrowUpRight className="h-3 w-3 text-primary" /> Open now
        </span>
      ),
    },
    {
      name: "Lovable",
      url: "lovable.dev",
      icon: (
        <div
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[10px] border shadow-xs"
          style={{
            backgroundColor: "#2e1065",
            borderColor: "rgba(167, 139, 250, 0.25)",
          }}
        >
          <img
            src="https://lovable.dev/favicon.ico"
            alt="Lovable"
            className="h-6 w-6 object-contain"
            referrerPolicy="no-referrer"
            onError={(e) => {
              (e.currentTarget as HTMLElement).style.display = "none";
            }}
          />
        </div>
      ),
      action: (
        <span className="inline-flex items-center gap-1 rounded-md border border-emerald-500/20 bg-emerald-500/10 px-2 py-1 text-[11px] font-medium text-emerald-600 dark:text-emerald-400">
          <Check className="h-3 w-3" /> Connected
        </span>
      ),
    },
  ];

  return (
    <div className="absolute inset-0">
      <div className="absolute right-2 top-0 inline-flex items-center gap-1.5 rounded-md border border-border bg-card px-2 py-0.5 text-[11px] text-muted-foreground shadow-sm">
        AI Tools <span className="font-medium text-foreground">(3)</span>
      </div>
      {tools.map((r, i) => (
        <div
          key={r.name}
          className="absolute left-0 right-0 flex items-center justify-between rounded-lg border border-border bg-card p-2.5 shadow-sm"
          style={{ top: `${26 + i * 62}px`, transform: `rotate(${(i - 1) * 1}deg)` }}
        >
          <div className="flex items-center gap-3">
            {r.icon}
            <div className="text-xs">
              <div className="font-medium text-foreground">{r.name}</div>
              <div className="text-[11px] text-muted-foreground">{r.url}</div>
            </div>
          </div>
          {r.action}
        </div>
      ))}
    </div>
  );
}

function ModelsVisual() {
  const stacks = [
    { name: "React + Tailwind", checked: true },
    { name: "HTML + CSS + JS", checked: true },
    { name: "Next.js", checked: true },
    { name: "Vue.js", checked: false },
    { name: "Svelte", checked: false },
    { name: "React Native", checked: false },
    { name: "Framer", checked: false },
  ];
  return (
    <div className="absolute inset-x-0 top-0 rounded-lg border border-border bg-card p-3 shadow-sm">
      <div className="mb-2.5 flex items-center justify-between text-xs">
        <span className="flex items-center gap-1.5 font-medium text-foreground">
          <Settings className="h-3.5 w-3.5 text-primary" /> Stack filter
        </span>
        <span className="inline-flex items-center gap-1 rounded-md border border-border bg-secondary px-2 py-0.5 text-[10.5px] text-muted-foreground">
          Set category: <span className="font-medium text-foreground">All</span>{" "}
          <ChevronDown className="h-3 w-3" />
        </span>
      </div>
      <div className="space-y-1">
        {stacks.map((s) => (
          <div
            key={s.name}
            className={`flex items-center justify-between rounded-md px-2 py-1 text-xs transition-colors ${
              s.checked ? "bg-secondary/40" : "hover:bg-secondary/20"
            }`}
          >
            <span className="flex items-center gap-2">
              <span
                className={`flex h-4 w-4 items-center justify-center rounded border transition-colors ${
                  s.checked
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-muted-foreground/40 bg-background"
                }`}
              >
                {s.checked && <Check className="h-3 w-3 stroke-[2.5]" />}
              </span>
              <span
                className={`text-[11.5px] font-medium ${
                  s.checked ? "text-foreground" : "text-muted-foreground"
                }`}
              >
                {s.name}
              </span>
            </span>
            <span
              className={`h-2 w-2 rounded-full ${
                s.checked ? "bg-primary" : "bg-muted-foreground/30"
              }`}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

function SourcesVisual() {
  const exportsData = [
    {
      file: "hero-section",
      type: ".jsx",
      size: "4.2 KB",
      stack: "React",
      typeClass: "text-blue-500 bg-blue-500/10 border-blue-500/20",
    },
    {
      file: "dashboard-ui",
      type: ".jsx",
      size: "8.7 KB",
      stack: "React",
      typeClass: "text-blue-500 bg-blue-500/10 border-blue-500/20",
    },
    {
      file: "landing-page",
      type: ".html",
      size: "3.1 KB",
      stack: "HTML/CSS",
      typeClass: "text-amber-500 bg-amber-500/10 border-amber-500/20",
    },
    {
      file: "nav-component",
      type: ".jsx",
      size: "1.8 KB",
      stack: "React",
      typeClass: "text-blue-500 bg-blue-500/10 border-blue-500/20",
    },
  ];

  return (
    <div className="absolute inset-x-0 top-0 rounded-lg border border-border bg-card p-3 shadow-sm">
      <div className="mb-2.5 flex items-center justify-between text-xs">
        <span className="inline-flex items-center gap-1.5 rounded-md border border-border bg-background px-2 py-0.5 text-muted-foreground">
          <Search className="h-3 w-3 text-primary" /> Search exports
        </span>
        <span className="inline-flex items-center gap-1 rounded-md border border-border bg-secondary px-2 py-0.5 text-[10.5px] text-muted-foreground">
          All formats <ChevronDown className="h-3 w-3" />
        </span>
      </div>
      <table className="w-full text-xs">
        <thead className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
          <tr className="border-b border-border/80">
            <th className="pb-1.5 text-left font-medium">File</th>
            <th className="pb-1.5 text-left font-medium">Type</th>
            <th className="pb-1.5 text-right font-medium">Size</th>
            <th className="pb-1.5 text-right font-medium">Stack</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border/50 text-[11px]">
          {exportsData.map((r) => (
            <tr key={r.file} className="transition-colors hover:bg-secondary/30">
              <td className="py-1.5 font-mono font-medium text-foreground">{r.file}</td>
              <td className="py-1.5">
                <span
                  className={`inline-flex rounded border px-1.5 py-0.5 font-mono text-[10px] font-semibold ${r.typeClass}`}
                >
                  {r.type}
                </span>
              </td>
              <td className="py-1.5 text-right font-mono text-muted-foreground">{r.size}</td>
              <td className="py-1.5 text-right font-medium text-foreground">{r.stack}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function InsightsVisual() {
  const items = [
    "Change the colour scheme to match your brand",
    "Replace placeholder text with real content",
    "Add your logo and adjust the typography",
    "Connect your backend or CMS to the layout",
  ];
  return (
    <div className="absolute inset-0 space-y-1.5">
      {items.map((t, i) => (
        <div
          key={t}
          className={`group flex items-center justify-between rounded-lg border border-border p-2.5 text-xs transition-all duration-200 ${
            i === 0
              ? "bg-primary/10 border-primary/30 text-foreground font-medium"
              : "bg-card text-muted-foreground hover:text-foreground hover:bg-secondary/40"
          }`}
        >
          <span className="truncate pr-2">{t}</span>
          <ArrowRight className="h-3.5 w-3.5 shrink-0 text-primary transition-transform group-hover:translate-x-0.5" />
        </div>
      ))}
    </div>
  );
}

function Mini({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-md border border-border bg-secondary/40 px-1.5 py-1">
      <div className="text-[9px] uppercase tracking-wider text-muted-foreground">{label}</div>
      <div className="truncate text-[10px] font-medium">{value}</div>
    </div>
  );
}

function Testimonial() {
  return (
    <section className="border-y border-border bg-secondary/40 px-6 py-20">
      <div className="mx-auto max-w-3xl text-center">
        <Quote className="mx-auto h-6 w-6 text-muted-foreground" />
        <p className="mt-4 font-display text-2xl leading-relaxed tracking-tight md:text-3xl">
          “Writing prompts from scratch used to kill my momentum — which is why PromptUI is so
          valuable: it gives you the exact prompt that makes your AI tool actually work.”
        </p>
        <div className="mt-6 flex items-center justify-center gap-3">
          <div className="h-10 w-10 rounded-full bg-gradient-to-br from-amber-200 to-rose-300" />
          <div className="text-left text-sm">
            <div className="font-medium">Riley Chen</div>
            <div className="text-muted-foreground">Head of Growth, Northwind</div>
          </div>
        </div>
      </div>
    </section>
  );
}

function FAQ() {
  const items = [
    {
      q: "What exactly is LenxlUI?",
      a: "LenxlUI is a curated gallery of AI-generated web UI templates. Each template shows you a real design and gives you the exact AI prompt used to create it. Copy the prompt, paste it into v0, Bolt, or Lovable, and get a production-quality UI on the first try — no blank canvas, no prompt writing from scratch.",
    },
    {
      q: "Which AI tools does it work with?",
      a: "Right now LenxlUI works with v0 by Vercel, Bolt.new, and Lovable. Every template shows which tools it's been tested with. We're adding support for Cursor, Claude, and more tools very soon.",
    },
    {
      q: "How is this different from other design galleries?",
      a: "Other galleries show you the design but not how to build it. LenxlUI gives you the exact AI prompt behind every design — tested and ready to use. It's the layer between inspiration and execution that was always missing.",
    },
    {
      q: "Do I need a credit card to start?",
      a: "No. The free plan gives you access to 10 templates, copy any prompt, and open in AI — completely free, no card required. Upgrade to Pro only when you need more templates or code export.",
    },
    {
      q: "Can I export the code directly?",
      a: "Yes — Pro members can download clean, production-ready React + Tailwind code without needing to open any AI tool. Just download, drop into your project, and customise.",
    },
  ];
  return (
    <section className="px-6 py-24">
      <div className="mx-auto max-w-3xl">
        <div className="mb-10 text-center">
          <span className="inline-flex items-center gap-1.5 rounded-md border border-border bg-card px-2.5 py-1 text-xs text-muted-foreground">
            <HelpCircle className="h-3.5 w-3.5" /> FAQ
          </span>
          <h2 className="mt-5 text-4xl font-semibold tracking-tight md:text-5xl">
            Questions, answered.
          </h2>
        </div>
        <Accordion
          type="single"
          collapsible
          className="rounded-xl border border-border bg-card px-5"
        >
          {items.map((it, i) => (
            <AccordionItem key={i} value={`item-${i}`} className="border-border last:border-0">
              <AccordionTrigger className="text-left text-base font-medium">
                {it.q}
              </AccordionTrigger>
              <AccordionContent className="text-sm leading-relaxed text-muted-foreground">
                {it.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}

function Footer() {
  const cols = [
    {
      title: "Product",
      links: ["Features", "Pricing", "Changelog", "Roadmap", "Integrations"],
    },
    {
      title: "Company",
      links: ["About", "Careers", "Customers", "Press", "Contact"],
    },
    {
      title: "Resources",
      links: ["Blog", "Guides", "Help center", "API docs", "Status"],
    },
    {
      title: "Legal",
      links: ["Privacy", "Terms", "Security", "DPA", "Cookies"],
    },
  ];
  return (
    <footer className="border-t border-border bg-secondary/30">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid grid-cols-2 gap-10 md:grid-cols-6">
          <div className="col-span-2">
            <a href="/" className="flex items-center gap-2.5 font-semibold tracking-tight text-lg">
              <LenxlLogo size={28} />
              <span>lenxl</span>
            </a>
            <p className="mt-3 max-w-xs text-sm text-muted-foreground">
              AI search analytics for marketing teams that want to win the generative web.
            </p>
            <div className="mt-5 flex gap-2">
              {[Twitter, Github, Linkedin, Mail].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="card-lift inline-flex h-9 w-9 items-center justify-center rounded-md border border-border bg-card text-muted-foreground hover:text-foreground"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>
          {cols.map((c) => (
            <div key={c.title}>
              <div className="text-sm font-semibold">{c.title}</div>
              <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                {c.links.map((l) => (
                  <li key={l}>
                    <a href="#" className="hover:text-foreground">
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-border pt-6 text-xs text-muted-foreground md:flex-row">
          <span>© {new Date().getFullYear()} lenxl Labs, Inc. All rights reserved.</span>
          <span>Made for the AI-answer era.</span>
        </div>
      </div>
    </footer>
  );
}
