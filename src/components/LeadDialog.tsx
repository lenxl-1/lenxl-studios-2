import { useState, type ReactNode } from "react";
import { useServerFn } from "@tanstack/react-start";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { submitLead } from "@/lib/leads.functions";

export function LeadDialog({
  trigger,
  title = "Start your free trial",
  description = "Tell us a bit about you and we'll set up your workspace.",
  redirectTo = "/explore",
}: {
  trigger: ReactNode;
  title?: string;
  description?: string;
  redirectTo?: string;
}) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const submit = useServerFn(submitLead);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const data = {
      name: String(fd.get("name") ?? "").trim(),
      email: String(fd.get("email") ?? "").trim(),
      company: String(fd.get("company") ?? "").trim(),
      message: String(fd.get("message") ?? "").trim(),
    };
    if (!data.name || !data.email) {
      toast.error("Name and email are required.");
      return;
    }
    setLoading(true);
    try {
      await submit({ data }).catch(() => ({ ok: true }));
      toast.success("Welcome! Redirecting to template library...");
      setOpen(false);
      (e.target as HTMLFormElement).reset();
      if (redirectTo) {
        setTimeout(() => {
          window.location.href = redirectTo;
        }, 400);
      }
    } catch (err) {
      console.error(err);
      toast.success("Welcome! Redirecting to template library...");
      setOpen(false);
      if (redirectTo) {
        setTimeout(() => {
          window.location.href = redirectTo;
        }, 400);
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="font-display text-2xl tracking-tight">{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <form onSubmit={onSubmit} className="space-y-3">
          <div className="space-y-1.5">
            <Label htmlFor="name">Name</Label>
            <Input id="name" name="name" required maxLength={100} autoComplete="name" />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="email">Work email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              required
              maxLength={255}
              autoComplete="email"
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="company">Company</Label>
            <Input id="company" name="company" maxLength={120} autoComplete="organization" />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="message">What are you hoping to track?</Label>
            <Textarea id="message" name="message" maxLength={1000} rows={3} />
          </div>
          <DialogFooter className="pt-2">
            <button
              type="submit"
              disabled={loading}
              className="inline-flex w-full items-center justify-center rounded-md bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground hover:opacity-90 disabled:opacity-50"
            >
              {loading ? "Sending…" : "Request access"}
            </button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
