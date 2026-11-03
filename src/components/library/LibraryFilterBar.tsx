import React from "react";
import { useNavigate } from "@tanstack/react-router";
import { ChevronDown, Check, RotateCcw, Tag, Code2, Calendar, Sparkles } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LenxlLogo } from "@/components/LenxlLogo";
import { useTemplates } from "@/lib/templates-store";
import { CATEGORIES, STACKS, TEMPLATE_TYPES } from "@/lib/templates-data";

export function LibraryFilterBar() {
  const navigate = useNavigate();
  const {
    selectedType,
    setSelectedType,
    selectedCategory,
    setSelectedCategory,
    selectedStack,
    setSelectedStack,
    clearFilters,
    searchQuery,
  } = useTemplates();

  const handleLenzlClick = () => {
    clearFilters();
    navigate({ to: "/explore" });
  };

  const hasActiveFilters =
    selectedType !== "All Templates" ||
    selectedCategory !== "All Categories" ||
    selectedStack !== "All Stacks" ||
    searchQuery.trim().length > 0;

  return (
    <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
      {/* Left Filter Pills */}
      <div className="flex flex-wrap items-center gap-2 text-xs">
        {/* LENZL button */}
        <button
          onClick={handleLenzlClick}
          className="inline-flex items-center gap-1.5 rounded-md border border-[#E5E5E5] bg-[#FFFFFF] px-2.5 py-1.5 font-medium text-[#111111] transition-colors hover:bg-neutral-100 dark:border-[#222222] dark:bg-[#050505] dark:text-[#FFFFFF] dark:hover:bg-[#111111]"
        >
          <div className="flex h-3.5 w-3.5 items-center justify-center rounded-sm bg-[#111111] text-[8px] font-bold text-white dark:bg-white dark:text-black">
            L
          </div>
          <span>LENZL</span>
        </button>

        {/* All Templates dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              className={`inline-flex items-center gap-1.5 rounded-md border px-2.5 py-1.5 font-medium transition-colors ${
                selectedType !== "All Templates"
                  ? "border-[#111111] bg-[#111111] text-white dark:border-white dark:bg-white dark:text-black"
                  : "border-[#E5E5E5] bg-[#FFFFFF] text-[#111111] hover:bg-neutral-100 dark:border-[#222222] dark:bg-[#050505] dark:text-[#FFFFFF] dark:hover:bg-[#111111]"
              }`}
            >
              <Calendar className="h-3.5 w-3.5 opacity-70" />
              <span>{selectedType}</span>
              <ChevronDown className="h-3 w-3 opacity-60" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="start"
            className="w-40 border-[#E5E5E5] bg-[#FFFFFF] p-1 text-xs text-[#111111] shadow-lg dark:border-[#222222] dark:bg-[#080808] dark:text-[#FFFFFF]"
          >
            {TEMPLATE_TYPES.map((type) => (
              <DropdownMenuItem
                key={type}
                onClick={() => setSelectedType(type)}
                className="flex items-center justify-between rounded px-2.5 py-1.5 cursor-pointer focus:bg-neutral-100 dark:focus:bg-[#161616]"
              >
                <span>{type}</span>
                {selectedType === type && <Check className="h-3.5 w-3.5" />}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        {/* All Categories dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              className={`inline-flex items-center gap-1.5 rounded-md border px-2.5 py-1.5 font-medium transition-colors ${
                selectedCategory !== "All Categories"
                  ? "border-[#111111] bg-[#111111] text-white dark:border-white dark:bg-white dark:text-black"
                  : "border-[#E5E5E5] bg-[#FFFFFF] text-[#111111] hover:bg-neutral-100 dark:border-[#222222] dark:bg-[#050505] dark:text-[#FFFFFF] dark:hover:bg-[#111111]"
              }`}
            >
              <Tag className="h-3.5 w-3.5 opacity-70" />
              <span>{selectedCategory}</span>
              <ChevronDown className="h-3 w-3 opacity-60" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="start"
            className="max-h-64 w-48 overflow-y-auto border-[#E5E5E5] bg-[#FFFFFF] p-1 text-xs text-[#111111] shadow-lg dark:border-[#222222] dark:bg-[#080808] dark:text-[#FFFFFF]"
          >
            {CATEGORIES.map((cat) => (
              <DropdownMenuItem
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className="flex items-center justify-between rounded px-2.5 py-1.5 cursor-pointer focus:bg-neutral-100 dark:focus:bg-[#161616]"
              >
                <span>{cat}</span>
                {selectedCategory === cat && <Check className="h-3.5 w-3.5" />}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        {/* All Stacks dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              className={`inline-flex items-center gap-1.5 rounded-md border px-2.5 py-1.5 font-medium transition-colors ${
                selectedStack !== "All Stacks"
                  ? "border-[#111111] bg-[#111111] text-white dark:border-white dark:bg-white dark:text-black"
                  : "border-[#E5E5E5] bg-[#FFFFFF] text-[#111111] hover:bg-neutral-100 dark:border-[#222222] dark:bg-[#050505] dark:text-[#FFFFFF] dark:hover:bg-[#111111]"
              }`}
            >
              <Code2 className="h-3.5 w-3.5 opacity-70" />
              <span>{selectedStack}</span>
              <ChevronDown className="h-3 w-3 opacity-60" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="start"
            className="w-48 border-[#E5E5E5] bg-[#FFFFFF] p-1 text-xs text-[#111111] shadow-lg dark:border-[#222222] dark:bg-[#080808] dark:text-[#FFFFFF]"
          >
            {STACKS.map((stack) => (
              <DropdownMenuItem
                key={stack}
                onClick={() => setSelectedStack(stack)}
                className="flex items-center justify-between rounded px-2.5 py-1.5 cursor-pointer focus:bg-neutral-100 dark:focus:bg-[#161616]"
              >
                <span>{stack}</span>
                {selectedStack === stack && <Check className="h-3.5 w-3.5" />}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Right side helper actions */}
      <div className="flex items-center gap-2">
        {hasActiveFilters && (
          <button
            onClick={clearFilters}
            className="inline-flex items-center gap-1 rounded-md border border-neutral-300 bg-neutral-100 px-2 py-1 text-xs text-neutral-700 hover:bg-neutral-200 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-300 dark:hover:bg-neutral-800"
          >
            <RotateCcw className="h-3 w-3" />
            <span>Reset filters</span>
          </button>
        )}
      </div>
    </div>
  );
}
