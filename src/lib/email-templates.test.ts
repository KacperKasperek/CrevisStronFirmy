import { describe, expect, it } from "vitest";
import { contactConfirmationHtml, contactNotificationHtml, escapeEmailHtml, resetPasswordHtml, safeEmailSubject } from "./email-templates";

describe("email templates", () => {
  it("escapes user-provided content", () => {
    expect(escapeEmailHtml('<script>alert("x")</script>')).toBe("&lt;script&gt;alert(&quot;x&quot;)&lt;/script&gt;");
    const html = contactNotificationHtml({ name: "<b>Jan</b>", email: "jan@example.com", message: "Hej\n<script>" });
    expect(html).not.toContain("<script>");
    expect(html).toContain("&lt;b&gt;Jan&lt;/b&gt;");
    expect(safeEmailSubject("Jan\r\nBcc: test@example.com")).toBe("Jan Bcc: test@example.com");
  });

  it("uses the Crevis visual system in every email", () => {
    const templates = [
      contactNotificationHtml({ name: "Jan", email: "jan@example.com", message: "Wiadomość" }),
      contactConfirmationHtml({ name: "Jan" }),
      resetPasswordHtml("https://crevis.pl/panel/reset-password?token=test"),
    ];
    for (const html of templates) {
      expect(html).toContain("CREVIS");
      expect(html).toContain("#bd4a2b");
      expect(html).toContain("office.crevis@gmail.com");
    }
  });
});
