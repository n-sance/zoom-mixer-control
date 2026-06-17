# ZOOM L6 Max Controller

Проект развернут из исходного single-file `html` в структуру, с которой уже удобно жить в GitHub и дальше растить десктопные сборки.

## Что внутри

- `apps/web/src/` — исходники веб-интерфейса
- `apps/desktop/electron/` — desktop-shell под Electron для macOS/Windows
- `configs/` — factory config и JSON schema для импортируемых/экспортируемых конфигов
- `scripts/` — сборка single-file `html` и синхронизация web-артефакта в desktop-shell
- `docs/reference/original-single-file.html` — исходный референс до реструктуризации

## Быстрый старт

Собрать единый `html`:

```bash
npm run build:html
```

Собрать `html` и подготовить Electron shell:

```bash
npm run build
```

После `npm install` можно запускать desktop-оболочку:

```bash
npm run desktop:dev
```

Сборка desktop-приложений:

```bash
npm run desktop:build:mac
npm run desktop:build:win
```

## GitHub Releases

В репозитории есть workflow [`.github/workflows/release-html.yml`](/Users/nsance/code/vibe_projects/zoom-mixer-control/.github/workflows/release-html.yml).

Что он делает:

- на `git push` тега вида `v*` сам создает GitHub Release
- собирает `dist/l6max-web-midi-controller.html`
- прикладывает к Release два готовых asset-файла: `l6max-web-midi-controller.html` и `factory-default.json`
- параллельно сохраняет оба файла в workflow artifacts

Базовый поток:

1. создать тег, например `v0.1.0`
2. запушить его: `git push origin v0.1.0`
3. GitHub Actions сам создаст Release и приложит готовые asset-файлы

## Конфиги

В интерфейсе уже есть:

- экспорт текущего конфига в JSON
- импорт JSON-конфига
- сброс к factory defaults

Базовый формат лежит в [configs/factory-default.json](/Users/nsance/code/vibe_projects/zoom-mixer-control/configs/factory-default.json) и описан схемой [configs/config.schema.json](/Users/nsance/code/vibe_projects/zoom-mixer-control/configs/config.schema.json).

## Куда смотреть дальше

- [docs/architecture.md](/Users/nsance/code/vibe_projects/zoom-mixer-control/docs/architecture.md)
- [apps/desktop/electron/package.json](/Users/nsance/code/vibe_projects/zoom-mixer-control/apps/desktop/electron/package.json)
