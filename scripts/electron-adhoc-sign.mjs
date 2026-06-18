import fs from "node:fs/promises";
import path from "node:path";
import { spawn } from "node:child_process";

function run(command, args) {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, {
      stdio: "pipe",
    });

    let stdout = "";
    let stderr = "";

    child.stdout.on("data", (chunk) => {
      stdout += chunk.toString();
    });

    child.stderr.on("data", (chunk) => {
      stderr += chunk.toString();
    });

    child.on("error", reject);
    child.on("close", (code) => {
      if (code === 0) {
        resolve({ stdout, stderr });
        return;
      }

      const error = new Error(
        `${command} ${args.join(" ")} exited with code ${code}\n${stderr || stdout}`.trim()
      );
      error.code = code;
      error.stdout = stdout;
      error.stderr = stderr;
      reject(error);
    });
  });
}

async function exists(targetPath) {
  try {
    await fs.access(targetPath);
    return true;
  } catch {
    return false;
  }
}

async function verifyCodeSignature(appPath) {
  await run("codesign", ["--verify", "--deep", "--strict", "--verbose=1", appPath]);
}

export async function afterPack(context) {
  if (process.platform !== "darwin" || context.electronPlatformName !== "darwin") {
    return;
  }

  const appName = `${context.packager.appInfo.productFilename}.app`;
  const appPath = path.join(context.appOutDir, appName);

  if (!(await exists(appPath))) {
    throw new Error(`Expected macOS app bundle was not found at ${appPath}`);
  }

  try {
    await verifyCodeSignature(appPath);
    console.log(`[afterPack] macOS bundle signature is already valid: ${appPath}`);
    return;
  } catch (error) {
    console.warn(`[afterPack] macOS bundle signature is invalid, applying ad-hoc signing: ${appPath}`);
    console.warn(String(error.message || error));
  }

  await run("codesign", ["--force", "--deep", "--sign", "-", appPath]);
  await verifyCodeSignature(appPath);
  console.log(`[afterPack] ad-hoc signing completed: ${appPath}`);
}
