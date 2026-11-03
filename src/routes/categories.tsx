import { createFileRoute, useNavigate } from "@tanstack/react-router";
import {
  Layers,
  LayoutDashboard,
  Compass,
  ShoppingBag,
  Bot,
  Smartphone,
  Briefcase,
  TrendingUp,
  BarChart2,
  ShieldCheck,
  Terminal,
  ArrowRight,
} from "lucide-react";
import { LibraryLayout } from "@/components/library/LibraryLayout";
import { useTemplates } from "@/lib/templates-store";

export const Route = createFileRoute("/categories")({
  head: () => ({
    meta: [
      { title: "Browse Categories — LENZL" },
      {
        name: "description",
        content:
          "Explore templates by category: SaaS, Dashboards, Landing Pages, Mobile Apps, AI, Fintech, and more.",
      },
    ],
  }),
  component: CategoriesPage,
});

interface CategoryCardInfo {
  name: string;
  categoryFilterKey: string;
  icon: React.ComponentType<{ className?: string }>;
  description: string;
  color: string;
}

const CATEGORY_LIST: CategoryCardInfo[] = [
  {
    name: "SaaS",
    categoryFilterKey: "SaaS",
    icon: Layers,
    description: "Multi-tenant platforms, pricing tiers, auth flows, and conversion landing pages.",
    color: "from-blue-500/10 to-indigo-500/10",
  },
  {
    name: "Dashboards",
    categoryFilterKey: "Dashboard",
    icon: LayoutDashboard,
    description:
      "KPI metrics, multi-series data charts, control centers, and workspace dashboards.",
    color: "from-cyan-500/10 to-blue-500/10",
  },
  {
    name: "Landing Pages",
    categoryFilterKey: "Landing Page",
    icon: Compass,
    description: "High-converting product launches, pre-launch waitlists, and company homepages.",
    color: "from-purple-500/10 to-pink-500/10",
  },
  {
    name: "E-commerce",
    categoryFilterKey: "E-commerce",
    icon: ShoppingBag,
    description:
      "Product catalogs, slide-over cart drawers, checkout summaries, and luxury storefronts.",
    color: "from-emerald-500/10 to-teal-500/10",
  },
  {
    name: "AI & LLM Tools",
    categoryFilterKey: "AI",
    icon: Bot,
    description:
      "Streaming chat interfaces, model selectors, prompt bars, and generative UI workspaces.",
    color: "from-violet-500/10 to-purple-500/10",
  },
  {
    name: "Mobile Apps",
    categoryFilterKey: "Mobile",
    icon: Smartphone,
    description:
      "Mobile web applications, responsive phone mockups, and mobile app download pages.",
    color: "from-amber-500/10 to-orange-500/10",
  },
  {
    name: "Portfolios",
    categoryFilterKey: "Portfolio",
    icon: Briefcase,
    description: "Minimalist developer resumes, agency case studies, and creative showcase grids.",
    color: "from-rose-500/10 to-red-500/10",
  },
  {
    name: "Fintech",
    categoryFilterKey: "Fintech",
    icon: TrendingUp,
    description: "Digital banking, transaction histories, crypto trackers, and budget planners.",
    color: "from-emerald-500/10 to-green-500/10",
  },
  {
    name: "Analytics",
    categoryFilterKey: "Analytics",
    icon: BarChart2,
    description:
      "Traffic insights, retention heatmaps, event funnels, and real-time query monitors.",
    color: "from-indigo-500/10 to-violet-500/10",
  },
  {
    name: "Admin Panels",
    categoryFilterKey: "Admin",
    icon: ShieldCheck,
    description: "Data management tables, member permissions, audit logs, and settings portals.",
    color: "from-neutral-500/10 to-stone-500/10",
  },
  {
    name: "Developer Tools",
    categoryFilterKey: "Developer Tools",
    icon: Terminal,
    description: "Interactive documentation, API playgrounds, CLI references, and dev consoles.",
    color: "from-sky-500/10 to-cyan-500/10",
  },
];

function CategoriesPage() {
  const navigate = useNavigate();
  const { templates, setSelectedCategory } = useTemplates();

  const handleSelectCategory = (catKey: string) => {
    setSelectedCategory(catKey);
    navigate({ to: "/explore" });
  };

  return (
    <LibraryLayout>
      {() => (
        <div className="space-y-6">
          {/* Header */}
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-[#666666] dark:text-[#A1A1A1]">
              Browse by Type
            </span>
            <h1 className="mt-1 text-2xl font-bold tracking-tight text-[#111111] dark:text-[#FFFFFF] sm:text-3xl">
              Template Categories
            </h1>
            <p className="mt-1 text-xs text-[#666666] dark:text-[#A1A1A1]">
              Select a category to filter the template library and discover prompts tailored to your
              product.
            </p>
          </div>

          {/* Categories Grid */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {CATEGORY_LIST.map((item) => {
              const Icon = item.icon;
              const count = templates.filter(
                (t) => t.category.toLowerCase() === item.categoryFilterKey.toLowerCase(),
              ).length;

              return (
                <button
                  key={item.name}
                  onClick={() => handleSelectCategory(item.categoryFilterKey)}
                  className="group relative flex flex-col justify-between overflow-hidden rounded-xl border border-[#E5E5E5] bg-[#FFFFFF] p-5 text-left transition-all duration-200 hover:-translate-y-0.5 hover:border-[#111111]/40 hover:shadow-md dark:border-[#222222] dark:bg-[#050505] dark:hover:border-[#444444]"
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-[#E5E5E5] bg-neutral-50 text-[#111111] dark:border-[#222222] dark:bg-[#080808] dark:text-[#FFFFFF]">
                        <Icon className="h-5 w-5" />
                      </div>
                      <span className="rounded-full border border-[#E5E5E5] px-2 py-0.5 text-[10px] font-semibold text-[#666666] dark:border-[#222222] dark:text-[#A1A1A1]">
                        {count} {count === 1 ? "template" : "templates"}
                      </span>
                    </div>

                    <h3 className="mt-4 text-base font-semibold text-[#111111] dark:text-[#FFFFFF]">
                      {item.name}
                    </h3>
                    <p className="mt-1.5 text-xs leading-relaxed text-[#666666] dark:text-[#A1A1A1]">
                      {item.description}
                    </p>
                  </div>

                  <div className="mt-5 flex items-center gap-1.5 text-xs font-medium text-[#111111] group-hover:translate-x-1 transition-transform dark:text-[#FFFFFF]">
                    <span>Explore {item.name}</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </LibraryLayout>
  );
}
