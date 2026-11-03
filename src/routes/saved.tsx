import { createFileRoute, Link } from "@tanstack/react-router";
import { Bookmark, Compass } from "lucide-react";
import { LibraryLayout } from "@/components/library/LibraryLayout";
import { TemplateCard } from "@/components/library/TemplateCard";
import { useTemplates } from "@/lib/templates-store";

export const Route = createFileRoute("/saved")({
  head: () => ({
    meta: [
      { title: "Saved Templates — LENZL" },
      {
        name: "description",
        content: "Your saved collection of curated AI prompts and web UI templates.",
      },
    ],
  }),
  component: SavedPage,
});

function SavedPage() {
  const { templates, savedIds } = useTemplates();

  const savedTemplates = templates.filter((t) => savedIds.includes(t.id));

  return (
    <LibraryLayout>
      {({ openTemplateModal }) => (
        <div className="space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-[#666666] dark:text-[#A1A1A1]">
                Your Collection
              </span>
              <h1 className="mt-1 text-2xl font-bold tracking-tight text-[#111111] dark:text-[#FFFFFF] sm:text-3xl">
                Saved Templates
              </h1>
              <p className="mt-1 text-xs text-[#666666] dark:text-[#A1A1A1]">
                Quickly access and copy prompts for all the templates you have bookmarked.
              </p>
            </div>

            <div className="rounded-full border border-[#E5E5E5] px-3 py-1 text-xs font-semibold text-[#111111] dark:border-[#222222] dark:text-[#FFFFFF]">
              {savedTemplates.length} {savedTemplates.length === 1 ? "Saved" : "Saved"}
            </div>
          </div>

          {/* Empty State or Grid */}
          {savedTemplates.length === 0 ? (
            <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-[#E5E5E5] py-24 text-center dark:border-[#222222]">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-neutral-100 text-neutral-500 dark:bg-neutral-900 dark:text-neutral-400">
                <Bookmark className="h-6 w-6" />
              </div>
              <h3 className="mt-4 text-lg font-semibold text-[#111111] dark:text-[#FFFFFF]">
                You haven&rsquo;t saved any templates yet.
              </h3>
              <p className="mt-1.5 max-w-sm text-xs text-[#666666] dark:text-[#A1A1A1]">
                Click the bookmark icon on any template card in the library to save it here for
                quick access.
              </p>
              <Link
                to="/explore"
                className="mt-6 inline-flex items-center gap-2 rounded-lg bg-[#111111] px-4 py-2.5 text-xs font-medium text-white transition-opacity hover:opacity-90 dark:bg-white dark:text-black"
              >
                <Compass className="h-4 w-4" />
                <span>Explore templates</span>
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4">
              {savedTemplates.map((template) => (
                <TemplateCard key={template.id} template={template} onSelect={openTemplateModal} />
              ))}
            </div>
          )}
        </div>
      )}
    </LibraryLayout>
  );
}
