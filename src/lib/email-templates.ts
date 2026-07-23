const colors = {
  ink: "#0d0d0d",
  paper: "#ffffff",
  rust: "#bd4a2b",
  mist: "#f2f2f2",
  muted: "#666666",
};

export function escapeEmailHtml(value: string) {
  return value.replace(/[&<>"']/g, (character) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;",
  })[character] ?? character);
}

export function safeEmailSubject(value: string) {
  return value.replace(/[\r\n]+/g, " ").trim();
}

function shell({ preview, marker, title, content }: { preview: string; marker: string; title: string; content: string }) {
  return `<!doctype html>
<html lang="pl">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <meta name="color-scheme" content="light only">
  <title>${escapeEmailHtml(title)}</title>
  <style>@media only screen and (max-width:640px){.frame{width:100%!important}.pad{padding-left:24px!important;padding-right:24px!important}.headline{font-size:34px!important;line-height:36px!important}.stack{display:block!important;width:100%!important}}</style>
</head>
<body style="margin:0;padding:0;background:${colors.mist};color:${colors.ink};font-family:Arial,Helvetica,sans-serif;-webkit-text-size-adjust:100%">
  <div style="display:none;max-height:0;overflow:hidden;opacity:0;color:transparent">${escapeEmailHtml(preview)}</div>
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="width:100%;background:${colors.mist}">
    <tr><td align="center" style="padding:28px 12px">
      <table role="presentation" class="frame" width="640" cellspacing="0" cellpadding="0" border="0" style="width:640px;max-width:640px;background:${colors.paper};border-collapse:collapse">
        <tr><td style="height:8px;background:${colors.rust};font-size:0;line-height:0">&nbsp;</td></tr>
        <tr><td class="pad" style="padding:30px 42px;background:${colors.ink};color:${colors.paper}">
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0"><tr>
            <td style="font-family:Arial Black,Arial,Helvetica,sans-serif;font-size:25px;font-weight:900;letter-spacing:2px">CREVIS<span style="color:${colors.rust}">.</span></td>
            <td align="right" style="font-family:Courier New,monospace;font-size:11px;letter-spacing:1.5px;color:#aaaaaa">WEB / 2026</td>
          </tr></table>
        </td></tr>
        <tr><td class="pad" style="padding:42px 42px 10px">
          <p style="margin:0 0 14px;font-family:Courier New,monospace;font-size:12px;font-weight:bold;letter-spacing:2px;text-transform:uppercase;color:${colors.rust}">${escapeEmailHtml(marker)}</p>
          <h1 class="headline" style="margin:0;font-family:Arial Black,Arial,Helvetica,sans-serif;font-size:44px;line-height:46px;letter-spacing:-1.5px;text-transform:uppercase;color:${colors.ink}">${escapeEmailHtml(title)}</h1>
        </td></tr>
        <tr><td class="pad" style="padding:28px 42px 46px">${content}</td></tr>
        <tr><td class="pad" style="padding:25px 42px;border-top:1px solid #dddddd;background:${colors.paper}">
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0"><tr>
            <td class="stack" style="font-size:12px;line-height:18px;color:${colors.muted}">Crevis — strony internetowe dla firm<br><a href="mailto:office.crevis@gmail.com" style="color:${colors.rust};text-decoration:none">office.crevis@gmail.com</a></td>
            <td class="stack" align="right" style="font-size:12px;line-height:18px"><a href="https://crevis.pl" style="color:${colors.ink};font-weight:bold;text-decoration:none">CREVIS.PL →</a></td>
          </tr></table>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

function actionButton(label: string, url: string) {
  return `<table role="presentation" cellspacing="0" cellpadding="0" border="0" style="margin-top:28px"><tr><td style="background:${colors.rust}"><a href="${escapeEmailHtml(url)}" style="display:inline-block;padding:15px 24px;font-size:15px;font-weight:bold;color:${colors.paper};text-decoration:none">${escapeEmailHtml(label)} &nbsp;→</a></td></tr></table>`;
}

export function contactNotificationHtml(data: { name: string; email: string; message: string }) {
  const name = escapeEmailHtml(data.name);
  const email = escapeEmailHtml(data.email);
  const message = escapeEmailHtml(data.message).replace(/\r?\n/g, "<br>");
  return shell({
    preview: `Nowe zapytanie od ${data.name}`,
    marker: "01 / Nowy kontakt",
    title: "Nowe zapytanie",
    content: `<table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="border-collapse:collapse">
      <tr><td style="width:120px;padding:12px 0;border-bottom:1px solid #dddddd;font-family:Courier New,monospace;font-size:11px;text-transform:uppercase;color:${colors.muted}">Imię</td><td style="padding:12px 0;border-bottom:1px solid #dddddd;font-size:16px;font-weight:bold">${name}</td></tr>
      <tr><td style="width:120px;padding:12px 0;border-bottom:1px solid #dddddd;font-family:Courier New,monospace;font-size:11px;text-transform:uppercase;color:${colors.muted}">E-mail</td><td style="padding:12px 0;border-bottom:1px solid #dddddd;font-size:16px"><a href="mailto:${email}" style="color:${colors.rust};font-weight:bold;text-decoration:none">${email}</a></td></tr>
    </table>
    <div style="margin-top:26px;padding:22px;border-left:5px solid ${colors.rust};background:${colors.mist};font-size:16px;line-height:25px">${message}</div>
    ${actionButton("Odpowiedz klientowi", `mailto:${data.email}`)}`,
  });
}

export function contactConfirmationHtml(data: { name: string }) {
  const name = escapeEmailHtml(data.name);
  return shell({
    preview: "Dziękujemy — otrzymaliśmy Twoją wiadomość.",
    marker: "01 / Wiadomość przyjęta",
    title: "Dziękujemy za kontakt",
    content: `<p style="margin:0;font-size:18px;line-height:29px">Dzień dobry <strong>${name}</strong>,</p>
      <p style="margin:16px 0 0;font-size:16px;line-height:26px;color:${colors.muted}">Twoja wiadomość jest już u nas. Zapoznamy się ze szczegółami i odpowiemy w ciągu jednego dnia roboczego.</p>
      <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="margin-top:30px;border-collapse:collapse">
        <tr><td style="width:36px;padding:15px 0;border-top:1px solid #dddddd;font-family:Courier New,monospace;font-weight:bold;color:${colors.rust}">01</td><td style="padding:15px 0;border-top:1px solid #dddddd;font-size:14px;font-weight:bold">Analizujemy wiadomość</td></tr>
        <tr><td style="width:36px;padding:15px 0;border-top:1px solid #dddddd;font-family:Courier New,monospace;font-weight:bold;color:${colors.rust}">02</td><td style="padding:15px 0;border-top:1px solid #dddddd;font-size:14px;font-weight:bold">Wracamy z odpowiedzią lub pytaniami</td></tr>
      </table>
      ${actionButton("Zobacz Crevis", "https://crevis.pl")}`,
  });
}

export function resetPasswordHtml(url: string) {
  const safeUrl = escapeEmailHtml(url);
  return shell({
    preview: "Link do ustawienia nowego hasła w panelu Crevis.",
    marker: "Panel / Bezpieczeństwo",
    title: "Reset hasła",
    content: `<p style="margin:0;font-size:16px;line-height:26px;color:${colors.muted}">Otrzymaliśmy prośbę o zmianę hasła do panelu Crevis. Przycisk poniżej prowadzi do bezpiecznego formularza ustawienia nowego hasła.</p>
      ${actionButton("Ustaw nowe hasło", url)}
      <p style="margin:28px 0 0;padding-top:20px;border-top:1px solid #dddddd;font-size:13px;line-height:21px;color:${colors.muted}">Jeżeli przycisk nie działa, skopiuj ten adres:<br><a href="${safeUrl}" style="color:${colors.rust};word-break:break-all">${safeUrl}</a></p>
      <p style="margin:18px 0 0;font-size:13px;line-height:21px;color:${colors.muted}">Jeśli to nie Ty wysłałeś prośbę, zignoruj tę wiadomość.</p>`,
  });
}
