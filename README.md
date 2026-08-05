# Talkie

A real-time chat application with a cozy pixel-art inspired design, built with React and Firebase.

## Features

- **Real-time messaging** — messages sync instantly via Firestore listeners
- **Google & email authentication** — sign in with Google or an email/password account
- **Message grouping** — consecutive messages from one sender collapse into a single turn, with day separators
- **Message actions** — copy any message, delete your own
- **User blocking** — block/unblock with bidirectional detection
- **Emoji picker** — loaded on demand, not in the initial bundle
- **Five colour themes** — Midnight, Sakura, Forest, Ocean, Ember
- **Four bubble styles** — Modern, Pixel, Cloud, Sharp
- **Search** — filter conversations by username
- **Responsive** — one sidebar component serves the desktop column and the mobile slide-over
- **Persistent preferences** — theme and bubble style saved to `localStorage`

## Tech stack

| Layer     | Technology                                       |
| --------- | ------------------------------------------------ |
| Framework | React 18                                         |
| Build     | Vite 5                                           |
| Styling   | Tailwind CSS 3, themed with CSS variables        |
| State     | Zustand 4                                        |
| Routing   | React Router 6                                   |
| Backend   | Firebase (Auth, Firestore)                       |
| Fonts     | Press Start 2P (headings), VT323 (body)          |
| UI        | react-icons, emoji-picker-react, avvvatars-react |
| Toasts    | react-toastify                                   |

## Getting started

```bash
npm install
cp .env.example .env   # fill in your Firebase project credentials
npm run dev
```

| Script            | Description                     |
| ----------------- | ------------------------------- |
| `npm run dev`     | Start the dev server            |
| `npm run build`   | Production build into `dist/`   |
| `npm run preview` | Serve the production build      |
| `npm run lint`    | ESLint, zero warnings tolerated |

## Project structure

```
src/
├── app/          Application shell — routes, header, home layout
├── features/     One folder per product area
│   ├── auth/     Sign in, sign up, route guard
│   ├── chat/     Conversation panel, messages, detail panel
│   ├── contacts/ Conversation list, add friend
│   ├── profile/  Profile editor
│   └── settings/ Theme and bubble style
├── services/     Firebase client and data access (auth, chat, user)
├── shared/       Cross-feature code
│   ├── ui/       Presentational primitives
│   ├── hooks/    Reusable behaviour
│   ├── lib/      Pure helpers (dates, validation, class names)
│   └── theme/    Design tokens and the theme store
├── stores/       Zustand stores (user, active chat, chat list)
└── styles/       Tailwind entry and component layer
```

Imports use the `@/` alias for `src/`, configured in both `vite.config.js` and `jsconfig.json`.

### Conventions

- **Features do not import each other's internals.** `app/` composes features; anything genuinely shared moves to `shared/`.
- **Components do not talk to Firebase.** All reads and writes go through `services/`.
- **Components do not read colour values in JavaScript.** Themes are CSS variables — use the Tailwind utilities (`bg-surface`, `text-muted`, `border-muted/15`) so a theme change costs no renders.

## Theming

`src/shared/theme/tokens.js` holds every theme as plain data. `applyTheme` converts the hex values into `R G B` triplets and writes them to `<html>` as CSS variables, which `tailwind.config.js` maps onto the colour scale. Switching a theme is a variable write rather than a re-render, and opacity modifiers keep working (`bg-primary/20`).

To add a theme, add one entry to `THEMES` — no component changes are needed.

## Data model

```
users/{userId}       { id, username, email, profile, blocked: string[] }
chats/{chatId}       { createdAt, messages: Message[] }
userchats/{userId}   { chats: ChatSummary[] }
```

`ChatSummary` is the sidebar row: `{ chatId, receiverId, lastMessage, updatedAt, isSeen }`. Every mutation of one goes through a transaction in `services/chatService.js`, so a concurrent message cannot clobber a read receipt.

The conversation list is backed by a single reference-counted Firestore listener in `stores/chatListStore.js`, shared by every consumer.

### Known limitation

`messages` is an array on a single document, so each send rewrites the whole array and a long conversation will eventually reach Firestore's 1 MB document limit. The fix is a `messages` subcollection with pagination, which needs a migration and a backfill.
