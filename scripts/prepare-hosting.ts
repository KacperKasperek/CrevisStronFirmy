import { loadEnvConfig } from "@next/env";

loadEnvConfig(process.cwd());

async function main() {
  if (!process.env.DATABASE_URL) {
    console.log("Brak DATABASE_URL — pomijam migracje i tworzenie administratora w lokalnym buildzie.");
    return;
  }

  await import("./migrate");
  await import("./create-admin");
}

void main();
