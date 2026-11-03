import React, { useState } from "react";
import {
  X,
  Heart,
  Share2,
  Copy,
  Check,
  Bookmark,
  ExternalLink,
  Eye,
  Layers,
  Sparkles,
  Bot,
} from "lucide-react";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { type Template } from "@/lib/templates-data";
import { useTemplates } from "@/lib/templates-store";

interface TemplateDetailsModalProps {
  template: Template | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSelectRelated?: (template: Template) => void;
}

export function TemplateDetailsModal({
  template,
  open,
  onOpenChange,
  onSelectRelated,
}: TemplateDetailsModalProps) {
  const { templates, isSaved, toggleSave, isLiked, toggleLike, preferences } = useTemplates();
  const [copiedPrompt, setCopiedPrompt] = useState(false);

  if (!template) return null;

  const saved = isSaved(template.id);
  const liked = isLiked(template.id);

  const related = templates.filter((t) => t.id !== template.id).slice(0, 3);

  const handleCopyPrompt = () => {
    const promptText =
      preferences.copyFormat === "markdown"
        ? `### ${template.title} Prompt\n\n${template.prompt}`
        : template.prompt;

    navigator.clipboard?.writeText(promptText).then(
      () => {
        setCopiedPrompt(true);
        toast.success("Prompt copied to clipboard");
        setTimeout(() => setCopiedPrompt(false), 2000);
      },
      () => toast.error("Failed to copy prompt"),
    );
  };

  const handleShare = () => {
    const url = window.location.href;
    navigator.clipboard?.writeText(url).then(
      () => toast.success("Template link copied to clipboard!"),
      () => toast.error("Could not copy link"),
    );
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        showCloseButton={false}
        className="w-[94vw] max-w-5xl gap-0 overflow-hidden rounded-2xl border border-[#E5E5E5] bg-[#FFFFFF] p-0 shadow-2xl sm:w-[90vw] dark:border-[#222222] dark:bg-[#000000]"
      >
        <DialogTitle className="sr-only">{template.title}</DialogTitle>

        {/* Modal Top Header / Actions Bar */}
        <div className="flex items-center justify-between border-b border-[#E5E5E5] bg-[#FFFFFF] px-4 py-3 sm:px-6 dark:border-[#222222] dark:bg-[#000000]">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-[#E5E5E5] bg-neutral-100 px-2.5 py-0.5 text-xs font-medium text-neutral-800 dark:border-[#222222] dark:bg-[#080808] dark:text-neutral-200">
              <Layers className="h-3 w-3 text-neutral-500" />
              {template.category}
            </span>
            <span className="text-xs text-[#666666] dark:text-[#A1A1A1]">· {template.stack}</span>
          </div>

          <div className="flex items-center gap-2">
            {/* Like */}
            <button
              onClick={() => toggleLike(template.id)}
              className={`inline-flex items-center gap-1.5 rounded-md border px-3 py-1.5 text-xs font-medium transition-colors ${
                liked
                  ? "border-rose-500 bg-rose-500/10 text-rose-500"
                  : "border-[#E5E5E5] text-[#111111] hover:bg-neutral-100 dark:border-[#222222] dark:text-[#FFFFFF] dark:hover:bg-[#111111]"
              }`}
            >
              <Heart
                className={`h-3.5 w-3.5 transition-transform ${
                  liked ? "fill-current scale-110" : ""
                }`}
              />
              <span>{liked ? "Liked" : "Like"}</span>
              <span className="opacity-70">({template.likes})</span>
            </button>

            {/* Save */}
            <button
              onClick={() => {
                const nowSaved = toggleSave(template.id);
                if (nowSaved) toast.success("Saved to your collection");
                else toast.info("Removed from saved");
              }}
              className={`inline-flex items-center gap-1.5 rounded-md border px-3 py-1.5 text-xs font-medium transition-colors ${
                saved
                  ? "border-amber-500 bg-amber-500/10 text-amber-500"
                  : "border-[#E5E5E5] text-[#111111] hover:bg-neutral-100 dark:border-[#222222] dark:text-[#FFFFFF] dark:hover:bg-[#111111]"
              }`}
            >
              <Bookmark className={`h-3.5 w-3.5 ${saved ? "fill-current" : ""}`} />
              <span>{saved ? "Saved" : "Save"}</span>
            </button>

            {/* Share */}
            <button
              onClick={handleShare}
              title="Share template"
              className="inline-flex items-center gap-1.5 rounded-md border border-[#E5E5E5] px-2.5 py-1.5 text-xs font-medium text-[#111111] hover:bg-neutral-100 dark:border-[#222222] dark:text-[#FFFFFF] dark:hover:bg-[#111111]"
            >
              <Share2 className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Share</span>
            </button>

            {/* Close */}
            <button
              onClick={() => onOpenChange(false)}
              className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-[#E5E5E5] text-[#111111] hover:bg-neutral-100 dark:border-[#222222] dark:text-[#FFFFFF] dark:hover:bg-[#111111]"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="max-h-[85vh] overflow-y-auto">
          {/* Large 16:9 Preview */}
          <div
            className="relative w-full overflow-hidden bg-black"
            style={{ aspectRatio: "16 / 9" }}
          >
            {template.previewVideo ? (
              <video
                src={template.previewVideo}
                autoPlay
                loop
                muted
                playsInline
                controls
                poster={template.previewImage}
                className="absolute inset-0 h-full w-full object-cover"
              />
            ) : (
              <img
                src={template.previewImage}
                alt={template.title}
                className="absolute inset-0 h-full w-full object-cover"
              />
            )}
          </div>

          {/* Details & AI Prompt Section */}
          <div className="p-6 sm:p-8 space-y-8">
            {/* Header info */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <h1 className="text-2xl font-bold tracking-tight text-[#111111] dark:text-[#FFFFFF] sm:text-3xl">
                  {template.title}
                </h1>
                <div className="mt-2 flex items-center gap-3 text-sm text-[#666666] dark:text-[#A1A1A1]">
                  {template.authorAvatar && (
                    <img
                      src={template.authorAvatar}
                      alt={template.author}
                      className="h-6 w-6 rounded-full object-cover border border-[#E5E5E5] dark:border-[#222222]"
                    />
                  )}
                  <span>
                    by{" "}
                    <strong className="font-semibold text-[#111111] dark:text-[#FFFFFF]">
                      {template.author}
                    </strong>
                  </span>
                  {template.sourceUrl && (
                    <>
                      <span>·</span>
                      <a
                        href={template.sourceUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 text-xs text-[#888888] hover:text-[#111111] dark:hover:text-[#FFFFFF] transition-colors"
                      >
                        <span>{template.authorAttribution || "View Reference"}</span>
                        <ExternalLink className="h-2.5 w-2.5 opacity-60" />
                      </a>
                    </>
                  )}
                  <span>·</span>
                  <span>{template.createdAt}</span>
                </div>
              </div>

              {/* Price & Views */}
              <div className="flex items-center gap-3 sm:flex-col sm:items-end">
                <div
                  className={`text-2xl font-bold ${
                    template.price === "Free"
                      ? "text-emerald-600 dark:text-emerald-400"
                      : "text-[#111111] dark:text-[#FFFFFF]"
                  }`}
                >
                  {template.price}
                </div>
                <div className="flex items-center gap-1.5 text-xs text-[#666666] dark:text-[#A1A1A1]">
                  <Eye className="h-3.5 w-3.5" />
                  <span>{template.views.toLocaleString()} views</span>
                </div>
              </div>
            </div>

            {/* Description */}
            <div>
              <h2 className="text-xs font-semibold uppercase tracking-wider text-[#666666] dark:text-[#A1A1A1]">
                About this template
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-[#111111] dark:text-[#E0E0E0]">
                {template.description}
              </p>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              {template.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-md border border-[#E5E5E5] bg-neutral-50 px-2.5 py-1 text-xs text-[#666666] dark:border-[#222222] dark:bg-[#050505] dark:text-[#A1A1A1]"
                >
                  #{tag}
                </span>
              ))}
            </div>

            {/* AI PROMPT SECTION (Dedicated, clean, high-contrast) */}
            <div className="rounded-xl border border-[#E5E5E5] bg-[#FAFAFA] p-5 dark:border-[#222222] dark:bg-[#050505]">
              <div className="flex items-center justify-between pb-3 border-b border-[#E5E5E5] dark:border-[#222222]">
                <div className="flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-purple-500" />
                  <span className="text-sm font-semibold text-[#111111] dark:text-[#FFFFFF]">
                    AI Prompt
                  </span>
                </div>

                <button
                  onClick={handleCopyPrompt}
                  className="inline-flex items-center gap-1.5 rounded-md bg-[#111111] px-3.5 py-1.5 text-xs font-medium text-white transition-opacity hover:opacity-90 dark:bg-white dark:text-black"
                >
                  {copiedPrompt ? (
                    <>
                      <Check className="h-3.5 w-3.5 text-emerald-400 dark:text-emerald-600" />
                      <span>Copied ✓</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-3.5 w-3.5" />
                      <span>Copy Prompt</span>
                    </>
                  )}
                </button>
              </div>

              {/* Complete Prompt Box */}
              <div className="mt-4 rounded-lg border border-[#E5E5E5] bg-[#FFFFFF] p-4 font-mono text-xs leading-relaxed text-[#111111] select-all dark:border-[#222222] dark:bg-[#080808] dark:text-neutral-200">
                {template.prompt}
              </div>

              {/* Direct tool launch suggestions */}
              <div className="mt-4 flex flex-wrap items-center gap-2 pt-2">
                <span className="text-xs text-[#666666] dark:text-[#A1A1A1]">
                  Test this prompt directly in:
                </span>
                <a
                  href="https://v0.dev"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 rounded border border-[#E5E5E5] bg-white px-2 py-1 text-[11px] font-medium text-[#111111] hover:bg-neutral-100 dark:border-[#222222] dark:bg-[#080808] dark:text-white dark:hover:bg-[#111111]"
                >
                  v0 by Vercel <ExternalLink className="h-2.5 w-2.5 opacity-50" />
                </a>
                <a
                  href="https://bolt.new"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 rounded border border-[#E5E5E5] bg-white px-2 py-1 text-[11px] font-medium text-[#111111] hover:bg-neutral-100 dark:border-[#222222] dark:bg-[#080808] dark:text-white dark:hover:bg-[#111111]"
                >
                  Bolt.new <ExternalLink className="h-2.5 w-2.5 opacity-50" />
                </a>
                <a
                  href="https://lovable.dev"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 rounded border border-[#E5E5E5] bg-white px-2 py-1 text-[11px] font-medium text-[#111111] hover:bg-neutral-100 dark:border-[#222222] dark:bg-[#080808] dark:text-white dark:hover:bg-[#111111]"
                >
                  Lovable <ExternalLink className="h-2.5 w-2.5 opacity-50" />
                </a>
              </div>
            </div>

            {/* Related templates */}
            {related.length > 0 && (
              <div className="pt-4 border-t border-[#E5E5E5] dark:border-[#222222]">
                <h3 className="text-sm font-semibold text-[#111111] dark:text-[#FFFFFF]">
                  More like this
                </h3>
                <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-3">
                  {related.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => onSelectRelated && onSelectRelated(item)}
                      className="group flex items-center gap-3 rounded-lg border border-[#E5E5E5] bg-[#FFFFFF] p-2 text-left transition-colors hover:border-[#111111]/40 dark:border-[#222222] dark:bg-[#050505] dark:hover:border-[#444444]"
                    >
                      <div className="h-12 w-16 shrink-0 overflow-hidden rounded bg-neutral-200 dark:bg-neutral-900">
                        <img
                          src={item.previewImage}
                          alt={item.title}
                          className="h-full w-full object-cover transition-transform group-hover:scale-105"
                        />
                      </div>
                      <div className="min-w-0">
                        <div className="truncate text-xs font-semibold text-[#111111] dark:text-[#FFFFFF]">
                          {item.title}
                        </div>
                        <div className="text-[11px] text-[#666666] dark:text-[#A1A1A1]">
                          {item.price} · {item.category}
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
