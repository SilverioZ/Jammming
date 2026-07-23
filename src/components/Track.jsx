function Track({ 
  track, 
  onAction, 
  actionLabel,
  draggable,
  isDragging,
  isDragOver,
  onDragStart,
  onDragOver,
  onDrop,
  onDragEnd,
}) {
  return (
    <li 
    className={`track ${isDragging ? "dragging" : ""} ${isDragOver ? "drag-over" : ""}`}
    ondraggable={draggable}
    onDragStart={onDragStart}
    onDragOver={onDragOver}
    onDrop={onDrop}
    onDragEnd={onDragEnd}
    >
    {draggable && <span className="drag-handle">⠿</span>}
      <span>{track.name}</span>
      <span>{track.artist}</span>
      <span>{track.album}</span>
      <button onClick={() => onAction(track)}>{actionLabel}</button>
    </li>
  );
}

export default Track;