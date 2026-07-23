import { describe, expect, it } from "vitest";
import { analyticsReport } from "./analytics-report";
describe("analyticsReport", () => {
  it("calculates sessions and conversion", () => { const base = { id: "1", path: "/", label: null, referrerHost: null, source: null, medium: null, campaign: null, device: "desktop" as const, createdAt: new Date() }; const report = analyticsReport([{ ...base, event: "page_view", sessionId: "a" }, { ...base, id: "2", event: "form_submit", sessionId: "a" }, { ...base, id: "3", event: "page_view", sessionId: "b" }]); expect(report.sessions).toBe(2); expect(report.conversion).toBe(50); });
  it("returns zeroed statistics after a reset", () => { expect(analyticsReport([])).toMatchObject({ views: 0, sessions: 0, submissions: 0, conversion: 0, devices: [], sources: [], labels: [] }); });
  it("excludes activity from the administrator panel", () => { const base = { id: "1", label: null, referrerHost: null, source: null, medium: null, campaign: null, device: "desktop" as const, createdAt: new Date(), event: "page_view" as const }; const report = analyticsReport([{ ...base, path: "/", sessionId: "public" }, { ...base, id: "2", path: "/panel", sessionId: "admin" }, { ...base, id: "3", path: "/panel/analytics?days=30", sessionId: "admin" }]); expect(report.views).toBe(1); expect(report.sessions).toBe(1); });
});
