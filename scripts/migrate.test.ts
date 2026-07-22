import { describe, expect, it } from "vitest";
import { migrationChecksums } from "./migrate";

describe("migrationChecksums", () => {
  it("treats LF and CRLF versions of the same migration as equivalent", () => {
    const lf = migrationChecksums("CREATE TABLE example (id int);\nSELECT 1;\n");
    const crlf = migrationChecksums("CREATE TABLE example (id int);\r\nSELECT 1;\r\n");

    expect(lf.canonical).toBe(crlf.canonical);
    expect(lf.accepted.has(crlf.canonical)).toBe(true);
    expect(crlf.accepted).toEqual(lf.accepted);
  });

  it("still detects a real SQL change", () => {
    const original = migrationChecksums("CREATE TABLE example (id int);\n");
    const changed = migrationChecksums("CREATE TABLE example (id bigint);\n");

    expect(original.accepted.has(changed.canonical)).toBe(false);
  });
});
