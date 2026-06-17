import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, "..");

const paths = {
  packageJson: path.join(projectRoot, "package.json"),
  template: path.join(projectRoot, "apps/web/src/index.template.html"),
  styles: path.join(projectRoot, "apps/web/src/styles.css"),
  appScript: path.join(projectRoot, "apps/web/src/app.js"),
  factoryConfig: path.join(projectRoot, "configs/factory-default.json"),
  distDir: path.join(projectRoot, "dist"),
  distHtml: path.join(projectRoot, "dist/l6max-web-midi-controller.html")
};

function escapeInlineScript(value) {
  return value.replaceAll("</script", "<\\/script");
}

export async function buildSingleHtml() {
  const [packageRaw, template, styles, appScriptRaw, factoryConfigRaw] = await Promise.all([
    fs.readFile(paths.packageJson, "utf8"),
    fs.readFile(paths.template, "utf8"),
    fs.readFile(paths.styles, "utf8"),
    fs.readFile(paths.appScript, "utf8"),
    fs.readFile(paths.factoryConfig, "utf8")
  ]);

  const packageJson = JSON.parse(packageRaw);
  const appScript = appScriptRaw.replaceAll("__APP_VERSION__", packageJson.version);
  const factoryConfig = JSON.stringify(JSON.parse(factoryConfigRaw));

  const html = template
    .replace("__INLINE_STYLES__", styles.trimEnd())
    .replace("__INLINE_FACTORY_CONFIG__", escapeInlineScript(factoryConfig))
    .replace("__INLINE_APP_SCRIPT__", escapeInlineScript(appScript.trimEnd()));

  await fs.mkdir(paths.distDir, { recursive: true });
  await fs.writeFile(paths.distHtml, html);

  return paths.distHtml;
}

if (import.meta.url === `file://${__filename}`) {
  const outputPath = await buildSingleHtml();
  console.log(`Built ${outputPath}`);
}

