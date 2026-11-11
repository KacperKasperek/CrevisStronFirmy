import type { Metadata } from "next";
import DemoHydraulika from "./DemoHydraulika";

export const metadata: Metadata = {
  title: { absolute: "Rura i Spółka — Hydraulik Kraków | Demo Crevis" },
  description: "Demo Crevis — strona fikcyjnego serwisu hydraulicznego w Krakowie.",
  robots: { index: false, follow: false, googleBot: { index: false, follow: false } },
};

export default function DemoHydraulikaPage() {
  return <DemoHydraulika />;
}
