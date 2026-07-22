import type { ReactNode } from "react";
export default function Pill({ href, children, variant = "rust", className = "", "data-track": dataTrack }: { href: string; children: ReactNode; variant?: "rust" | "outline"; className?: string; "data-track"?: string }) {
  return <a href={href} data-track={dataTrack} className={`inline-flex items-center justify-center rounded-full px-7 py-3 font-bold transition ${variant === "rust" ? "bg-rust text-paper hover:bg-rust-dark" : "border border-paper/60 text-paper hover:border-rust hover:text-rust"} ${className}`}>{children}</a>;
}
