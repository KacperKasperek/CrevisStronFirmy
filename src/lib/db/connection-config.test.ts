import { describe, expect, it } from "vitest";
import { parseMysqlConnectionString } from "./connection-config";

describe("parseMysqlConnectionString", () => {
  it("obsługuje poprawnie zakodowane hasło", () => {
    expect(parseMysqlConnectionString("mysql://user:p%40ss%25word@localhost:3306/database")).toEqual({
      user: "user", password: "p@ss%word", host: "localhost", port: 3306, database: "database",
    });
  });

  it("przyjmuje surowe hasło ze znakami specjalnymi", () => {
    expect(parseMysqlConnectionString("mysql://user:p@ss%word@localhost:3306/database").password).toBe("p@ss%word");
  });
});
