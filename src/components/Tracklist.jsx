import { useState } from "react";
import Track from "./Track";

function TrackList({ tracks, onAction, actionLabel, onReorder }) {
  const [dragIndex, setDragIndex] = useState(null);
  const [overIndex, setOverIndex] = useState(null);

  const handleDragStart = (index) => {
    setDragIndex(index);
  };

  const handleDragOver = (e, index) => {
    e.preventDefault(); // required to allow dropping
    setOverIndex(index);
  };

  const handleDrop = (index) => {
    if (dragIndex === null || dragIndex === index) {
      setDragIndex(null);
      setOverIndex(null);
      return;
    }
    onReorder(dragIndex, index);
    setDragIndex(null);
    setOverIndex(null);
  };

  return (
    <ul className="track-list">
      {Array.isArray(tracks) && tracks.map((track, index) => (
        <Track
          key={track.id || `${track.name}-${index}`}
          track={track}
          onAction={onAction}
          actionLabel={actionLabel}
          draggable={!!onReorder}
          isDragging={dragIndex === index}
          isDragOver={overIndex === index}
          onDragStart={() => handleDragStart(index)}
          onDragOver={(e) => handleDragOver(e, index)}
          onDrop={() => handleDrop(index)}
          onDragEnd={() => { setDragIndex(null); setOverIndex(null); }}
        />
      ))}
    </ul>
  );
}

export default TrackList;