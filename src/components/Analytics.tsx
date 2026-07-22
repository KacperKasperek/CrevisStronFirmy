"use client";
import { useEffect, useState } from "react";

type EventName = "page_view" | "cta_click" | "form_start" | "form_submit";
const consentKey = "crevis-analytics-consent";
function sessionId() { let id = sessionStorage.getItem("crevis-session"); if (!id) { id = crypto.randomUUID(); sessionStorage.setItem("crevis-session", id); } return id; }
export function track(event: EventName, label?: string) {
  if (typeof window === "undefined" || localStorage.getItem(consentKey) !== "yes") return;
  const url = new URL(window.location.href); let referrerHost: string | undefined;
  try { referrerHost = document.referrer ? new URL(document.referrer).hostname : undefined; } catch { referrerHost = undefined; }
  void fetch("/api/analytics/events", { method: "POST", headers: { "content-type": "application/json" }, keepalive: true,
    body: JSON.stringify({ event, label, sessionId: sessionId(), path: `${url.pathname}${url.search}`, referrerHost, source: url.searchParams.get("utm_source") ?? undefined, medium: url.searchParams.get("utm_medium") ?? undefined, campaign: url.searchParams.get("utm_campaign") ?? undefined }) });
}
export default function Analytics() {
  const [choice, setChoice] = useState<string | null>(null);
  useEffect(() => { const saved = localStorage.getItem(consentKey); queueMicrotask(() => setChoice(saved)); if (saved === "yes") track("page_view"); }, []);
  useEffect(() => { const click = (event: MouseEvent) => { const target = (event.target as HTMLElement).closest<HTMLElement>("[data-track]"); if (target) track("cta_click", target.dataset.track); }; document.addEventListener("click", click); return () => document.removeEventListener("click", click); }, []);
  if (choice) return null;
  return <aside className="fixed bottom-4 left-4 right-4 z-[100] mx-auto max-w-3xl border border-paper/20 bg-ink p-5 text-paper shadow-2xl" aria-label="Ustawienia analityki">
    <p className="font-bold">Szanujemy Twoją prywatność</p><p className="mt-1 text-sm text-paper/70">Anonimowe statystyki pomagają nam ulepszać stronę. Nie zapisujemy adresu IP.</p>
    <div className="mt-4 flex gap-3"><button className="rounded-full bg-rust px-5 py-2 font-semibold" onClick={() => { localStorage.setItem(consentKey, "yes"); setChoice("yes"); track("page_view"); }}>Akceptuję</button><button className="rounded-full border border-paper/30 px-5 py-2" onClick={() => { localStorage.setItem(consentKey, "no"); setChoice("no"); }}>Odrzucam</button></div>
  </aside>;
}
