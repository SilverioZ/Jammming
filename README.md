# 🎵 Jammming

A playlist-building web app built with React and Vite, inspired by the Codecademy "Jammming" project. Search a track library, build a custom playlist, rename it, and save it to a user profile.

This project was built as a learning exercise focused on **unidirectional data flow**, **component architecture**, and **state management** in React — currently using mock data and `localStorage`, with the codebase structured to make swapping in a real API (e.g. Spotify) straightforward later.

## Features

- 🔍 **Search** — filter a track library by song name, artist, or album in real time
- ➕ **Add / Remove tracks** — build a custom playlist from search results
- ✏️ **Rename playlist** — give your playlist a custom name
- 👤 **Simulated accounts** — "log in" with a username to load and save a playlist
- 💾 **Save/load playlists** — persisted locally via `localStorage`, tied to the logged-in username

## Tech Stack

- [React](https://react.dev/) (functional components + hooks)
- [Vite](https://vitejs.dev/) for build tooling and dev server
- Plain CSS (no framework) for styling
- `localStorage` for persistence (no backend yet)

## Project Structure

```
src/
├── App.jsx                  # Root component — owns all shared state
├── main.jsx                 # Entry point, mounts App
├── index.css                # Global styles
└── components/
    ├── SearchBar.jsx        # Filters tracks by search query
    ├── SearchResults.jsx    # Displays search results
    ├── Playlist.jsx         # Displays and renames the custom playlist
    ├── TrackList.jsx        # Reusable list, shared by SearchResults & Playlist
    └── Track.jsx             # Single track row
```

The app follows a unidirectional data flow: state lives in `App`, flows down to children as props, and changes flow back up through callback functions (e.g. `onAdd`, `onRemove`, `onRename`) — no component mutates state it doesn't own.

## Getting Started

Clone the repo and install dependencies:

```bash
git clone https://github.com/your-username/Jammming.git
cd Jammming
npm install
```

Run the dev server:

```bash
npm run dev
```

Then open the local URL printed in the terminal (usually `http://localhost:5173`).

## How Accounts Work (Important Note)

This project currently uses a **simulated login** for learning purposes — there is no real authentication, server, or database involved:

- Typing a username does not create a real account or send any data anywhere.
- On "login," the app checks `localStorage` for a playlist previously saved under that username on that browser.
- Clicking **Save Playlist** writes the current playlist to `localStorage`, keyed to the username.
- This data is local to your browser only — it is not shared across devices and is not visible to anyone else.

This pattern mirrors the shape of real authentication (login → load user data → edit → save) without the complexity of a real backend, making it a natural foundation to build on later.

## Roadmap / Future Improvements

- [ ] Replace mock data with a real music API (e.g. Spotify Web API)
- [ ] Replace simulated login with real authentication
- [ ] Support multiple named playlists per user
- [ ] Add search debouncing for real API calls
- [ ] Improve accessibility and mobile responsiveness further

## Acknowledgments

Project concept based on the [Codecademy Jammming project](https://www.codecademy.com/).
