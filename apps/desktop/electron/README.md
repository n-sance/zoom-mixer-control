# Electron Shell

Эта папка держит только desktop-оболочку. Источник интерфейса не живет здесь напрямую: свежий single-file build копируется в `renderer/index.html` через:

```bash
npm run prepare:electron
```

или автоматически из:

```bash
npm run desktop:dev
```

## Почему Electron пока

- быстро упаковать рабочий `html` в desktop app
- предсказуемый доступ к Web MIDI
- без переписывания текущего UI

Позже этот shell можно заменить или дополнить Tauri/другой оболочкой, не трогая `apps/web/src`.

