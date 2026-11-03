import React, { useState, useRef } from "react";
import { Copy, Check, Bookmark, Heart } from "lucide-react";
import { toast } from "sonner";
import { type Template } from "@/lib/templates-data";
import { useTemplates } from "@/lib/templates-store";

interface TemplateCardProps {
  template: Template;
  onSelect: (template: Template) => void;
}

export function TemplateCard({ template, onSelect }: TemplateCardProps) {
  const { isSaved, toggleSave, isLiked, toggleLike, preferences } = useTemplates();
  const [copied, setCopied] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const saved = isSaved(template.id);
  const liked = isLiked(template.id);

  const handleCopyPrompt = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();

    const promptText =
      preferences.copyFormat === "markdown"
        ? `### ${template.title} Prompt\n\n${template.prompt}`
        : template.prompt;

    navigator.clipboard?.writeText(promptText).then(
      () => {
        setCopied(true);
        toast.success("Prompt copied to clipboard");
        setTimeout(() => setCopied(false), 2000);
      },
      () => {
        toast.error("Failed to copy prompt");
      },
    );
  };

  const handleToggleSave = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    const willBeSaved = toggleSave(template.id);
    if (willBeSaved) {
      toast.success(`Saved "${template.title}" to library`);
    } else {
      toast.info(`Removed "${template.title}" from saved`);
    }
  };

  const handleToggleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    const willBeLiked = toggleLike(template.id);
    if (willBeLiked) {
      toast.success("Liked template");
    }
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (videoRef.current && preferences.autoplayVideo) {
      videoRef.current.play().catch(() => {});
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (videoRef.current) {
      videoRef.current.pause();
    }
  };

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={() => onSelect(template)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onSelect(template);
        }
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="group relative flex cursor-pointer flex-col overflow-hidden rounded-[14px] border border-[#E5E5E5] bg-[#FFFFFF] text-left transition-all duration-300 ease-out hover:-translate-y-1 hover:border-[#111111]/30 hover:shadow-xl dark:border-[#222222] dark:bg-[#050505] dark:hover:border-[#444444]"
    >
      {/* 16:9 Preview */}
      <div
        className="relative w-full overflow-hidden bg-[#F3F4F6] dark:bg-[#111111]"
        style={{ aspectRatio: "16 / 9" }}
      >
        {template.previewVideo ? (
          <video
            ref={videoRef}
            src={template.previewVideo}
            muted
            loop
            playsInline
            preload="metadata"
            poster={template.previewImage}
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
          />
        ) : (
          <img
            src={template.previewImage}
            alt={template.title}
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
          />
        )}

        {/* Subtle hover overlay */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

        {/* Top Floating Actions: Save & Like */}
        <div className="absolute top-2.5 right-2.5 flex items-center gap-1.5 opacity-90 transition-opacity duration-200 group-hover:opacity-100">
          <button
            onClick={handleToggleLike}
            title={liked ? "Unlike" : "Like"}
            aria-label="Like template"
            className={`flex h-8 w-8 items-center justify-center rounded-full border backdrop-blur-md transition-all duration-200 ${
              liked
                ? "border-rose-500 bg-rose-500 text-white shadow-md scale-105"
                : "border-black/10 bg-white/90 text-neutral-800 hover:bg-white dark:border-white/20 dark:bg-black/75 dark:text-neutral-200 dark:hover:bg-black"
            }`}
          >
            <Heart
              className={`h-4 w-4 transition-transform duration-200 ${
                liked ? "fill-current scale-110" : ""
              }`}
            />
          </button>

          <button
            onClick={handleToggleSave}
            title={saved ? "Remove from saved" : "Save template"}
            aria-label="Save template"
            className={`flex h-8 w-8 items-center justify-center rounded-full border backdrop-blur-md transition-all duration-200 ${
              saved
                ? "border-amber-500 bg-amber-500 text-white shadow-md scale-105"
                : "border-black/10 bg-white/90 text-neutral-800 hover:bg-white dark:border-white/20 dark:bg-black/75 dark:text-neutral-200 dark:hover:bg-black"
            }`}
          >
            <Bookmark
              className={`h-4 w-4 transition-transform duration-200 ${
                saved ? "fill-current scale-110" : ""
              }`}
            />
          </button>
        </div>

        {/* Floating Copy Prompt Button */}
        <div className="absolute bottom-2.5 right-2.5">
          <button
            onClick={handleCopyPrompt}
            aria-label="Copy prompt"
            className="inline-flex items-center gap-1.5 rounded-full bg-[#111111] px-3 py-1.5 text-[11px] font-medium text-white shadow-lg transition-all duration-200 hover:bg-neutral-800 active:scale-95 dark:bg-white dark:text-black dark:hover:bg-neutral-200"
          >
            {copied ? (
              <>
                <Check className="h-3 w-3 text-emerald-400 dark:text-emerald-600" />
                <span>Copied ✓</span>
              </>
            ) : (
              <>
                <Copy className="h-3 w-3" />
                <span>Copy Prompt</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Card Info */}
      <div className="flex items-center justify-between gap-3 px-3.5 py-3">
        <div className="min-w-0">
          <h3 className="truncate text-sm font-semibold text-[#111111] dark:text-[#FFFFFF]">
            {template.title}
          </h3>
          <p className="truncate text-xs text-[#666666] dark:text-[#A1A1A1]">{template.stack}</p>
        </div>

        <div className="shrink-0 text-right">
          <span
            className={`text-xs font-semibold ${
              template.price === "Free"
                ? "text-emerald-600 dark:text-emerald-400 font-medium"
                : "text-[#111111] dark:text-[#FFFFFF]"
            }`}
          >
            {template.price}
          </span>
        </div>
      </div>
    </div>
  );
}
