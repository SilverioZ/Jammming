import { useState } from "react";

function SearchBar({ allTracks, onSearch }) {
  const [query, setQuery] = useState("");

  const handleChange = (e) => {
    const value = e.target.value;
    setQuery(value);

    const filtered = allTracks.filter(
      (track) =>
        track.name.toLowerCase().includes(value.toLowerCase()) ||
        track.artist.toLowerCase().includes(value.toLowerCase()) ||
        track.album.toLowerCase().includes(value.toLowerCase())
    );

    onSearch(filtered);
  };

  return (
    <input
      type="text"
      value={query}
      onChange={handleChange}
      placeholder="Search for songs, artists, or albums"
    />
  );
}

export default SearchBar;