import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().trim().min(2, "Podaj imię i nazwisko.").max(120),
  email: z.email("Podaj poprawny adres e-mail.").max(255),
  message: z.string().trim().min(10, "Wiadomość powinna mieć co najmniej 10 znaków.").max(5000),
  consent: z.literal(true, { error: "Zgoda jest wymagana." }),
  website: z.string().max(0).optional().default(""),
});

export const analyticsSchema = z.object({
  event: z.enum(["page_view", "cta_click", "form_start", "form_submit"]), sessionId: z.string().uuid(),
  path: z.string().max(512), label: z.string().max(160).optional(), referrerHost: z.string().max(255).optional(),
  source: z.string().max(120).optional(), medium: z.string().max(120).optional(), campaign: z.string().max(160).optional(),
});

export const projectSchema = z.object({
  name: z.string().trim().min(2).max(180), clientName: z.string().trim().min(2).max(180), clientEmail: z.union([z.email(), z.literal("")]),
  status: z.enum(["planned", "active", "paused", "completed"]), progress: z.coerce.number().int().min(0).max(100),
  startsAt: z.string().optional(), dueAt: z.string().optional(), internalNote: z.string().max(5000).optional(), publicSummary: z.string().max(5000).optional(),
});
