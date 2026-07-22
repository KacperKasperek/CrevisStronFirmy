import type { Metadata } from "next";
export const metadata: Metadata = { title: "Status projektu | Crevis", robots: { index: false, follow: false, nocache: true } };
export default function StatusLayout({ children }: { children: React.ReactNode }) { return children; }
