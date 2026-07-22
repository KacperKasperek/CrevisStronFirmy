import { describe, expect, it } from "vitest";
import { contactSchema } from "./validation";
describe("contactSchema", () => { it("accepts a valid message", () => { expect(contactSchema.safeParse({ name: "Jan Kowalski", email: "jan@example.com", message: "Proszę o przygotowanie wyceny.", consent: true, website: "" }).success).toBe(true); }); it("rejects missing consent and honeypot", () => { expect(contactSchema.safeParse({ name: "Jan", email: "jan@example.com", message: "Wystarczająco długa wiadomość", consent: false, website: "spam" }).success).toBe(false); }); });
