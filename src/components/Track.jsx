function Track({ track, onAction, actionLabel }) {
  return (
    <li className="track">
      <span>{track.name}</span>
      <span>{track.artist}</span>
      <span>{track.album}</span>
      <button onClick={() => onAction(track)}>{actionLabel}</button>
    </li>
  );
}

export default Track;