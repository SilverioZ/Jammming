import { useState } from "react";
import SearchBar from "./components/SearchBar";
import SearchResults from "./components/SearchResults";
import Playlist from "./components/Playlist";

const mockTracks = [
  { key: "t1", id: 1, name: "Blinding Lights", artist: "The Weeknd", album: "After Hours" },
  { key: "t2", id: 2, name: "Levitating", artist: "Dua Lipa", album: "Future Nostalgia" },
  { key: "t3", id: 3, name: "good 4 u", artist: "Olivia Rodrigo", album: "SOUR" },
  { key: "t4", id: 4, name: "As It Was", artist: "Harry Styles", album: "Harry's House" },
  { key: "t5", id: 5, name: "Anti-Hero", artist: "Taylor Swift", album: "Midnights" },
];

function App() {
  const [username, setUsername] = useState("");
  const [searchResults, setSearchResults] = useState(mockTracks);
  const [playlistTracks, setPlaylistTracks] = useState([]);
  const [playlistName, setPlaylistName] = useState("My Playlist");

  const addTrack = (track) => {
    if (playlistTracks.some((t) => t.id === track.id)) return;
    setPlaylistTracks([...playlistTracks, track]);
  };

  const removeTrack = (track) => {
    setPlaylistTracks(playlistTracks.filter((t) => t.id !== track.id));
  };

  const renamePlaylist = (newName) => {
    setPlaylistName(newName);
  };

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

  const logout = () => {
    setUsername("");
    setPlaylistTracks([]);
    setPlaylistName("My Playlist");
    setSearchResults(mockTracks);
  };

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
    <div className="app">
      <h1>Jammming</h1>

      {!username ? (
        <LoginForm onLogin={login} />
      ) : (
        <div className="dashboard">
          <div className="account-bar">
            <span>Logged in as {username}</span>
            <button onClick={logout}>Log Out</button>
          </div>

          <SearchBar allTracks={mockTracks} onSearch={setSearchResults} />

          <div className="main-content">
            <SearchResults searchResults={searchResults} onAdd={addTrack} />
            <Playlist
              playlistName={playlistName}
              playlistTracks={playlistTracks}
              onRemove={removeTrack}
              onRename={renamePlaylist}
            />
          </div>

          <button onClick={savePlaylist}>Save Playlist</button>
        </div>
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