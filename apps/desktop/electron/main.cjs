const path = require("node:path");
const { app, BrowserWindow, session } = require("electron");

app.commandLine.appendSwitch("enable-features", "WebMidi,WebMidiOnDedicatedWorkers");

function allowMidiPermissions() {
  const defaultSession = session.defaultSession;

  defaultSession.setPermissionRequestHandler((_webContents, permission, callback) => {
    callback(permission === "midi" || permission === "midiSysex");
  });

  if (typeof defaultSession.setPermissionCheckHandler === "function") {
    defaultSession.setPermissionCheckHandler((_webContents, permission) => {
      return permission === "midi" || permission === "midiSysex";
    });
  }
}

function createMainWindow() {
  const window = new BrowserWindow({
    width: 1480,
    height: 980,
    minWidth: 1080,
    minHeight: 720,
    backgroundColor: "#0e1116",
    title: "ZOOM L6 Max Controller",
    webPreferences: {
      preload: path.join(__dirname, "preload.cjs"),
      contextIsolation: true,
      sandbox: false,
      spellcheck: false
    }
  });

  window.loadFile(path.join(__dirname, "renderer", "index.html"));
}

app.whenReady().then(() => {
  allowMidiPermissions();
  createMainWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createMainWindow();
    }
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

