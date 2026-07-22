import { rm } from "fs/promises";
import { resolve } from "path";

async function main() {
  const buildDirectory = resolve(process.cwd(), ".next");
  await rm(buildDirectory, { recursive: true, force: true });
  console.log("Wyczyszczono poprzedni build Next.js.");
}

void main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
