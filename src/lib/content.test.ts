import { describe, expect, it } from "vitest";
import { defaultSiteContent, siteContentSchema } from "./content";
describe("siteContentSchema", () => { it("accepts the default content", () => { expect(siteContentSchema.parse(defaultSiteContent)).toEqual(defaultSiteContent); }); it("rejects an empty FAQ", () => { expect(() => siteContentSchema.parse({ ...defaultSiteContent, faq: { ...defaultSiteContent.faq, items: [] } })).toThrow(); }); });
