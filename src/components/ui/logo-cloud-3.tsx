"use client";

import {
  RiDiscordFill,
  RiDropboxFill,
  RiFigmaFill,
  RiGithubFill,
  RiGoogleFill,
  RiNotionFill,
  RiSlackFill,
  RiSupabaseFill,
  RiVercelFill,
} from "@remixicon/react";

const logos = [
  { name: "Slack", Icon: RiSlackFill },
  { name: "GitHub", Icon: RiGithubFill },
  { name: "Notion", Icon: RiNotionFill },
  { name: "Figma", Icon: RiFigmaFill },
  { name: "Vercel", Icon: RiVercelFill },
  { name: "Supabase", Icon: RiSupabaseFill },
  { name: "Google", Icon: RiGoogleFill },
  { name: "Discord", Icon: RiDiscordFill },
  { name: "Dropbox", Icon: RiDropboxFill },
];

export default function LogoCloudBlock() {
  return (
    <section className="flex w-full flex-col items-center bg-background px-6 py-20 text-foreground">
      <style>{`
        @keyframes logo-cloud-marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        .logo-cloud-track {
          animation: logo-cloud-marquee 32s linear infinite;
        }
        .logo-cloud-mask:hover .logo-cloud-track {
          animation-play-state: paused;
        }
        @media (prefers-reduced-motion: reduce) {
          .logo-cloud-track {
            animation: none;
          }
        }
      `}</style>

      <div className="w-full max-w-5xl text-center">
        <p className="text-sm font-medium tracking-wide text-muted-foreground uppercase">
          Trusted by fast-moving teams at Acme
        </p>

        <div className="logo-cloud-mask relative mt-10 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]">
          <div className="logo-cloud-track flex w-max items-center">
            {[...logos, ...logos].map(({ name, Icon }, index) => (
              <div
                key={`${name}-${index}`}
                className="flex shrink-0 items-center gap-2.5 px-8 text-muted-foreground transition-colors duration-200 hover:text-foreground"
                aria-hidden={index >= logos.length ? "true" : undefined}
              >
                <Icon className="h-6 w-6" aria-hidden="true" />
                <span className="text-lg font-semibold tracking-tight whitespace-nowrap">
                  {name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
