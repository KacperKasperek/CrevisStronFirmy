import { boolean, datetime, index, int, json, mysqlEnum, mysqlTable, text, uniqueIndex, varchar } from "drizzle-orm/mysql-core";
import { sql } from "drizzle-orm";

const timestamps = {
  createdAt: datetime("created_at", { mode: "date" }).notNull().default(sql`CURRENT_TIMESTAMP`),
  updatedAt: datetime("updated_at", { mode: "date" }).notNull().default(sql`CURRENT_TIMESTAMP`),
};

export const user = mysqlTable("user", {
  id: varchar("id", { length: 36 }).primaryKey(), name: varchar("name", { length: 160 }).notNull(),
  email: varchar("email", { length: 255 }).notNull().unique(), emailVerified: boolean("email_verified").notNull().default(false),
  image: text("image"), twoFactorEnabled: boolean("two_factor_enabled").notNull().default(false), ...timestamps,
});
export const session = mysqlTable("session", {
  id: varchar("id", { length: 36 }).primaryKey(), expiresAt: datetime("expires_at", { mode: "date" }).notNull(),
  token: varchar("token", { length: 255 }).notNull().unique(), ipAddress: varchar("ip_address", { length: 64 }), userAgent: text("user_agent"),
  userId: varchar("user_id", { length: 36 }).notNull().references(() => user.id, { onDelete: "cascade" }), ...timestamps,
}, (t) => [index("session_user_idx").on(t.userId)]);
export const account = mysqlTable("account", {
  id: varchar("id", { length: 36 }).primaryKey(), accountId: varchar("account_id", { length: 255 }).notNull(), providerId: varchar("provider_id", { length: 100 }).notNull(),
  userId: varchar("user_id", { length: 36 }).notNull().references(() => user.id, { onDelete: "cascade" }), accessToken: text("access_token"), refreshToken: text("refresh_token"),
  idToken: text("id_token"), accessTokenExpiresAt: datetime("access_token_expires_at", { mode: "date" }), refreshTokenExpiresAt: datetime("refresh_token_expires_at", { mode: "date" }),
  scope: text("scope"), password: text("password"), ...timestamps,
}, (t) => [index("account_user_idx").on(t.userId)]);
export const verification = mysqlTable("verification", {
  id: varchar("id", { length: 36 }).primaryKey(), identifier: varchar("identifier", { length: 255 }).notNull(), value: text("value").notNull(),
  expiresAt: datetime("expires_at", { mode: "date" }).notNull(), ...timestamps,
}, (t) => [index("verification_identifier_idx").on(t.identifier)]);
export const twoFactor = mysqlTable("two_factor", {
  id: varchar("id", { length: 36 }).primaryKey(), secret: text("secret").notNull(), backupCodes: text("backup_codes").notNull(),
  userId: varchar("user_id", { length: 36 }).notNull().references(() => user.id, { onDelete: "cascade" }),
}, (t) => [uniqueIndex("two_factor_user_idx").on(t.userId)]);

export const contactMessages = mysqlTable("contact_messages", {
  id: varchar("id", { length: 36 }).primaryKey(), name: varchar("name", { length: 120 }).notNull(), email: varchar("email", { length: 255 }).notNull(),
  message: text("message").notNull(), status: mysqlEnum("status", ["new", "in_progress", "replied", "archived"]).notNull().default("new"),
  internalNote: text("internal_note"), deliveryStatus: mysqlEnum("delivery_status", ["pending", "sent", "failed"]).notNull().default("pending"),
  deliveryError: text("delivery_error"), readAt: datetime("read_at", { mode: "date" }), repliedAt: datetime("replied_at", { mode: "date" }),
  consentAt: datetime("consent_at", { mode: "date" }).notNull(), ...timestamps,
}, (t) => [index("messages_status_created_idx").on(t.status, t.createdAt)]);
export const siteContent = mysqlTable("site_content", {
  id: varchar("id", { length: 32 }).primaryKey(), content: json("content").notNull(),
  updatedBy: varchar("updated_by", { length: 36 }).references(() => user.id, { onDelete: "set null" }), ...timestamps,
});
export const analyticsEvents = mysqlTable("analytics_events", {
  id: varchar("id", { length: 36 }).primaryKey(), event: mysqlEnum("event", ["page_view", "cta_click", "form_start", "form_submit"]).notNull(),
  sessionId: varchar("session_id", { length: 64 }).notNull(), path: varchar("path", { length: 512 }).notNull(), label: varchar("label", { length: 160 }),
  referrerHost: varchar("referrer_host", { length: 255 }), source: varchar("source", { length: 120 }), medium: varchar("medium", { length: 120 }),
  campaign: varchar("campaign", { length: 160 }), device: mysqlEnum("device", ["mobile", "tablet", "desktop"]).notNull(),
  createdAt: datetime("created_at", { mode: "date" }).notNull().default(sql`CURRENT_TIMESTAMP`),
}, (t) => [index("analytics_created_event_idx").on(t.createdAt, t.event), index("analytics_session_idx").on(t.sessionId)]);
export const rateLimits = mysqlTable("rate_limits", {
  key: varchar("key", { length: 128 }).primaryKey(), count: int("count").notNull().default(1), windowStartedAt: datetime("window_started_at", { mode: "date" }).notNull(),
});

export const projects = mysqlTable("projects", {
  id: varchar("id", { length: 36 }).primaryKey(), name: varchar("name", { length: 180 }).notNull(), clientName: varchar("client_name", { length: 180 }).notNull(),
  clientEmail: varchar("client_email", { length: 255 }), status: mysqlEnum("status", ["planned", "active", "paused", "completed"]).notNull().default("planned"),
  progress: int("progress").notNull().default(0), startsAt: datetime("starts_at", { mode: "date" }), dueAt: datetime("due_at", { mode: "date" }),
  internalNote: text("internal_note"), publicSummary: text("public_summary"), ...timestamps,
});
export const milestones = mysqlTable("milestones", {
  id: varchar("id", { length: 36 }).primaryKey(), projectId: varchar("project_id", { length: 36 }).notNull().references(() => projects.id, { onDelete: "cascade" }),
  title: varchar("title", { length: 180 }).notNull(), description: text("description"), status: mysqlEnum("status", ["pending", "active", "done"]).notNull().default("pending"),
  isPublic: boolean("is_public").notNull().default(true), position: int("position").notNull().default(0), dueAt: datetime("due_at", { mode: "date" }), ...timestamps,
}, (t) => [index("milestone_project_position_idx").on(t.projectId, t.position)]);
export const tasks = mysqlTable("tasks", {
  id: varchar("id", { length: 36 }).primaryKey(), projectId: varchar("project_id", { length: 36 }).notNull().references(() => projects.id, { onDelete: "cascade" }),
  milestoneId: varchar("milestone_id", { length: 36 }).references(() => milestones.id, { onDelete: "set null" }), title: varchar("title", { length: 180 }).notNull(),
  description: text("description"), column: mysqlEnum("column", ["todo", "doing", "review", "done"]).notNull().default("todo"),
  isPublic: boolean("is_public").notNull().default(false), position: int("position").notNull().default(0), ...timestamps,
}, (t) => [index("task_project_column_position_idx").on(t.projectId, t.column, t.position)]);
export const projectShares = mysqlTable("project_shares", {
  id: varchar("id", { length: 36 }).primaryKey(), projectId: varchar("project_id", { length: 36 }).notNull().references(() => projects.id, { onDelete: "cascade" }),
  tokenHash: varchar("token_hash", { length: 64 }).notNull().unique(), enabled: boolean("enabled").notNull().default(true),
  expiresAt: datetime("expires_at", { mode: "date" }), ...timestamps,
}, (t) => [index("share_project_idx").on(t.projectId)]);

export const schema = { user, session, account, verification, twoFactor, contactMessages, siteContent, analyticsEvents, rateLimits, projects, milestones, tasks, projectShares };
