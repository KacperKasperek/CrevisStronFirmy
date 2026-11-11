import { describe, expect, it } from "vitest";
import { isExcludedAnalyticsPath } from "./analytics-path";

describe("isExcludedAnalyticsPath", () => {
  it("excludes the admin panel and portfolio demo", () => {
    expect(isExcludedAnalyticsPath("/panel/analytics?days=30")).toBe(true);
    expect(isExcludedAnalyticsPath("/demo1")).toBe(true);
    expect(isExcludedAnalyticsPath("/demo1/#kontakt")).toBe(true);
  });

  it("allows public Crevis pages", () => {
    expect(isExcludedAnalyticsPath("/portfolio")).toBe(false);
    expect(isExcludedAnalyticsPath("/" )).toBe(false);
  });
});
