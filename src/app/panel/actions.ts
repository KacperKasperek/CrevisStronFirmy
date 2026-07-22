"use server";
import { createHash, randomBytes, randomUUID } from "crypto";
import { and, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/admin";
import { db } from "@/lib/db";
import { contactMessages, milestones, projectShares, projects, siteContent, tasks } from "@/lib/db/schema";
import { siteContentSchema } from "@/lib/content";
import { projectSchema } from "@/lib/validation";
import { sendContactEmails } from "@/lib/mail";

const date = (value: FormDataEntryValue | null) => value ? new Date(String(value)) : null;
export async function saveContentAction(formData: FormData) {
  const current = await requireAdmin(); const parsed = siteContentSchema.parse(JSON.parse(String(formData.get("content")))); const now = new Date();
  await db.insert(siteContent).values({ id: "main", content: parsed, updatedBy: current.user.id, createdAt: now, updatedAt: now }).onDuplicateKeyUpdate({ set: { content: parsed, updatedBy: current.user.id, updatedAt: now } });
  revalidatePath("/"); revalidatePath("/panel/content");
}
export async function updateMessageAction(formData: FormData) {
  await requireAdmin(); const id = String(formData.get("id")); const status = String(formData.get("status")) as "new" | "in_progress" | "replied" | "archived";
  await db.update(contactMessages).set({ status, internalNote: String(formData.get("internalNote") ?? ""), readAt: new Date(), repliedAt: status === "replied" ? new Date() : null, updatedAt: new Date() }).where(eq(contactMessages.id, id)); revalidatePath("/panel/messages");
}
export async function retryMessageAction(formData: FormData) {
  await requireAdmin(); const id = String(formData.get("id")); const row = await db.query.contactMessages.findFirst({ where: eq(contactMessages.id, id) }); if (!row) return;
  try { await sendContactEmails(row); await db.update(contactMessages).set({ deliveryStatus: "sent", deliveryError: null, updatedAt: new Date() }).where(eq(contactMessages.id, id)); }
  catch (error) { await db.update(contactMessages).set({ deliveryStatus: "failed", deliveryError: error instanceof Error ? error.message.slice(0, 1000) : "Błąd SMTP", updatedAt: new Date() }).where(eq(contactMessages.id, id)); }
  revalidatePath("/panel/messages");
}
export async function deleteMessageAction(formData: FormData) { await requireAdmin(); await db.delete(contactMessages).where(eq(contactMessages.id, String(formData.get("id")))); revalidatePath("/panel/messages"); }
export async function createProjectAction(formData: FormData) {
  await requireAdmin(); const values = projectSchema.parse(Object.fromEntries(formData)); const id = randomUUID(); const now = new Date();
  await db.insert(projects).values({ id, name: values.name, clientName: values.clientName, clientEmail: values.clientEmail || null, status: values.status, progress: values.progress, startsAt: date(formData.get("startsAt")), dueAt: date(formData.get("dueAt")), internalNote: values.internalNote || null, publicSummary: values.publicSummary || null, createdAt: now, updatedAt: now });
  redirect(`/panel/projects/${id}`);
}
export async function updateProjectAction(formData: FormData) {
  await requireAdmin(); const id = String(formData.get("id")); const values = projectSchema.parse(Object.fromEntries(formData));
  await db.update(projects).set({ name: values.name, clientName: values.clientName, clientEmail: values.clientEmail || null, status: values.status, progress: values.progress, startsAt: date(formData.get("startsAt")), dueAt: date(formData.get("dueAt")), internalNote: values.internalNote || null, publicSummary: values.publicSummary || null, updatedAt: new Date() }).where(eq(projects.id, id)); revalidatePath(`/panel/projects/${id}`); revalidatePath("/panel/projects");
}
export async function addMilestoneAction(formData: FormData) {
  await requireAdmin(); const projectId = String(formData.get("projectId")); await db.insert(milestones).values({ id: randomUUID(), projectId, title: String(formData.get("title")), description: String(formData.get("description") ?? ""), status: "pending", isPublic: formData.get("isPublic") === "on", position: Number(formData.get("position") ?? 0), dueAt: date(formData.get("dueAt")), createdAt: new Date(), updatedAt: new Date() }); revalidatePath(`/panel/projects/${projectId}`);
}
export async function updateMilestoneAction(formData: FormData) { await requireAdmin(); const id = String(formData.get("id")); const projectId = String(formData.get("projectId")); const status = String(formData.get("status")) as "pending" | "active" | "done"; await db.update(milestones).set({ status, isPublic: formData.get("isPublic") === "on", updatedAt: new Date() }).where(and(eq(milestones.id, id), eq(milestones.projectId, projectId))); revalidatePath(`/panel/projects/${projectId}`); }
export async function addTaskAction(formData: FormData) {
  await requireAdmin(); const projectId = String(formData.get("projectId")); await db.insert(tasks).values({ id: randomUUID(), projectId, title: String(formData.get("title")), description: String(formData.get("description") ?? ""), column: "todo", isPublic: formData.get("isPublic") === "on", position: Date.now(), createdAt: new Date(), updatedAt: new Date() }); revalidatePath(`/panel/projects/${projectId}`);
}
export async function moveTaskAction(taskId: string, projectId: string, column: "todo" | "doing" | "review" | "done", position: number) { await requireAdmin(); await db.update(tasks).set({ column, position, updatedAt: new Date() }).where(and(eq(tasks.id, taskId), eq(tasks.projectId, projectId))); revalidatePath(`/panel/projects/${projectId}`); }
export async function updateTaskVisibilityAction(formData: FormData) { await requireAdmin(); const id = String(formData.get("id")); const projectId = String(formData.get("projectId")); await db.update(tasks).set({ isPublic: formData.get("isPublic") === "on", updatedAt: new Date() }).where(and(eq(tasks.id, id), eq(tasks.projectId, projectId))); revalidatePath(`/panel/projects/${projectId}`); }
export async function createShareAction(formData: FormData) {
  await requireAdmin(); const projectId = String(formData.get("projectId")); const token = randomBytes(32).toString("base64url"); const tokenHash = createHash("sha256").update(token).digest("hex");
  await db.update(projectShares).set({ enabled: false, updatedAt: new Date() }).where(eq(projectShares.projectId, projectId)); await db.insert(projectShares).values({ id: randomUUID(), projectId, tokenHash, enabled: true, expiresAt: date(formData.get("expiresAt")), createdAt: new Date(), updatedAt: new Date() }); redirect(`/panel/projects/${projectId}?share=${token}`);
}
export async function revokeShareAction(formData: FormData) { await requireAdmin(); const projectId = String(formData.get("projectId")); await db.update(projectShares).set({ enabled: false, updatedAt: new Date() }).where(eq(projectShares.projectId, projectId)); revalidatePath(`/panel/projects/${projectId}`); }
