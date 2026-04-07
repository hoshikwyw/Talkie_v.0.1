# Walkie Talkie

A real-time chat application with a cozy pixel-art inspired design, built with React and Firebase.

## Features

- **Real-time messaging** — Messages sync instantly via Firestore listeners
- **Google & Email authentication** — Sign in with Google or create an account with email/password
- **Image sharing** — Upload and share images in chat via Firebase Storage
- **User blocking** — Block/unblock users with bidirectional detection
- **Emoji picker** — Quick emoji insertion in messages
- **Customizable themes** — 5 color themes (Midnight, Sakura, Forest, Ocean, Ember)
- **Customizable chat bubbles** — 4 bubble styles (Modern, Pixel, Cloud, Sharp)
- **Profile management** — Update username and profile photo
- **Search** — Filter conversations by username
- **Responsive** — Mobile-first with slide-over panels for sidebar and chat details
- **Persistent preferences** — Theme and bubble style saved to localStorage

## Tech Stack

| Layer            | Technology                                      |
| ---------------- | ----------------------------------------------- |
| Framework        | React 18                                        |
| Build Tool       | Vite 5                                          |
| Styling          | Tailwind CSS 3 + DaisyUI 4 (custom theme)       |
| State Management | Zustand 4                                       |
| Routing          | React Router DOM 6                              |
| Backend          | Firebase (Auth, Firestore, Storage)              |
| Fonts            | Press Start 2P (headings), VT323 (body)          |
| UI Libraries     | react-icons, emoji-picker-react, avvvatars-react |
| Notifications    | react-toastify                                   |

## Project Structure

```
src/
├── pages/                          # Route-level page components
│   ├── Home.jsx                    # Main chat layout (sidebar + chat + detail)
│   ├── Login.jsx                   # Login page with email & Google auth
│   ├── Register.jsx                # Registration page with validation
│   ├── Profile.jsx                 # Edit profile (username, avatar)
│   └── Settings.jsx                # Theme & bubble style customization
│
├── components/
│   ├── layout/                     # App-level layout components
│   │   ├── Navbar.jsx              # Top navigation bar with user dropdown
│   │   ├── AuthGuard.jsx           # Route protection (redirects if unauthenticated)
│   │   └── ErrorBoundary.jsx       # React error boundary with fallback UI
│   │
│   ├── chat/                       # Chat-related components
│   │   ├── Chat.jsx                # Chat view (messages list + input bar)
│   │   ├── ChatBubble.jsx          # Individual message bubble with timestamp
│   │   └── ChatHead.jsx            # Chat header (user info + online status)
│   │
│   ├── sidebar/                    # Sidebar & user list components
│   │   ├── SideList.jsx            # Desktop sidebar chat list
│   │   ├── ChatList.jsx            # Mobile slide-over chat list
│   │   ├── AddUser.jsx             # Search & add new friend modal
│   │   ├── UserInfo.jsx            # Chat list item (avatar + name + last message)
│   │   └── Avatar.jsx              # Reusable avatar component with online indicator
│   │
│   └── detail/                     # Chat detail panel components
│       ├── Detail.jsx              # Detail panel wrapper
│       ├── UserCard.jsx            # User profile card (avatar + name)
│       ├── ChatSettings.jsx        # Delete chat & block user actions
│       └── SharedImgs.jsx          # Shared photos gallery
│
├── lib/
│   ├── firebase.js                 # Firebase initialization & Google sign-in
│   ├── upload.js                   # Firebase Storage file upload helper
│   ├── userStore.js                # Zustand store for current user state
│   ├── chatStore.js                # Zustand store for active chat state
│   ├── themeStore.js               # Zustand store for theme & bubble preferences
│   │
│   ├── services/                   # Firebase business logic (extracted from components)
│   │   ├── chatService.js          # Chat CRUD, subscriptions, transactions
│   │   └── userService.js          # User CRUD, profile updates
│   │
│   └── hooks/                      # Custom React hooks
│       └── useChatList.js          # Shared hook for chat list (used by SideList & ChatList)
│
├── styles/
│   └── index.css                   # Global styles, Tailwind directives, custom components
│
├── App.jsx                         # Root component (auth listener, routes, toast)
└── main.jsx                        # Entry point (React DOM render + BrowserRouter)
```

## Getting Started

### Prerequisites

- Node.js 18+
- A Firebase project with Authentication, Firestore, and Storage enabled

### Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/hoshikwyw/talkie.git
   cd talkie
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file from the example:
   ```bash
   cp .env.example .env
   ```

4. Fill in your Firebase config values in `.env`:
   ```
   VITE_API_KEY=your_api_key
   VITE_AUTH_DOMAIN=your_project.firebaseapp.com
   VITE_PROJECT_ID=your_project_id
   VITE_STORAGE_BUCKET=your_project.appspot.com
   VITE_MESSAGING_SENDER_ID=your_sender_id
   VITE_APP_ID=your_app_id
   VITE_MEASUREMENT_ID=your_measurement_id
   ```

5. Start the development server:
   ```bash
   npm run dev
   ```

### Firebase Setup

Enable the following in your Firebase Console:

- **Authentication** — Enable Email/Password and Google sign-in providers
- **Cloud Firestore** — Create database with the following collections:
  - `users` — User profiles (`username`, `email`, `profile`, `id`, `blocked[]`)
  - `userchats` — Per-user chat references (`chats[]` with `chatId`, `receiverId`, `lastMessage`, `updatedAt`, `isSeen`)
  - `chats` — Chat documents (`messages[]`, `createdAt`)
- **Storage** — Enable for image uploads

## Available Scripts

| Command           | Description                |
| ----------------- | -------------------------- |
| `npm run dev`     | Start dev server           |
| `npm run build`   | Production build           |
| `npm run preview` | Preview production build   |
| `npm run lint`    | Run ESLint                 |

## Architecture Highlights

- **Service layer** — All Firestore operations are in `chatService.js` and `userService.js`, keeping components clean
- **Firestore transactions** — Message sending uses `runTransaction` to prevent race conditions when updating `userchats`
- **Global auth listener** — Single `onAuthStateChanged` in `App.jsx` keeps the user store in sync across all routes
- **Theme system** — Zustand store with 5 themes and 4 bubble styles, persisted to localStorage, applied via inline styles for instant switching
- **Shared hooks** — `useChatList` deduplicates logic between desktop sidebar and mobile chat list
