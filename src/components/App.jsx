import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'

const mockTracks = [
  { key: "t1", id: 1, name: "Blinding Lights", artist: "The Weeknd", album: "After Hours" },
  { key: "t2", id: 2, name: "Levitating", artist: "Dua Lipa", album: "Future Nostalgia" },
  // ...
];

function App() {
  const [searchResults, setSearchResults] = useState(mockTracks);
  const [playlistTracks, setPlaylistTracks] = useState([]);
  const [playlistName, setPlaylistName] = useState('My Playlist');
  
  
  const addTrack = (track) => {
    if (playlistTracks.some(t => t.id === track.id)) return; // no duplicates
    setPlaylistTracks([...playlistTracks, track]);
  };

  const removeTrack = (track) => {
    setPlaylistTracks(playlistTracks.filter(t => t.id !== track.id));
};

const renamePlaylist = (newName) => {
  setPlaylistName(newName);
};

return (
  <div>
    <SearchBar onSearch={setSearchResults} allTracks={mockTracks} />
    <SearchResults searchResults={searchResults} onAdd={addTrack} />
    <Playlist
    playlistName={playlistName}
    playlistTracks={playlistTracks} 
    onRemove={removeTrack}
    onRename={renamePlaylist}
    />
  </div>
 );
}

export default App
