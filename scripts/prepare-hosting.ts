import { loadEnvConfig } from "@next/env";

loadEnvConfig(process.cwd());

async function main() {
  if (!process.env.DATABASE_URL) {
    console.log("Brak DATABASE_URL — pomijam migracje i tworzenie administratora w lokalnym buildzie.");
    return;
  }

  const { migrate } = await import("./migrate");
  await migrate();
  const { createAdmin } = await import("./create-admin");
  await createAdmin();
}

void main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
