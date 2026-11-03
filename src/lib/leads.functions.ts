import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const leadSchema = z.object({
  name: z.string().trim().min(1).max(100),
  email: z.string().trim().email().max(255),
  company: z.string().trim().max(120).optional().or(z.literal("")),
  message: z.string().trim().max(1000).optional().or(z.literal("")),
});

export const submitLead = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => leadSchema.parse(data))
  .handler(async ({ data }) => {
    const webhookUrl = process.env.LEAD_WEBHOOK_URL;
    const payload = {
      ...data,
      submittedAt: new Date().toISOString(),
      source: "lumen-landing",
    };

    if (webhookUrl) {
      try {
        const res = await fetch(webhookUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        if (!res.ok) {
          console.error("Lead webhook failed", res.status, await res.text());
          return { ok: false as const, error: "Could not deliver your message. Please try again." };
        }
      } catch (err) {
        console.error("Lead webhook error", err);
        return { ok: false as const, error: "Network error. Please try again." };
      }
    } else {
      console.log("[lead] webhook not configured. Payload:", payload);
    }

    return { ok: true as const };
  });
