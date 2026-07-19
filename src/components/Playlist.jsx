import { useState } from "react";
import TrackList from "./TrackList";

function Playlist({ playlistName, playlistTracks, onRemove, onRename }) {
  const [isEditing, setIsEditing] = useState(false);
  const [draftName, setDraftName] = useState(playlistName);

  const handleSave = () => {
    const trimmed = draftName.trim();
    onRename(trimmed || playlistName); // don't allow blank names
    setIsEditing(false);
  };

  return (
    <div className="playlist">
      {isEditing ? (
        <div className="playlist-rename">
          <input
            value={draftName}
            onChange={(e) => setDraftName(e.target.value)}
            autoFocus
          />
          <button onClick={handleSave}>Save</button>
          <button onClick={() => { setDraftName(playlistName); setIsEditing(false); }}>
            Cancel
          </button>
        </div>
      ) : (
        <h2>
          {playlistName}
          <button onClick={() => setIsEditing(true)}>Rename</button>
        </h2>
      )}

      <TrackList
        tracks={playlistTracks}
        onAction={onRemove}
        actionLabel="− Remove"
      />
    </div>
  );
}

export default Playlist;