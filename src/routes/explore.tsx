import { createFileRoute } from "@tanstack/react-router";
import { useMemo } from "react";
import { SearchX } from "lucide-react";
import { LibraryLayout } from "@/components/library/LibraryLayout";
import { LibraryFilterBar } from "@/components/library/LibraryFilterBar";
import { LibraryOverviewBar } from "@/components/library/LibraryOverviewBar";
import { TemplateCard } from "@/components/library/TemplateCard";
import { useTemplates } from "@/lib/templates-store";

export const Route = createFileRoute("/explore")({
  head: () => ({
    meta: [
      { title: "Explore Templates — LENZL" },
      {
        name: "description",
        content:
          "Browse curated AI prompt web templates for React, Tailwind, Next.js, and HTML/CSS. Copy the prompt and build instantly in v0, Bolt, or Lovable.",
      },
    ],
  }),
  component: ExplorePage,
});

function ExplorePage() {
  const {
    templates,
    searchQuery,
    setSearchQuery,
    selectedType,
    selectedCategory,
    selectedStack,
    clearFilters,
  } = useTemplates();

  // Filter logic
  const filteredTemplates = useMemo(() => {
    return templates.filter((template) => {
      // Free / Premium filter
      if (selectedType === "Free" && template.isPremium) return false;
      if (selectedType === "Premium" && !template.isPremium) return false;

      // Category filter
      if (
        selectedCategory !== "All Categories" &&
        template.category.toLowerCase() !== selectedCategory.toLowerCase()
      ) {
        return false;
      }

      // Stack filter
      if (
        selectedStack !== "All Stacks" &&
        !template.stack.toLowerCase().includes(selectedStack.toLowerCase())
      ) {
        return false;
      }

      // Search query filter (matches name, description, category, author, stack, tags)
      if (searchQuery.trim().length > 0) {
        const query = searchQuery.toLowerCase().trim();
        const matchesName = template.title.toLowerCase().includes(query);
        const matchesDesc = template.description.toLowerCase().includes(query);
        const matchesCat = template.category.toLowerCase().includes(query);
        const matchesAuthor = template.author.toLowerCase().includes(query);
        const matchesStack = template.stack.toLowerCase().includes(query);
        const matchesTags = template.tags.some((t) => t.toLowerCase().includes(query));

        if (
          !matchesName &&
          !matchesDesc &&
          !matchesCat &&
          !matchesAuthor &&
          !matchesStack &&
          !matchesTags
        ) {
          return false;
        }
      }

      return true;
    });
  }, [templates, selectedType, selectedCategory, selectedStack, searchQuery]);

  return (
    <LibraryLayout>
      {({ openTemplateModal }) => (
        <div>
          {/* Top Filter Bar */}
          <LibraryFilterBar />

          {/* Overview status bar */}
          <LibraryOverviewBar />

          {/* Search Active Indicator / Results info */}
          {searchQuery && (
            <div className="mb-4 flex items-center justify-between text-xs text-[#666666] dark:text-[#A1A1A1]">
              <span>
                Search results for &ldquo;
                <strong className="text-[#111111] dark:text-[#FFFFFF]">{searchQuery}</strong>
                &rdquo; ({filteredTemplates.length})
              </span>
              <button
                onClick={() => setSearchQuery("")}
                className="text-xs underline hover:text-[#111111] dark:hover:text-[#FFFFFF]"
              >
                Clear search
              </button>
            </div>
          )}

          {/* Template Grid or Empty State */}
          {filteredTemplates.length === 0 ? (
            <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-[#E5E5E5] py-20 text-center dark:border-[#222222]">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-neutral-100 dark:bg-neutral-900">
                <SearchX className="h-6 w-6 text-[#888888]" />
              </div>
              <h3 className="mt-4 text-base font-semibold text-[#111111] dark:text-[#FFFFFF]">
                No templates found
              </h3>
              <p className="mt-1.5 max-w-sm text-xs text-[#666666] dark:text-[#A1A1A1]">
                We couldn&rsquo;t find any templates matching your search criteria or filters.
              </p>
              <button
                onClick={clearFilters}
                className="mt-5 rounded-md bg-[#111111] px-4 py-2 text-xs font-medium text-white transition-opacity hover:opacity-90 dark:bg-white dark:text-black"
              >
                Clear search &amp; filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4">
              {filteredTemplates.map((template) => (
                <TemplateCard key={template.id} template={template} onSelect={openTemplateModal} />
              ))}
            </div>
          )}
        </div>
      )}
    </LibraryLayout>
  );
}
