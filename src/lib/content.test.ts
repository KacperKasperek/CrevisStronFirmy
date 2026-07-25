import { describe, expect, it } from "vitest";
import { defaultSiteContent, siteContentSchema } from "./content";

describe("siteContentSchema", () => {
  it("accepts the default content", () => {
    expect(siteContentSchema.parse(defaultSiteContent)).toEqual(defaultSiteContent);
  });

  it("keeps previously saved plans compatible", () => {
    const legacyContent = structuredClone(defaultSiteContent);
    const legacyPlan = legacyContent.offer.plans[0] as Partial<(typeof legacyContent.offer.plans)[number]>;
    delete legacyPlan.billingLabel;

    const parsed = siteContentSchema.parse(legacyContent);

    expect(parsed.offer.plans[0].billingLabel).toBe("zł/mies.");
  });

  it("rejects an empty billing label", () => {
    const invalidContent = structuredClone(defaultSiteContent);
    invalidContent.offer.plans[0].billingLabel = "";

    expect(() => siteContentSchema.parse(invalidContent)).toThrow();
  });

  it("rejects an empty FAQ", () => {
    expect(() => siteContentSchema.parse({ ...defaultSiteContent, faq: { ...defaultSiteContent.faq, items: [] } })).toThrow();
  });
});
