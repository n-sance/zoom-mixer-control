# ZOOM L6 Max Controller

A simple controller app for the ZOOM L6 Max mixer.

It can run either as:

- a macOS desktop app
- a single-file HTML app that uses Web MIDI

## Download

Get the newest version here:

- [Latest release page](https://github.com/n-sance/zoom-mixer-control/releases/latest)
- [Download macOS app (.dmg, Apple Silicon)](https://github.com/n-sance/zoom-mixer-control/releases/latest/download/zoom-l6max-controller-macos-arm64.dmg)
- [Download macOS app (.zip, Apple Silicon)](https://github.com/n-sance/zoom-mixer-control/releases/latest/download/zoom-l6max-controller-macos-arm64.zip)
- [Download browser version (.html)](https://github.com/n-sance/zoom-mixer-control/releases/latest/download/l6max-web-midi-controller.html)
- [Download factory default config (.json)](https://github.com/n-sance/zoom-mixer-control/releases/latest/download/factory-default.json)

## Quick Start

### Option 1: macOS app

1. Download the `.dmg` or `.zip` from the links above.
2. Open the app.
3. Connect your ZOOM L6 Max over USB.
4. Click `Connect MIDI`.

### Option 2: browser version

1. Download `l6max-web-midi-controller.html`.
2. Open it in a Chromium-based browser.
3. Connect your ZOOM L6 Max over USB.
4. Click `Connect MIDI`.

Note: Web MIDI usually works best in Chromium or Electron. If you use the HTML version directly, a secure context may be required depending on your browser.

## Features

- live MIDI control for L6 Max mixer parameters
- config export and import as JSON
- factory default config included with releases
- self-contained HTML build
- macOS desktop packaging

## Release Assets

Every GitHub release currently publishes:

- `zoom-l6max-controller-macos-arm64.dmg`
- `zoom-l6max-controller-macos-arm64.zip`
- `l6max-web-midi-controller.html`
- `factory-default.json`

The release workflow lives in [`.github/workflows/release-html.yml`](/Users/nsance/code/vibe_projects/zoom-mixer-control/.github/workflows/release-html.yml).

To create a new release:

```bash
git tag v0.1.1
git push origin v0.1.1
```

GitHub Actions will create the release automatically and upload the current build artifacts.

## Build From Source

Install dependencies:

```bash
npm install
```

Build the single-file HTML app:

```bash
npm run build:html
```

Build the HTML app and prepare the Electron renderer:

```bash
npm run build
```

Run the desktop app locally:

```bash
npm run desktop:dev
```

Build the macOS desktop app:

```bash
npm run desktop:build:mac
```

Build the Windows package:

```bash
npm run desktop:build:win
```

## Configs

The default config and schema live here:

- [factory-default.json](/Users/nsance/code/vibe_projects/zoom-mixer-control/configs/factory-default.json)
- [config.schema.json](/Users/nsance/code/vibe_projects/zoom-mixer-control/configs/config.schema.json)

## Project Structure

- `apps/web/src/` - web UI source
- `apps/desktop/electron/` - Electron desktop shell
- `configs/` - config files and schema
- `scripts/` - build and sync scripts
- `docs/reference/original-single-file.html` - original single-file reference

## Developer Notes

Architecture notes live in [docs/architecture.md](/Users/nsance/code/vibe_projects/zoom-mixer-control/docs/architecture.md).
