import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import SearchBar from './SearchBar';
import SearchResults from './SearchResults';
import Playlist from './Playlist';

const mockTracks = [
  { key: "t1", id: 1, name: "Blinding Lights", artist: "The Weeknd", album: "After Hours" },
  { key: "t2", id: 2, name: "Levitating", artist: "Dua Lipa", album: "Future Nostalgia" },
];

function App() {
  const [username, setUsername] = useState("");
  const [searchResults, setSearchResults] = useState(mockTracks);
  const [playlistTracks, setPlaylistTracks] = useState([]);
  const [playlistName, setPlaylistName] = useState("My Playlist");

  const addTrack = (track) => {
    if (playlistTracks.some(t => t.id === track.id)) return;
    setPlaylistTracks([...playlistTracks, track]);
  };

  const removeTrack = (track) => {
    setPlaylistTracks(playlistTracks.filter(t => t.id !== track.id));
  };

  const renamePlaylist = (newName) => {
    setPlaylistName(newName);
  };

  // Load a user's saved playlist when they "log in"
  const login = (name) => {
    setUsername(name);
    const saved = localStorage.getItem(`playlist_${name}`);
    if (saved) {
      const parsed = JSON.parse(saved);
      setPlaylistTracks(parsed.tracks);
      setPlaylistName(parsed.name);
    } else {
      setPlaylistTracks([]);
      setPlaylistName("My Playlist");
    }
  };

  // Save current playlist to localStorage under this user
  const savePlaylist = () => {
    if (!username) {
      alert("Please log in first");
      return;
    }
    const data = { name: playlistName, tracks: playlistTracks };
    localStorage.setItem(`playlist_${username}`, JSON.stringify(data));
    alert("Playlist saved!");
  };

  return (
    <div>
      {!username ? (
        <LoginForm onLogin={login} />
      ) : (
        <>
          <p>Logged in as {username}</p>
          <SearchBar onSearch={setSearchResults} allTracks={mockTracks} />
          <SearchResults searchResults={searchResults} onAdd={addTrack} />
          <Playlist
            playlistName={playlistName}
            playlistTracks={playlistTracks}
            onRemove={removeTrack}
            onRename={renamePlaylist}
          />
          <button onClick={savePlaylist}>Save Playlist</button>
        </>
      )}
    </div>
  );
}

function LoginForm({ onLogin }) {
  const [name, setName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim()) onLogin(name.trim());
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter username"
      />
      <button type="submit">Log In</button>
    </form>
  );
}

export default App;