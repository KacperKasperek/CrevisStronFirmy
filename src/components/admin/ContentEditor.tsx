"use client";

import { useState } from "react";
import { saveContentAction } from "@/app/panel/actions";
import type { SiteContent } from "@/lib/content";

const billingOptions = [
  { value: "zł/mies.", label: "Miesięczna" },
  { value: "zł jednorazowo", label: "Jednorazowa" },
  { value: "zł/rok", label: "Roczna" },
] as const;

export default function ContentEditor({ initial }: { initial: SiteContent }) {
  const [value, setValue] = useState(initial);
  const [saveState, setSaveState] = useState<"idle" | "saving" | "saved" | "error">("idle");

  const field = (
    label: string,
    current: string,
    onChange: (next: string) => void,
    multiline = false,
  ) => (
    <label className="grid gap-2">
      <span className="text-xs font-bold uppercase tracking-wider text-ink/50">{label}</span>
      {multiline ? (
        <textarea className="admin-field min-h-24" value={current} onChange={(event) => {
          setSaveState("idle");
          onChange(event.target.value);
        }} />
      ) : (
        <input className="admin-field" value={current} onChange={(event) => {
          setSaveState("idle");
          onChange(event.target.value);
        }} />
      )}
    </label>
  );

  const setPlan = (index: number, changes: Partial<SiteContent["offer"]["plans"][number]>) => {
    const plans = value.offer.plans.map((plan, planIndex) => planIndex === index ? { ...plan, ...changes } : plan);
    setValue({ ...value, offer: { ...value.offer, plans } });
    setSaveState("idle");
  };

  async function save() {
    setSaveState("saving");
    const formData = new FormData();
    formData.set("content", JSON.stringify(value));

    try {
      await saveContentAction(formData);
      setSaveState("saved");
    } catch {
      setSaveState("error");
    }
  }

  return (
    <div className="grid gap-7">
      <section className="bg-paper p-6">
        <h2 className="text-xl font-bold">Hero i kontakt</h2>
        <div className="mt-5 grid gap-4 lg:grid-cols-2">
          {field("Nagłówek hero", value.hero.title, (title) => setValue({ ...value, hero: { ...value.hero, title } }))}
          {field("Opis hero", value.hero.description, (description) => setValue({ ...value, hero: { ...value.hero, description } }), true)}
          {field("Nagłówek kontaktu", value.contact.title, (title) => setValue({ ...value, contact: { ...value.contact, title } }))}
          {field("Opis kontaktu", value.contact.description, (description) => setValue({ ...value, contact: { ...value.contact, description } }), true)}
          {field("E-mail", value.contact.email, (email) => setValue({ ...value, contact: { ...value.contact, email } }))}
          {field("Telefon", value.contact.phone, (phone) => setValue({ ...value, contact: { ...value.contact, phone } }))}
        </div>
      </section>

      <section className="bg-paper p-6">
        <h2 className="text-xl font-bold">Dlaczego my</h2>
        <div className="mt-5 grid gap-4">
          {field("Nagłówek", value.why.title, (title) => setValue({ ...value, why: { ...value.why, title } }))}
          {field("Opis", value.why.description, (description) => setValue({ ...value, why: { ...value.why, description } }), true)}
          <div className="grid gap-4 md:grid-cols-2">
            {value.why.features.map((item, index) => (
              <div key={index} className="border border-ink/10 p-4">
                {field("Tytuł", item.title, (title) => {
                  const features = [...value.why.features];
                  features[index] = { ...item, title };
                  setValue({ ...value, why: { ...value.why, features } });
                })}
                <div className="mt-3">
                  {field("Opis", item.text, (text) => {
                    const features = [...value.why.features];
                    features[index] = { ...item, text };
                    setValue({ ...value, why: { ...value.why, features } });
                  }, true)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-paper p-6">
        <h2 className="text-xl font-bold">Oferta</h2>
        <div className="mt-5">
          {field("Nagłówek", value.offer.title, (title) => setValue({ ...value, offer: { ...value.offer, title } }))}
        </div>
        <div className="mt-5 grid gap-4 lg:grid-cols-3">
          {value.offer.plans.map((plan, index) => {
            const isCustomBilling = !billingOptions.some((option) => option.value === plan.billingLabel);

            return (
              <div key={index} className="border-t-4 border-rust bg-mist p-4">
                <div className="grid gap-3">
                  {field("Nazwa", plan.name, (name) => setPlan(index, { name }))}
                  {field("Cena", plan.price, (price) => setPlan(index, { price }))}
                  <label className="grid gap-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-ink/50">Rodzaj opłaty</span>
                    <select
                      className="admin-field"
                      value={isCustomBilling ? "custom" : plan.billingLabel}
                      onChange={(event) => setPlan(index, {
                        billingLabel: event.target.value === "custom" ? "zł" : event.target.value,
                      })}
                    >
                      {billingOptions.map((option) => (
                        <option key={option.value} value={option.value}>{option.label} ({option.value})</option>
                      ))}
                      <option value="custom">Własna etykieta</option>
                    </select>
                  </label>
                  {isCustomBilling && field("Etykieta przy cenie", plan.billingLabel, (billingLabel) => setPlan(index, { billingLabel }))}
                  {field("CTA", plan.cta, (cta) => setPlan(index, { cta }))}
                  {field("Elementy (jeden w linii)", plan.features.join("\n"), (text) => setPlan(index, { features: text.split("\n").filter(Boolean) }), true)}
                  <label className="flex gap-2 text-sm">
                    <input
                      type="checkbox"
                      checked={plan.featured}
                      onChange={(event) => {
                        const plans = value.offer.plans.map((item, planIndex) => ({
                          ...item,
                          featured: planIndex === index ? event.target.checked : false,
                        }));
                        setValue({ ...value, offer: { ...value.offer, plans } });
                        setSaveState("idle");
                      }}
                    />
                    Wyróżniony
                  </label>
                </div>
              </div>
            );
          })}
        </div>
        <div className="mt-5">
          {field("W każdym pakiecie (jeden w linii)", value.offer.included.join("\n"), (text) => setValue({ ...value, offer: { ...value.offer, included: text.split("\n").filter(Boolean) } }), true)}
        </div>
      </section>

      <section className="bg-paper p-6">
        <div className="flex justify-between">
          <h2 className="text-xl font-bold">FAQ</h2>
          <button
            type="button"
            onClick={() => setValue({ ...value, faq: { ...value.faq, items: [...value.faq.items, { q: "Nowe pytanie", a: "Wpisz odpowiedź na nowe pytanie." }] } })}
            className="text-sm font-bold text-rust"
          >
            + Dodaj pytanie
          </button>
        </div>
        <div className="mt-5">
          {field("Nagłówek", value.faq.title, (title) => setValue({ ...value, faq: { ...value.faq, title } }))}
        </div>
        <div className="mt-5 grid gap-4">
          {value.faq.items.map((item, index) => (
            <div key={index} className="grid gap-3 border border-ink/10 p-4 sm:grid-cols-[1fr_1fr_auto]">
              <input
                aria-label={`Pytanie ${index + 1}`}
                className="admin-field"
                value={item.q}
                onChange={(event) => {
                  const items = [...value.faq.items];
                  items[index] = { ...item, q: event.target.value };
                  setValue({ ...value, faq: { ...value.faq, items } });
                }}
              />
              <textarea
                aria-label={`Odpowiedź ${index + 1}`}
                className="admin-field"
                value={item.a}
                onChange={(event) => {
                  const items = [...value.faq.items];
                  items[index] = { ...item, a: event.target.value };
                  setValue({ ...value, faq: { ...value.faq, items } });
                }}
              />
              <div className="flex gap-2 sm:flex-col">
                <button type="button" onClick={() => {
                  const items = [...value.faq.items];
                  if (index) [items[index - 1], items[index]] = [items[index], items[index - 1]];
                  setValue({ ...value, faq: { ...value.faq, items } });
                }} aria-label="Przenieś wyżej">↑</button>
                <button type="button" onClick={() => {
                  const items = [...value.faq.items];
                  if (index < items.length - 1) [items[index + 1], items[index]] = [items[index], items[index + 1]];
                  setValue({ ...value, faq: { ...value.faq, items } });
                }} aria-label="Przenieś niżej">↓</button>
                <button
                  type="button"
                  onClick={() => setValue({ ...value, faq: { ...value.faq, items: value.faq.items.filter((_, itemIndex) => itemIndex !== index) } })}
                  className="text-red-700"
                  aria-label="Usuń"
                >
                  ×
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="sticky bottom-4 flex flex-wrap items-center justify-end gap-4 border border-ink/10 bg-paper/95 p-4 shadow-xl backdrop-blur">
        <span className="mr-auto text-sm font-bold" aria-live="polite">
          {saveState === "saved" && <span className="text-green-700">Opublikowano zmiany.</span>}
          {saveState === "error" && <span className="text-red-700">Nie udało się zapisać. Sprawdź pola i spróbuj ponownie.</span>}
        </span>
        <a href="/" target="_blank" rel="noreferrer" className="border border-ink px-5 py-3 font-bold">Podgląd</a>
        <button
          type="button"
          onClick={save}
          disabled={saveState === "saving"}
          className="bg-rust px-6 py-3 font-bold text-paper disabled:cursor-wait disabled:opacity-60"
        >
          {saveState === "saving" ? "Publikowanie…" : "Zapisz i opublikuj"}
        </button>
      </div>
    </div>
  );
}
