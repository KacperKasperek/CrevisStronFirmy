import "server-only";
import nodemailer from "nodemailer";

function transporter() {
  if (!process.env.SMTP_HOST || !process.env.SMTP_USER || !process.env.SMTP_PASSWORD) throw new Error("Brak konfiguracji SMTP.");
  return nodemailer.createTransport({ host: process.env.SMTP_HOST, port: Number(process.env.SMTP_PORT ?? 465), secure: process.env.SMTP_SECURE !== "false", auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASSWORD } });
}

export async function sendContactEmails(data: { name: string; email: string; message: string }) {
  const from = process.env.SMTP_USER ?? "office.crevis@gmail.com";
  const to = process.env.CONTACT_TO ?? "office.crevis@gmail.com";
  const tx = transporter();
  await tx.sendMail({ from: `Crevis <${from}>`, to, replyTo: data.email, subject: `Nowe zapytanie od ${data.name}`, text: `Imię: ${data.name}\nE-mail: ${data.email}\n\n${data.message}` });
  await tx.sendMail({ from: `Crevis <${from}>`, to: data.email, replyTo: to, subject: "Otrzymaliśmy Twoją wiadomość — Crevis", text: `Cześć ${data.name},\n\ndziękujemy za wiadomość. Odezwiemy się w ciągu jednego dnia roboczego.\n\nZespół Crevis` });
}

export async function sendResetEmail(email: string, url: string) {
  await transporter().sendMail({ from: `Crevis <${process.env.SMTP_USER ?? "office.crevis@gmail.com"}>`, to: email, subject: "Reset hasła do panelu Crevis", text: `Aby ustawić nowe hasło, otwórz ten link:\n${url}\n\nJeśli to nie Ty, zignoruj wiadomość.` });
}
