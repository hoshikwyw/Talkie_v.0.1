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

## Android

The same codebase ships as an Android app through Capacitor. The native project
in `android/` is committed and is edited like any other source.

| Script                 | Description                                 |
| ---------------------- | ------------------------------------------- |
| `npm run mobile:build` | Build the web app and sync it into Android   |
| `npm run mobile:run`   | Build, install and launch on a device        |
| `npm run mobile:live`  | Run against the dev server with live reload  |
| `npm run mobile:open`  | Open the project in Android Studio           |

Requires a JDK 21 and the Android SDK (platform 36). iOS is not set up: it needs
macOS and Xcode, so `npx cap add ios` is a job for a Mac.

### Google sign-in on device

`signInWithPopup` cannot work inside a WebView — there is no opener window for
the result to post back to. On Android the app runs Google's native sign-in
sheet through `@capacitor-firebase/authentication`, takes the ID token it
returns and exchanges it for a JS SDK session. `skipNativeAuth` is enabled so
the plugin does not open a second, separate session on the native layer: the
Firebase JS SDK stays the only source of auth truth, which is what Firestore,
the auth observer and the route guard all read.

Email and password sign-in needs none of this and works through the JS SDK on
both platforms.

**This needs configuration that is not in the repository.** Until it is done,
the Android build still compiles and email sign-in works, but tapping *Google
Login* fails:

1. Firebase console → **Project settings** → **Your apps** → **Add app** →
   Android.
2. Package name: `com.talkie.app`.
3. Add your debug signing certificate **SHA-1**. Print it with:
   ```bash
   keytool -list -v -keystore ~/.android/debug.keystore \
     -alias androiddebugkey -storepass android -keypass android
   ```
   Add the release keystore's SHA-1 too when you publish — a release build
   signed with a different key is rejected until its fingerprint is registered.
4. Download `google-services.json` into `android/app/`. The Gradle plugin is
   applied only when that file is present, which is why the build works
   without it.
5. Rebuild: `npm run mobile:build && npm run mobile:run`.

If sign-in fails with `DEVELOPER_ERROR` or status code 10, the SHA-1 does not
match the one registered for this package name.

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
