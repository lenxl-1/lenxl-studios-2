import { createFileRoute, useNavigate } from "@tanstack/react-router";
import React, { useState } from "react";
import {
  Upload,
  Sparkles,
  Image as ImageIcon,
  Video,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";
import { toast } from "sonner";
import { LibraryLayout } from "@/components/library/LibraryLayout";
import { useTemplates } from "@/lib/templates-store";
import { CATEGORIES, STACKS } from "@/lib/templates-data";

export const Route = createFileRoute("/submit")({
  head: () => ({
    meta: [
      { title: "Submit a Template — LENZL" },
      {
        name: "description",
        content: "Submit your custom AI prompt template to the LENZL library.",
      },
    ],
  }),
  component: SubmitPage,
});

const SAMPLE_PRESETS = [
  {
    title: "Dark Minimalist SaaS",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&auto=format&fit=crop&q=70",
    video: "https://cdn.dribbble.com/userupload/47775769/file/814cf81f46a91ed258f093fd0577df99.mp4",
  },
  {
    title: "Fintech Dashboard",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&q=80",
    video:
      "https://cdn.dribbble.com/userupload/43898638/file/original-1971d8b552b526fed60a6bdba6c8ef59.mp4",
  },
  {
    title: "AI Studio Workspace",
    image: "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=600&q=80",
    video: "https://cdn.dribbble.com/userupload/48015410/file/246fee6ef2dac18d5e530eb185aad155.mp4",
  },
];

function SubmitPage() {
  const navigate = useNavigate();
  const { addTemplate, userProfile } = useTemplates();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Landing Page");
  const [stack, setStack] = useState("React + Tailwind");
  const [isPremium, setIsPremium] = useState(false);
  const [priceValue, setPriceValue] = useState("$9");
  const [tagsInput, setTagsInput] = useState("React, Tailwind, Modern");
  const [previewImage, setPreviewImage] = useState(
    "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&auto=format&fit=crop&q=70",
  );
  const [previewVideo, setPreviewVideo] = useState("");
  const [prompt, setPrompt] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim()) {
      toast.error("Template name is required");
      return;
    }
    if (!description.trim()) {
      toast.error("Description is required");
      return;
    }
    if (!prompt.trim()) {
      toast.error("AI Prompt is required");
      return;
    }

    setSubmitting(true);

    const tags = tagsInput
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);

    try {
      const created = addTemplate({
        title: title.trim(),
        description: description.trim(),
        author: userProfile.name,
        authorAvatar: userProfile.avatar,
        previewImage: previewImage.trim() || SAMPLE_PRESETS[0].image,
        previewVideo: previewVideo.trim() || undefined,
        prompt: prompt.trim(),
        category,
        stack,
        tags: tags.length > 0 ? tags : [category, stack],
        price: isPremium ? (priceValue.startsWith("$") ? priceValue : `$${priceValue}`) : "Free",
        isPremium,
      });

      toast.success(`Template "${created.title}" added to library!`);
      setTimeout(() => {
        navigate({ to: "/explore" });
      }, 500);
    } catch {
      toast.error("Failed to submit template");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <LibraryLayout>
      {() => (
        <div className="mx-auto max-w-3xl space-y-8">
          {/* Header */}
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-[#666666] dark:text-[#A1A1A1]">
              Contribute
            </span>
            <h1 className="mt-1 text-2xl font-bold tracking-tight text-[#111111] dark:text-[#FFFFFF] sm:text-3xl">
              Submit a Template
            </h1>
            <p className="mt-1 text-xs text-[#666666] dark:text-[#A1A1A1]">
              Share an AI-generated UI template and its tested prompt with the LENZL designer
              community.
            </p>
          </div>

          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className="space-y-6 rounded-2xl border border-[#E5E5E5] bg-[#FFFFFF] p-6 shadow-sm dark:border-[#222222] dark:bg-[#050505] sm:p-8"
          >
            {/* Author Attribution Card */}
            <div className="flex items-center gap-3 rounded-xl border border-[#E5E5E5] bg-neutral-50 p-3.5 dark:border-[#222222] dark:bg-[#080808]">
              <img
                src={userProfile.avatar}
                alt={userProfile.name}
                className="h-10 w-10 rounded-full object-cover border border-[#E5E5E5] dark:border-[#333333]"
              />
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold text-[#111111] dark:text-[#FFFFFF]">
                    {userProfile.name}
                  </span>
                  <span className="rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] font-medium text-emerald-600 dark:text-emerald-400">
                    Logged In
                  </span>
                </div>
                <div className="text-[11px] text-[#666666] dark:text-[#A1A1A1]">
                  Submitting from account: {userProfile.email}
                </div>
              </div>
            </div>

            {/* Template Name & Pricing row */}
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-[#111111] dark:text-[#FFFFFF]">
                  Template Name *
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Modern AI Workspace"
                  className="w-full rounded-lg border border-[#E5E5E5] bg-[#FFFFFF] px-3.5 py-2.5 text-xs text-[#111111] placeholder-[#888888] focus:border-[#111111] focus:outline-none dark:border-[#222222] dark:bg-[#080808] dark:text-[#FFFFFF]"
                />
              </div>

              {/* Price Type */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-[#111111] dark:text-[#FFFFFF]">
                  Pricing Tier
                </label>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setIsPremium(false)}
                    className={`flex-1 rounded-lg border py-2.5 text-xs font-medium transition-colors ${
                      !isPremium
                        ? "border-[#111111] bg-[#111111] text-white dark:border-white dark:bg-white dark:text-black"
                        : "border-[#E5E5E5] bg-[#FFFFFF] text-[#666666] dark:border-[#222222] dark:bg-[#080808] dark:text-[#A1A1A1]"
                    }`}
                  >
                    Free
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsPremium(true)}
                    className={`flex-1 rounded-lg border py-2.5 text-xs font-medium transition-colors ${
                      isPremium
                        ? "border-[#111111] bg-[#111111] text-white dark:border-white dark:bg-white dark:text-black"
                        : "border-[#E5E5E5] bg-[#FFFFFF] text-[#666666] dark:border-[#222222] dark:bg-[#080808] dark:text-[#A1A1A1]"
                    }`}
                  >
                    Premium
                  </button>
                  {isPremium && (
                    <input
                      type="text"
                      value={priceValue}
                      onChange={(e) => setPriceValue(e.target.value)}
                      placeholder="$9"
                      className="w-20 rounded-lg border border-[#E5E5E5] bg-[#FFFFFF] px-2.5 py-2.5 text-xs text-[#111111] text-center dark:border-[#222222] dark:bg-[#080808] dark:text-[#FFFFFF]"
                    />
                  )}
                </div>
              </div>
            </div>

            {/* Category & Stack */}
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-[#111111] dark:text-[#FFFFFF]">
                  Category
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full rounded-lg border border-[#E5E5E5] bg-[#FFFFFF] px-3 py-2.5 text-xs text-[#111111] dark:border-[#222222] dark:bg-[#080808] dark:text-[#FFFFFF]"
                >
                  {CATEGORIES.filter((c) => c !== "All Categories").map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-[#111111] dark:text-[#FFFFFF]">
                  Tech Stack
                </label>
                <select
                  value={stack}
                  onChange={(e) => setStack(e.target.value)}
                  className="w-full rounded-lg border border-[#E5E5E5] bg-[#FFFFFF] px-3 py-2.5 text-xs text-[#111111] dark:border-[#222222] dark:bg-[#080808] dark:text-[#FFFFFF]"
                >
                  {STACKS.filter((s) => s !== "All Stacks").map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Description */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-[#111111] dark:text-[#FFFFFF]">
                Description *
              </label>
              <textarea
                required
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Briefly describe what this UI template features and what makes it special..."
                className="w-full rounded-lg border border-[#E5E5E5] bg-[#FFFFFF] p-3 text-xs text-[#111111] placeholder-[#888888] focus:border-[#111111] focus:outline-none dark:border-[#222222] dark:bg-[#080808] dark:text-[#FFFFFF]"
              />
            </div>

            {/* AI Prompt (Crucial) */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="flex items-center gap-1.5 text-xs font-semibold text-[#111111] dark:text-[#FFFFFF]">
                  <Sparkles className="h-3.5 w-3.5 text-purple-500" />
                  <span>Tested AI Prompt *</span>
                </label>
                <span className="text-[11px] text-[#888888]">Tested for v0, Bolt, and Lovable</span>
              </div>
              <textarea
                required
                rows={4}
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Paste the exact prompt that yields this UI in v0, Bolt, or Lovable..."
                className="w-full font-mono rounded-lg border border-[#E5E5E5] bg-[#FFFFFF] p-3 text-xs leading-relaxed text-[#111111] placeholder-[#888888] focus:border-[#111111] focus:outline-none dark:border-[#222222] dark:bg-[#080808] dark:text-[#FFFFFF]"
              />
            </div>

            {/* Media: Preview Image & Video */}
            <div className="space-y-4 border-t border-[#E5E5E5] pt-5 dark:border-[#222222]">
              <div className="text-xs font-semibold text-[#111111] dark:text-[#FFFFFF]">
                Preview Media (16:9)
              </div>

              {/* Sample Presets Quick Select */}
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-[11px] text-[#666666] dark:text-[#A1A1A1]">
                  Preset templates:
                </span>
                {SAMPLE_PRESETS.map((preset) => (
                  <button
                    key={preset.title}
                    type="button"
                    onClick={() => {
                      setPreviewImage(preset.image);
                      setPreviewVideo(preset.video);
                      toast.info(`Loaded preset media for ${preset.title}`);
                    }}
                    className="rounded border border-[#E5E5E5] bg-neutral-100 px-2 py-1 text-[10px] font-medium text-neutral-800 hover:bg-neutral-200 dark:border-[#222222] dark:bg-[#080808] dark:text-neutral-200 dark:hover:bg-[#161616]"
                  >
                    {preset.title}
                  </button>
                ))}
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-1">
                  <label className="flex items-center gap-1.5 text-xs text-[#666666] dark:text-[#A1A1A1]">
                    <ImageIcon className="h-3.5 w-3.5" />
                    <span>Preview Image URL</span>
                  </label>
                  <input
                    type="url"
                    value={previewImage}
                    onChange={(e) => setPreviewImage(e.target.value)}
                    placeholder="https://..."
                    className="w-full rounded-lg border border-[#E5E5E5] bg-[#FFFFFF] px-3 py-2 text-xs text-[#111111] dark:border-[#222222] dark:bg-[#080808] dark:text-[#FFFFFF]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="flex items-center gap-1.5 text-xs text-[#666666] dark:text-[#A1A1A1]">
                    <Video className="h-3.5 w-3.5" />
                    <span>Preview MP4 Video URL (Optional)</span>
                  </label>
                  <input
                    type="url"
                    value={previewVideo}
                    onChange={(e) => setPreviewVideo(e.target.value)}
                    placeholder="https://...mp4"
                    className="w-full rounded-lg border border-[#E5E5E5] bg-[#FFFFFF] px-3 py-2 text-xs text-[#111111] dark:border-[#222222] dark:bg-[#080808] dark:text-[#FFFFFF]"
                  />
                </div>
              </div>

              {/* Tags */}
              <div className="space-y-1">
                <label className="text-xs text-[#666666] dark:text-[#A1A1A1]">
                  Tags (comma separated)
                </label>
                <input
                  type="text"
                  value={tagsInput}
                  onChange={(e) => setTagsInput(e.target.value)}
                  placeholder="React, Tailwind, SaaS, Dark"
                  className="w-full rounded-lg border border-[#E5E5E5] bg-[#FFFFFF] px-3 py-2 text-xs text-[#111111] dark:border-[#222222] dark:bg-[#080808] dark:text-[#FFFFFF]"
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-4 border-t border-[#E5E5E5] dark:border-[#222222]">
              <button
                type="submit"
                disabled={submitting}
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#111111] py-3 text-sm font-semibold text-white shadow-md transition-opacity hover:opacity-90 disabled:opacity-50 dark:bg-white dark:text-black"
              >
                <Upload className="h-4 w-4" />
                <span>{submitting ? "Publishing..." : "Submit Template"}</span>
              </button>
            </div>
          </form>
        </div>
      )}
    </LibraryLayout>
  );
}
