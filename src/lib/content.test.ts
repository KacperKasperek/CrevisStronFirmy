import { describe, expect, it } from "vitest";
import { defaultSiteContent, getPlanBillingLabel, siteContentSchema } from "./content";
describe("siteContentSchema", () => { it("accepts the default content", () => { expect(siteContentSchema.parse(defaultSiteContent)).toEqual(defaultSiteContent); }); it("rejects an empty FAQ", () => { expect(() => siteContentSchema.parse({ ...defaultSiteContent, faq: { ...defaultSiteContent.faq, items: [] } })).toThrow(); }); });

describe("getPlanBillingLabel", () => {
  it("uses a one-time currency label for the Sama strona offer", () => {
    expect(getPlanBillingLabel("Sama strona")).toBe("zł");
  });

  it("keeps the monthly label for other plans", () => {
    expect(getPlanBillingLabel("Biznes")).toBe("zł/mies.");
  });
});
