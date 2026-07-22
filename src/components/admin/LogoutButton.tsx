"use client";
import { authClient } from "@/lib/auth-client";
export default function LogoutButton() { return <button className="text-paper/60 hover:text-rust" onClick={async () => { await authClient.signOut(); window.location.href = "/panel/login"; }}>Wyloguj</button>; }
