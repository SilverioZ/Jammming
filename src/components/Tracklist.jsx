import Track from './Track';

function TrackList({ tracks, onAction, actionLabel }) {
    return (
        <ul className="track-list">
            {tracks.map(track => (
                <Track
                    key={track.key}
                    track={track}
                    onAction={onAction}
                    actionLabel={actionLabel}
                />
            ))}
        </ul>
    );
}

export default TrackList;