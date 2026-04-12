# 🎬 YouTube Clone

A full-stack YouTube clone built with **React** (frontend) and **Express + MongoDB** (backend). Users can sign up, log in, browse videos by category, search for content, watch videos with an embedded player, view channel details, and save favourite videos to a personal "Watch Later" list — all powered by the **YouTube v3 API** via RapidAPI.

---

## 📑 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Architecture Overview](#-architecture-overview)
- [Frontend Deep-Dive](#-frontend-deep-dive)
  - [Routing](#routing)
  - [Components](#components)
  - [Context API (State Management)](#context-api-state-management)
  - [Utilities](#utilities)
  - [Styling](#styling)
- [Backend Deep-Dive](#-backend-deep-dive)
  - [Server Setup](#server-setup)
  - [Database](#database)
  - [Models](#models)
  - [Middleware](#middleware)
  - [API Routes](#api-routes)
- [Authentication Flow](#-authentication-flow)
- [Watch Later / Saved Videos Flow](#-watch-later--saved-videos-flow)
- [Environment Variables](#-environment-variables)
- [Getting Started](#-getting-started)
- [Available Scripts](#-available-scripts)
- [API Endpoints Reference](#-api-endpoints-reference)

---

## ✨ Features

| Feature | Description |
|---|---|
| **User Authentication** | Sign up & log in with email/password. Passwords hashed with bcrypt. JWT-based session via `localStorage`. |
| **Category Browsing** | Sidebar with 17 pre-defined categories (New, Coding, ReactJS, Music, Gaming, etc.). Clicking a category fetches videos from YouTube API. |
| **Video Search** | Search bar in the navbar lets users search YouTube. Results displayed on a dedicated search-results page. |
| **Video Playback** | Embedded `ReactPlayer` for watching YouTube videos directly in-app. Shows view count, like count, channel info, and related videos. |
| **Channel Pages** | View channel details with a gradient banner, profile picture, subscriber count, and the channel's latest videos. |
| **Watch Later (Favourites)** | Save any video to your personal list. Videos are stored per-user in MongoDB. Remove saved videos at any time. |
| **Responsive Design** | Fully responsive — mobile-first layout using TailwindCSS. Sidebar collapses to horizontal scrollable bar on small screens. |
| **Dark Theme** | YouTube-inspired dark UI with custom scrollbars, hover glow effects, and fade-in animations. |

---

## 🛠 Tech Stack

### Frontend
| Technology | Purpose |
|---|---|
| **React 18** | UI library (functional components, hooks) |
| **React Router v6** | Client-side routing |
| **React Player** | Embedded YouTube video player |
| **MUI (Material UI) v5** | Icons (`@mui/icons-material`) and styled components |
| **TailwindCSS 3** | Utility-first CSS framework |
| **Axios** | HTTP client for YouTube API requests |
| **Context API** | Global state management for saved videos |

### Backend
| Technology | Purpose |
|---|---|
| **Express 5** | REST API framework |
| **MongoDB + Mongoose** | NoSQL database & ODM |
| **bcryptjs** | Password hashing |
| **jsonwebtoken (JWT)** | Token-based authentication |
| **express-validator** | Request body validation |
| **CORS** | Cross-origin resource sharing |
| **Nodemon** | Dev server auto-restart |

### External APIs
| API | Purpose |
|---|---|
| **YouTube v3 (RapidAPI)** | Fetching videos, channels, search results, and statistics |

---

## 📁 Project Structure

```
youtube2/
├── backend/                    # Express.js backend
│   ├── db.js                   # MongoDB connection
│   ├── index.js                # Server entry point (port 5000)
│   ├── package.json            # Backend dependencies
│   ├── middlewear/
│   │   └── fetchuser.js        # JWT authentication middleware
│   ├── models/
│   │   ├── User.js             # User schema (name, email, password)
│   │   └── Note.js             # Saved video schema (title, channel, URLs)
│   └── routes/
│       ├── auto.js             # Auth routes (signup, login, getuser)
│       └── note.js             # Saved videos CRUD routes
│
├── public/                     # Static assets (favicon, manifest)
│   └── index.html              # HTML entry point
│
├── src/                        # React frontend source
│   ├── index.js                # React DOM entry point
│   ├── index.css               # Global styles (Tailwind directives, scrollbar)
│   ├── App.js                  # Root component with routing
│   ├── components/
│   │   ├── Navbar.jsx          # Top navigation bar (logo, auth, search)
│   │   ├── Feed.jsx            # Home feed with sidebar + video grid
│   │   ├── Sidebar.jsx         # Category navigation sidebar
│   │   ├── Searchbar.jsx       # Search input component
│   │   ├── Searchfeed.jsx      # Search results page
│   │   ├── Videos.jsx          # Video/channel card list renderer
│   │   ├── Videocard.jsx       # Individual video thumbnail card
│   │   ├── Videodetail.jsx     # Video player page with details
│   │   ├── Channelcard.jsx     # Channel avatar/info card
│   │   ├── Channeldetail.jsx   # Channel page with their videos
│   │   ├── LoginPage.jsx       # Login form
│   │   ├── SignUp.jsx          # Registration form
│   │   ├── Savevideo.jsx       # Watch Later list page
│   │   ├── Savedcards.jsx      # Individual saved video card
│   │   └── Style.css           # Additional sidebar scrollbar styles
│   ├── context/
│   │   ├── NoteContext.js      # React Context definition
│   │   └── NoteState.js        # Context Provider (CRUD operations)
│   └── utils/
│       ├── FetchAPI.js         # YouTube API fetch wrapper (Axios)
│       └── constant.js         # Categories, demo URLs, logo URL
│
├── Env.env                     # Environment variables (RapidAPI key)
├── tailwind.config.js          # Tailwind configuration
├── postcss.config.js           # PostCSS configuration
├── package.json                # Frontend dependencies & scripts
└── .gitignore
```

---

## 🏗 Architecture Overview

```
┌─────────────────────────────────────────────────────────────┐
│                         BROWSER                             │
│                                                             │
│  ┌──────────┐   ┌──────────────┐   ┌────────────────────┐  │
│  │  React   │──▶│ React Router │──▶│    Components      │  │
│  │  App     │   │   (v6)       │   │  (Feed, Video,     │  │
│  └──────────┘   └──────────────┘   │   Channel, etc.)   │  │
│       │                            └────────┬───────────┘  │
│       │                                     │              │
│  ┌────▼─────┐                    ┌──────────▼──────────┐   │
│  │ Context  │                    │   YouTube v3 API    │   │
│  │ (Notes)  │                    │   (via RapidAPI)    │   │
│  └────┬─────┘                    └─────────────────────┘   │
│       │                                                     │
└───────┼─────────────────────────────────────────────────────┘
        │  HTTP (fetch)
        ▼
┌───────────────────────────────────────┐
│         EXPRESS BACKEND (:5000)       │
│                                       │
│  ┌─────────────┐  ┌───────────────┐  │
│  │ /api/auto   │  │  /api/note    │  │
│  │ (Auth)      │  │  (Saved Vids) │  │
│  └──────┬──────┘  └───────┬───────┘  │
│         │                  │          │
│  ┌──────▼──────────────────▼───────┐  │
│  │       MongoDB (mongoose)        │  │
│  │   Collections: users, notes     │  │
│  └─────────────────────────────────┘  │
└───────────────────────────────────────┘
```

---

## 🖥 Frontend Deep-Dive

### Routing

Defined in `App.js` using React Router v6:

| Path | Component | Description |
|---|---|---|
| `/` | `Feed` | Home page — sidebar categories + video grid |
| `/video/:id` | `Videodetail` | Video player with details and related videos |
| `/channel/:id` | `Channeldetail` | Channel profile page with their videos |
| `/search/:searchTerm` | `Searchfeed` | Search results page |
| `/login` | `LoginPage` | User login form |
| `/signup` | `SignUp` | User registration form |
| `/save` | `Savevideo` | Watch Later / saved videos list |

All routes are wrapped inside `<NoteState>` (Context Provider) for global state access.

### Components

#### `Navbar.jsx`
- Sticky top navigation bar with black background.
- Displays the YouTube-style logo (linked to home).
- **Unauthenticated**: Shows Login/Signup links.
- **Authenticated**: Shows a Logout button and the `Searchbar`.
- Auth state is checked via `localStorage.getItem("token")`.

#### `Feed.jsx`
- Main content page split into sidebar + video grid.
- Redirects unauthenticated users to `/login`.
- Fetches videos from YouTube API based on the selected category.
- Responsive layout: sidebar is vertical on desktop, horizontal scrollable on mobile.

#### `Sidebar.jsx`
- Lists 17 category buttons from `constant.js`.
- Includes a "Watch Later" button at the top that navigates to `/save`.
- Active category is highlighted with a red (`#FC1503`) background.
- Category icons are displayed using MUI icons.

#### `Searchbar.jsx`
- Controlled input with MUI `SearchIcon`.
- On submit, navigates to `/search/{searchTerm}`.
- Styled with a rounded dark container, red hover/focus border, and subtle glow effect.

#### `Searchfeed.jsx`
- Reads `searchTerm` from URL params.
- Fetches search results from YouTube API and renders via `Videos` component.

#### `Videos.jsx`
- Generic renderer that maps over a list of video/channel items.
- Renders `Videocard` for video items and `Channelcard` for channel items.
- Supports `row` and `column` layout directions.
- Adds staggered fade-in animation to each card.

#### `Videocard.jsx`
- Displays video thumbnail, title (truncated to 60 chars), and channel name.
- Links to `/video/{videoId}` and `/channel/{channelId}`.
- Hover effects: scale up, red glow shadow.
- Uses MUI `CheckCircle` verified badge next to channel name.

#### `Videodetail.jsx`
- Full video player page using `ReactPlayer`.
- Fetches video details (snippet + statistics) and related videos.
- Displays title, channel (linked), view count, and like count.
- **"Add Fav" button**: Saves the video to the user's Watch Later list via Context API (`addnote`).
- Related videos shown in a side column.

#### `Channelcard.jsx`
- Circular channel profile picture with hover scale effect.
- Displays channel name with verified badge and subscriber count.
- Links to the channel detail page.

#### `Channeldetail.jsx`
- Full channel page with a gradient banner at the top.
- Renders `Channelcard` (offset upward over the banner).
- Lists the channel's latest videos below.

#### `LoginPage.jsx`
- Email/password login form.
- Sends POST to `/api/auto/login`.
- On success, stores JWT in `localStorage` and redirects to `/`.

#### `SignUp.jsx`
- Name/email/password registration form.
- Sends POST to `/api/auto/createuser`.
- On success, stores JWT in `localStorage` and redirects to `/`.

#### `Savevideo.jsx`
- Displays the user's saved (favourite) videos.
- Fetches saved videos on mount via `getNotes()` from Context.
- Renders each saved video as a `Savedcards` component.
- Dark gradient background (black → dark red).

#### `Savedcards.jsx`
- Similar to `Videocard` but for saved videos.
- Shows thumbnail, title, channel name.
- Includes a **"Remove"** button that calls `Deletenote(id)` from Context to delete the saved video.

### Context API (State Management)

The app uses React Context to manage the saved videos (notes) state globally:

- **`NoteContext.js`** — Creates the context via `createContext()`.
- **`NoteState.js`** — Provider component that exposes:
  - `notes` — Array of saved videos.
  - `getNotes()` — GET `/api/note/fetchallnotes` — fetches all saved videos for the authenticated user.
  - `addnote(title, channeltitle, videoUrl, imageUrl)` — POST `/api/note/addnotes` — saves a new video.
  - `Deletenote(id)` — DELETE `/api/note/delete/:id` — removes a saved video.
  
All API calls include the JWT token via the `auto-token` header.

### Utilities

#### `FetchAPI.js`
- Wraps Axios for YouTube API calls.
- Base URL: `https://youtube-v31.p.rapidapi.com`
- Configured with RapidAPI key and host headers.
- Returns up to 50 results per query (`maxResults: 50`).

#### `constant.js`
- Exports the logo URL, 17 sidebar categories (with MUI icons), and demo/fallback URLs for thumbnails, channels, and videos.

### Styling

- **TailwindCSS 3** is the primary styling approach with a custom theme:
  - Custom colors: `primary` (#FF0000), `secondary` (#1E1E1E), `dark` (#0F0F0F), `light` (#F8F9FA)
  - Font family: Roboto, Arial, sans-serif
  - Custom `fade-in` animation
- **`index.css`** — Tailwind directives, base styles, custom scrollbar, and ReactPlayer responsive overrides.
- **`Style.css`** — Additional sidebar scrollbar customisation.

---

## ⚙ Backend Deep-Dive

### Server Setup

**`backend/index.js`** — Entry point:
- Connects to MongoDB via `db.js`.
- Initializes Express on **port 5000**.
- Enables CORS and JSON body parsing.
- Mounts two route groups:
  - `/api/note` — Saved videos CRUD
  - `/api/auto` — Authentication

### Database

**`backend/db.js`**:
- Connects to a local MongoDB instance at `mongodb://localhost:27017/youtube`.
- Uses Mongoose for the connection.

### Models

#### `User.js`
| Field | Type | Constraints |
|---|---|---|
| `name` | String | Required |
| `email` | String | Required, Unique |
| `password` | String | Required (stored as bcrypt hash) |
| `date` | Date | Defaults to `Date.now` |

#### `Note.js` (Saved Video)
| Field | Type | Constraints |
|---|---|---|
| `user` | ObjectId | Reference to `User` model |
| `title` | String | Required — Video title |
| `channeltitle` | String | Required — Channel name |
| `videoUrl` | String | Required — YouTube video ID |
| `imageUrl` | String | Required — Thumbnail URL |
| `date` | Date | Defaults to `Date.now` |

### Middleware

#### `fetchuser.js`
- JWT authentication middleware.
- Reads the token from the `auto-token` request header.
- Verifies the token using the secret (`"shhh"`).
- Attaches `req.user` (containing `user.id`) for downstream route handlers.
- Returns 401 if the token is missing or invalid.

### API Routes

#### Auth Routes (`/api/auto`)
See the [API Endpoints Reference](#-api-endpoints-reference) section below.

#### Note Routes (`/api/note`)
All note routes are protected by the `fetchuser` middleware (JWT required).

---

## 🔐 Authentication Flow

```
┌──────────┐     POST /api/auto/createuser      ┌──────────┐
│  SignUp   │ ──────────────────────────────────▶ │  Server  │
│  Form    │     { name, email, password }       │          │
│          │ ◀────────────────────────────────── │  bcrypt  │
│          │     { success: true, jwtdata }      │  + JWT   │
└──────────┘                                     └──────────┘
      │
      │  localStorage.setItem('token', jwtdata)
      │  navigate('/')
      ▼
┌──────────┐     POST /api/auto/login            ┌──────────┐
│  Login   │ ──────────────────────────────────▶ │  Server  │
│  Form    │     { email, password }             │          │
│          │ ◀────────────────────────────────── │  bcrypt  │
│          │     { success: true, jwtdata }      │  compare │
└──────────┘                                     └──────────┘
      │
      │  localStorage.setItem('token', jwtdata)
      │  navigate('/')
      ▼
┌──────────┐
│  Feed    │  ← Protected route (redirects to /login if no token)
│  (Home)  │
└──────────┘
```

1. **Sign Up**: User submits name, email, password → backend hashes password with bcrypt, creates user in MongoDB, returns JWT.
2. **Log In**: User submits email, password → backend compares with stored hash, returns JWT on match.
3. **Token Storage**: JWT is saved in `localStorage` under the key `"token"`.
4. **Route Protection**: The `Feed` component checks for the token on mount — redirects to `/login` if absent. The `Navbar` conditionally renders Login/Signup links vs. Logout button.
5. **API Authorization**: All saved-video API calls include the JWT as the `auto-token` header. The `fetchuser` middleware verifies it server-side.

---

## 💾 Watch Later / Saved Videos Flow

1. User watches a video on the `Videodetail` page.
2. Clicks **"add fav"** → calls `addnote()` from Context → POST to `/api/note/addnotes` with JWT.
3. Backend creates a `Note` document tied to the user's ID.
4. User navigates to `/save` (via "Watch Later" button in Sidebar).
5. `Savevideo` component calls `getNotes()` → GET `/api/note/fetchallnotes` with JWT.
6. Backend returns all notes belonging to the authenticated user.
7. Each video is rendered as a `Savedcards` component.
8. User can click **"Remove"** → calls `Deletenote(id)` → DELETE `/api/note/delete/:id` with JWT.
9. Backend verifies ownership and deletes the note.

---

## 🔑 Environment Variables

| Variable | File | Description |
|---|---|---|
| `REACT_RAPID` | `Env.env` | RapidAPI key for YouTube v3 API |

> **Note**: The API key is currently hardcoded in `src/utils/FetchAPI.js`. For production, move it to environment variables using `process.env.REACT_APP_*`.

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** ≥ 16
- **MongoDB** running locally on port 27017
- **RapidAPI account** with a YouTube v3 API subscription

### Installation

```bash
# 1. Clone the repository
git clone <repository-url>
cd youtube2

# 2. Install frontend dependencies
npm install

# 3. Install backend dependencies
cd backend
npm install
cd ..
```

### Running the Application

```bash
# Option 1: Run both frontend & backend concurrently
npm run both

# Option 2: Run separately
# Terminal 1 — Frontend (port 3000)
npm start

# Terminal 2 — Backend (port 5000)
cd backend
npm run serve
```

The app will be available at `http://localhost:3000`.

---

## 📜 Available Scripts

### Frontend (`package.json`)

| Script | Command | Description |
|---|---|---|
| `start` | `react-scripts start` | Starts dev server on port 3000 |
| `build` | `react-scripts build` | Creates production build in `/build` |
| `test` | `react-scripts test` | Runs test suite |
| `eject` | `react-scripts eject` | Ejects CRA config (irreversible) |
| `both` | `concurrently "npm run start" "cd backend && npm run serve"` | Runs frontend + backend together |

### Backend (`backend/package.json`)

| Script | Command | Description |
|---|---|---|
| `serve` | `nodemon server.js` | Starts backend with auto-restart |

---

## 📡 API Endpoints Reference

### Authentication (`/api/auto`)

| Method | Endpoint | Auth | Body | Response | Description |
|---|---|---|---|---|---|
| `POST` | `/api/auto/createuser` | ❌ | `{ name, email, password }` | `{ success, jwtdata }` | Register a new user |
| `POST` | `/api/auto/login` | ❌ | `{ email, password }` | `{ success, jwtdata }` | Log in an existing user |
| `POST` | `/api/auto/getuser` | ✅ `auto-token` | – | `User` object | Get authenticated user's details |

**Validation Rules**:
- `name`: minimum 3 characters
- `email`: must be a valid email
- `password`: minimum 5 characters

### Saved Videos (`/api/note`)

| Method | Endpoint | Auth | Body | Response | Description |
|---|---|---|---|---|---|
| `GET` | `/api/note/fetchallnotes` | ✅ `auto-token` | – | `Note[]` | Get all saved videos for the logged-in user |
| `POST` | `/api/note/addnotes` | ✅ `auto-token` | `{ title, channeltitle, videoUrl, imageUrl }` | `Note` | Save a video to Watch Later |
| `DELETE` | `/api/note/delete/:id` | ✅ `auto-token` | – | `{ success, note }` | Remove a saved video (ownership validated) |

---

## 📝 License

ISC

---

> Built with ❤️ using React, Express, MongoDB, and the YouTube Data API.
