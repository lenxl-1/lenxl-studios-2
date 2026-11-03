import React, { useState } from "react";
import { LibrarySidebar } from "./LibrarySidebar";
import { LibraryMobileNav } from "./LibraryMobileNav";
import { TemplateDetailsModal } from "./TemplateDetailsModal";
import { type Template } from "@/lib/templates-data";

interface LibraryLayoutProps {
  children: (helpers: { openTemplateModal: (template: Template) => void }) => React.ReactNode;
}

export function LibraryLayout({ children }: LibraryLayoutProps) {
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);

  const openTemplateModal = (template: Template) => {
    setSelectedTemplate(template);
  };

  return (
    <div className="min-h-screen bg-[#FFFFFF] text-[#111111] transition-colors duration-200 dark:bg-[#000000] dark:text-[#FFFFFF]">
      {/* Desktop Sidebar (approx 270px) */}
      <LibrarySidebar />

      {/* Mobile Top Navigation */}
      <LibraryMobileNav />

      {/* Main Content Area */}
      <main className="md:pl-[270px] min-h-screen flex flex-col">
        <div className="flex-1 w-full max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
          {children({ openTemplateModal })}
        </div>
      </main>

      {/* Global Template Modal */}
      <TemplateDetailsModal
        template={selectedTemplate}
        open={!!selectedTemplate}
        onOpenChange={(open) => !open && setSelectedTemplate(null)}
        onSelectRelated={(related) => setSelectedTemplate(related)}
      />
    </div>
  );
}
