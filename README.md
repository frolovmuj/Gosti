# Гости

Веб-приложение кулинарии [«Гости»](https://vk.ru/kulinargosty) в Павловске,
Воронежская область (проспект Революции, 100е). Сейчас это MVP: архитектура,
инструменты и первые продуктовые экраны. Онлайн-заказ появится позже.

Страница ВКонтакте — источник информации о заведении: описание, ассортимент,
контакты.

## Что уже есть

| Маршрут | Экран | Состояние |
| ------- | ----- | --------- |
| `/` | Главная: hero, меню, контакты | Меню из моков по ассортименту VK |
| `/auth` | Вход по телефону и через Яндекс ID | Демо: SMS не отправляется, любой 4-значный код подходит |

Бекенда нет. Данные и авторизация живут в моках (`entities/*/model`,
`shared/api`) и явно помечены как моки.

## Структура репозитория

```
gosti/
  backend/     # пустой, код туда не кладём
  frontend/    # Next.js-приложение
  AGENT.md     # правила разработки для людей и агентов
```

Каталоги независимы: монорепо и общего `package.json` нет. Все команды
фронтенда выполняются из `frontend/`.

Не создавайте код в `backend/`, не придумывайте API-эндпоинты и не вызывайте
несуществующие сервисы. Если нужны данные — моки в `entities/*/model` или
`shared/api`.

## Стек

- Next.js 16 (App Router), React 19, TypeScript (strict)
- Tailwind CSS v4 (настройка в CSS, без `tailwind.config.*`), `tw-animate-css`
- shadcn/ui на Base UI (`@base-ui/react`), стиль `base-nova`, иконки `lucide-react`
- Формы: `react-hook-form` + `zod` + `@hookform/resolvers`
- Уведомления: `sonner`; тема: `next-themes`
- Анимации: `framer-motion`; появление блоков при скролле — `Reveal` из `@shared/ui/reveal`
- Менеджер пакетов — **только Yarn 4** (`nodeLinker: node-modules`)

Не используйте npm/pnpm и не коммитьте `package-lock.json` / `pnpm-lock.yaml`.

## Быстрый старт

Нужны Node.js 20+ и [Yarn 4](https://yarnpkg.com/).

```bash
cd frontend
yarn install
yarn dev          # http://localhost:3000
```

Перед сдачей задачи:

```bash
yarn check        # typecheck + eslint + steiger + prettier
yarn build
```

Оба должны пройти без ошибок.

### Команды (`frontend/`)

| Команда | Назначение |
| ------- | ---------- |
| `yarn install` | Зависимости |
| `yarn dev` | Dev-сервер |
| `yarn build` | Production-сборка |
| `yarn start` | Запуск собранного приложения |
| `yarn typecheck` | `tsc --noEmit` |
| `yarn lint` | ESLint |
| `yarn lint:fsd` | Steiger (Feature-Sliced Design) |
| `yarn format` | Prettier `--write` |
| `yarn check` | typecheck + lint + lint:fsd + format:check |

Добавить компонент shadcn:

```bash
yarn dlx shadcn@latest add <component>
```

Компоненты живут только в `src/shared/ui`. Сгенерированные файлы можно править,
но без бизнес-логики.

## Архитектура: Feature-Sliced Design

```
frontend/
  app/          # Next.js App Router — только маршрутизация
  src/
    _app/       # корневой layout, провайдеры, глобальные стили
    _pages/     # композиция экранов
    widgets/    # крупные самостоятельные блоки UI
    features/   # пользовательские сценарии
    entities/   # бизнес-сущности (venue, dish, …)
    shared/     # ui, lib, config, api — без бизнес-логики
```

Слои `app` и `pages` названы `_app` и `_pages`, потому что Next.js резервирует
папки `app` и `pages`.

### Правила слоёв

1. **Импорты только вниз:** `_app → _pages → widgets → features → entities → shared`.
   Слой не импортирует из своего уровня или выше.
2. **Нет кросс-импортов** между слайсами одного слоя (`features/a` не тянет
   `features/b`).
3. **Public API:** слайс экспортирует наружу только через `index.ts`. Импорт
   вглубь (`@features/auth-form/ui/...`) запрещён.
4. Внутри слайса — относительные импорты, между слоями — только алиасы.
5. Сегменты: `ui`, `model`, `api`, `lib`, `config`. Не используйте `components`,
   `hooks`, `utils`, `types`, `helpers`.
6. `_app` и `shared` не делятся на слайсы, только на сегменты.
7. Файлы в `frontend/app/**` — тонкие реэкспорты, без логики и разметки:

```ts
export { HomePage as default } from '@pages/home';
```

### Алиасы

| Алиас | Путь |
| ----- | ---- |
| `@app/*` | `src/_app/*` |
| `@pages/*` | `src/_pages/*` |
| `@widgets/*` | `src/widgets/*` |
| `@features/*` | `src/features/*` |
| `@entities/*` | `src/entities/*` |
| `@shared/*` | `src/shared/*` |
| `~/*`, `@/*` | `src/*` |

## UI

- Классы объединяйте через `cn()` из пакета `cn`.
- Цвета — только токены темы (`bg-background`, `text-muted-foreground`, …),
  без hex. Нужны светлая и тёмная темы.
- Base UI использует проп `render` вместо `asChild`. Ссылку, стилизованную под
  кнопку: `<Link className={buttonVariants({ variant: 'ghost' })}>` — так
  сохраняется роль `link`.
- Компоненты по умолчанию серверные. `'use client'` — только там, где нужны
  состояние, эффекты или браузерные API, и как можно ниже по дереву.

## Язык и код

- Тексты интерфейса — на русском.
- Код, имена файлов, слайсов и переменных — на английском, файлы в `kebab-case`.

## Форматирование и линтинг

Конфиги в `frontend/`: `prettier.config.cjs`, `eslint.config.mjs`,
`steiger.config.mjs`.

- Prettier: `printWidth` 85, одинарные кавычки, точки с запятой,
  `trailingComma: all`. Классы Tailwind сортирует `prettier-plugin-tailwindcss`.
- Порядок импортов задаёт `@trivago/prettier-plugin-sort-imports`. Не выстраивайте
  импорты вручную — `yarn format`.
- ESLint: `eslint-config-next` + `eslint-config-prettier` + запрет обхода public API.
- Steiger проверяет архитектуру FSD (`yarn lint:fsd`).

Полный свод правил — в [AGENT.md](./AGENT.md).
