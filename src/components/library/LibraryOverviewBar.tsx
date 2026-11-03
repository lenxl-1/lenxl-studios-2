import React from "react";
import { Activity } from "lucide-react";
import { useTemplates } from "@/lib/templates-store";

export function LibraryOverviewBar() {
  const { totalCount, freeCount, premiumCount } = useTemplates();

  return (
    <div className="mb-5 flex flex-wrap items-center justify-between gap-2.5 rounded-lg border border-[#E5E5E5] bg-[#F9FAFB] px-3.5 py-2 text-xs select-none dark:border-[#222222] dark:bg-[#070707]">
      {/* Left */}
      <div className="flex items-center gap-2 text-[#666666] dark:text-[#A1A1A1]">
        <Activity className="h-3.5 w-3.5 text-[#111111] dark:text-[#FFFFFF]" />
        <span className="font-medium text-[#111111] dark:text-[#FFFFFF]">Overview</span>
        <span>·</span>
        <span>New templates added this week</span>
      </div>

      {/* Right: Dynamic Counters */}
      <div className="flex items-center gap-3.5 text-[#666666] dark:text-[#A1A1A1]">
        <span>
          Templates:{" "}
          <strong className="font-semibold text-[#111111] dark:text-[#FFFFFF]">{totalCount}</strong>
        </span>
        <span>
          Free:{" "}
          <strong className="font-semibold text-emerald-600 dark:text-emerald-400">
            {freeCount}
          </strong>
        </span>
        <span>
          Premium:{" "}
          <strong className="font-semibold text-[#111111] dark:text-[#FFFFFF]">
            {premiumCount}
          </strong>
        </span>
      </div>
    </div>
  );
}
