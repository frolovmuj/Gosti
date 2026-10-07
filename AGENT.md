# AGENT.md — правила проекта «Гости»

«Гости» — MVP веб-приложения для кулинарии в Павловске (Воронежская область, проспект Революции, 100е). Сейчас это технический скелет: архитектура, инструменты и первые продуктовые экраны. Онлайн-заказ появится позже.

Страница магазина во ВКонтакте: [vk.ru/kulinargosty](https://vk.ru/kulinargosty) — используй её как источник информации о магазине (описание, ассортимент, контакты).

## Структура репозитория

```
gosti/
  backend/    # пока пустой
  frontend/   # Next.js-приложение
```

- `backend/` пуст. Не создавай там код, не придумывай API-эндпоинты и не вызывай несуществующие сервисы. Если нужны данные — используй моки в слое `entities/*/model` или `shared/api`, явно помеченные как моки.
- Каталоги независимы: монорепо и общего `package.json` нет. Все команды фронтенда выполняются из `frontend/`.

## Стек frontend

- Next.js (App Router), React, TypeScript (strict).
- Tailwind CSS v4 (настройка в CSS, без `tailwind.config.*`), `tw-animate-css`.
- shadcn/ui на Base UI (`@base-ui/react`), стиль `base-nova`, иконки `lucide-react`.
- Формы: `react-hook-form` + `zod` + `@hookform/resolvers`.
- Уведомления: `sonner`, тема: `next-themes`.
- Анимации: `framer-motion`; появление блоков при скролле — `Reveal` из `@shared/ui/reveal`.
- Менеджер пакетов — **только Yarn** (Yarn 4, `nodeLinker: node-modules`). Не используй npm/pnpm и не коммить `package-lock.json`/`pnpm-lock.yaml`.

## Архитектура: Feature-Sliced Design

```
frontend/
  app/          # Next.js App Router — ТОЛЬКО маршрутизация
  src/
    _app/       # FSD-слой app: корневой layout, провайдеры, глобальные стили
    _pages/     # FSD-слой pages: композиция экранов
    widgets/    # крупные самостоятельные блоки UI (header, ...)
    features/   # пользовательские сценарии (формы, действия)
    entities/   # бизнес-сущности (venue, dish, booking, ...)
    shared/     # переиспользуемое без бизнес-логики: ui, lib, config, api
```

Слои `app` и `pages` названы `_app` и `_pages`, потому что Next.js резервирует папки `app` и `pages`.

### Правила

1. **Импорты только вниз**: `_app → _pages → widgets → features → entities → shared`. Слой не может импортировать из своего уровня или выше.
2. **Нет кросс-импортов между слайсами одного слоя** (например, `features/a` не импортирует `features/b`).
3. **Public API**: каждый слайс (`_pages/*`, `widgets/*`, `features/*`, `entities/*`) экспортирует наружу только через `index.ts`. Импорт вглубь слайса (`@features/example-form/ui/...`) запрещён.
4. Внутри слайса — относительные импорты (`../model/schema`), между слоями — только алиасы.
5. Сегменты называй по назначению: `ui`, `model`, `api`, `lib`, `config`. Не используй `components`, `hooks`, `utils`, `types`, `helpers`.
6. `_app` и `shared` не делятся на слайсы, только на сегменты.
7. Файлы в `frontend/app/**` — тонкие реэкспорты:
   ```ts
   export { ExamplePage as default, metadata } from '@pages/example';
   ```
   Логику, разметку и данные в `app/` не пиши.

### Алиасы

| Алиас         | Путь              |
| ------------- | ----------------- |
| `@app/*`      | `src/_app/*`      |
| `@pages/*`    | `src/_pages/*`    |
| `@widgets/*`  | `src/widgets/*`   |
| `@features/*` | `src/features/*`  |
| `@entities/*` | `src/entities/*`  |
| `@shared/*`   | `src/shared/*`    |
| `~/*`, `@/*`  | `src/*`           |

## UI и shadcn

- Компоненты shadcn живут только в `src/shared/ui` (настроено в `components.json`). Добавлять их так: `yarn dlx shadcn@latest add <component>`.
- Сгенерированные компоненты можно править, но без бизнес-логики.
- Base UI использует проп `render` вместо `asChild`. Ссылку, стилизованную под кнопку, делай через `<Link className={buttonVariants({ variant: 'ghost' })}>` — так сохраняется роль `link`.
- Классы объединяй через `cn()` из пакета `cn`.
- Цвета берутся только из токенов темы (`bg-background`, `text-muted-foreground`, ...), без захардкоженных hex-значений. Поддерживай светлую и тёмную темы.
- Компоненты по умолчанию серверные. `'use client'` ставь только там, где нужны состояние, эффекты или браузерные API, и как можно ниже по дереву.

## Язык

- Тексты интерфейса — на русском.
- Код, имена файлов, слайсов и переменных — на английском, файлы в `kebab-case`.

## Форматирование и линтинг (обязательно)

Конфиги лежат в `frontend/`: `prettier.config.cjs`, `eslint.config.mjs`, `steiger.config.mjs`.

- Prettier: `printWidth` 85, одинарные кавычки, точки с запятой, `trailingComma: all`. Классы Tailwind сортирует `prettier-plugin-tailwindcss`.
- Порядок импортов задаёт `@trivago/prettier-plugin-sort-imports`, группы разделены пустой строкой:
  1. `react`
  2. `react-router*`
  3. сторонние пакеты (включая `next/*`)
  4. `@app/` → `@pages/` → `@widgets/` → `@features/` → `@entities/` → `@shared/`
  5. `~/`
  6. относительные (`./`, `../`)

  Не выстраивай импорты вручную — запусти `yarn format`.
- ESLint: `eslint-config-next` + `eslint-config-prettier` + запрет обхода public API.
- Steiger проверяет архитектуру FSD (`yarn lint:fsd`).

## Команды (из `frontend/`)

```bash
yarn install       # зависимости
yarn dev           # dev-сервер
yarn build         # production-сборка
yarn typecheck     # tsc
yarn lint          # eslint
yarn lint:fsd      # steiger (FSD)
yarn format        # prettier --write
yarn check         # typecheck + lint + lint:fsd + format:check
```

**Перед завершением любой задачи** выполни `yarn check` и `yarn build` — оба должны пройти без ошибок.
