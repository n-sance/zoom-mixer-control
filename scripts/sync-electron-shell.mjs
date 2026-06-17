import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { buildSingleHtml } from "./build-single-html.mjs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, "..");

const electronRendererPath = path.join(projectRoot, "apps/desktop/electron/renderer/index.html");

async function syncElectronShell() {
  const distHtmlPath = await buildSingleHtml();
  await fs.mkdir(path.dirname(electronRendererPath), { recursive: true });
  await fs.copyFile(distHtmlPath, electronRendererPath);
  return { distHtmlPath, electronRendererPath };
}

const result = await syncElectronShell();
console.log(`Synced ${result.distHtmlPath} -> ${result.electronRendererPath}`);

