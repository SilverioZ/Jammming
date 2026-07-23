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
  { key: "t6", id: 6, name: "Flowers", artist: "Miley Cyrus", album: "Endless Summer Vacation" },
  { key: "t7", id: 7, name: "Cruel Summer", artist: "Taylor Swift", album: "Lover" },
  { key: "t8", id: 8, name: "Unholy", artist: "Sam Smith & Kim Petras", album: "Gloria" },
  { key: "t9", id: 9, name: "Vampire", artist: "Olivia Rodrigo", album: "GUTS" },
  { key: "t10", id: 10, name: "Paint The Town Red", artist: "Doja Cat", album: "Scarlet" },
  { key: "t11", id: 11, name: "Kill Bill", artist: "SZA", album: "SOS" },
  { key: "t12", id: 12, name: "Watermelon Sugar", artist: "Harry Styles", album: "Fine Line" },
  { key: "t13", id: 13, name: "Peaches", artist: "Justin Bieber", album: "Justice" },
  { key: "t14", id: 14, name: "Golden Hour", artist: "JVKE", album: "This Is What Ads Are Made Of" },
  { key: "t15", id: 15, name: "Espresso", artist: "Sabrina Carpenter", album: "Short n' Sweet" },
  { key: "t16", id: 16, name: "Lovin On Me", artist: "Jack Harlow", album: "Jackman." },
  { key: "t17", id: 17, name: "Snooze", artist: "SZA", album: "SOS" },
  { key: "t18", id: 18, name: "Say Don't Go", artist: "Taylor Swift", album: "1989 (Taylor's Version)" },
  { key: "t19", id: 19, name: "Rich Baby Daddy", artist: "Drake", album: "For All The Dogs" },
  { key: "t20", id: 20, name: "Stick Season", artist: "Noah Kahan", album: "Stick Season" },
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

  const reorderPlayList = (fromIndex, toIndex) => {
    const updated = [...playlistTracks];
    const [moved] = updated.splice(fromIndex, 1);
    updated.splice(toIndex, 0, moved);
    setPlaylistTracks(updated);
  };

  return (
    <div className="app">
      <h1>Ja<span className="accent-m">mmm</span>ing</h1>
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
              onReorder={reorderPlayList}
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