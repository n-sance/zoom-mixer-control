# Architecture

## Основная идея

Мы не привязываем исходники к конкретной desktop-технологии сильнее, чем нужно. Источник правды — веб-приложение, которое умеет собираться в один self-contained `html`. Уже поверх него сидит Electron shell для упаковки в desktop-app.

## Структура

### `apps/web/src`

- `index.template.html` — шаблон страницы
- `styles.css` — стили интерфейса
- `app.js` — вся логика контроллера, MIDI и config I/O

### `configs`

- `factory-default.json` — factory preset и mapping по умолчанию
- `config.schema.json` — схема экспортируемых/импортируемых конфигов

### `scripts`

- `build-single-html.mjs` — инлайнит CSS, JS и factory config в единый `dist/l6max-web-midi-controller.html`
- `sync-electron-shell.mjs` — подмешивает свежий web build в Electron renderer

### `apps/desktop/electron`

Минимальная desktop-оболочка:

- выдает окно приложения
- загружает локальный `index.html`
- включает Web MIDI permission flow
- готова для `electron-builder`

## Почему так

1. Один источник UI-логики.
2. Можно выпускать single-file `html` отдельно от desktop-сборки.
3. Конфиги живут как данные, а не как зашитые куски интерфейса.
4. Дальше можно без боли вынести `app.js` в отдельные модули, если логика разрастется.

## Ближайшие хорошие шаги

1. Вынести MIDI transport, state storage и config validation в отдельные модули.
2. Добавить preset library и несколько user configs в `configs/presets/`.
3. Добавить smoke-тест сборки и schema validation в CI.
4. При желании заменить Electron shell на Tauri, не трогая `apps/web/src`.

