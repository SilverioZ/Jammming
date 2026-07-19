import TrackList from './TrackList';

function PlayList({ playlistTracks, onRemove }) {
    return (
        <div className='playlist'>
            <h2>My Playlist</h2>
            <TrackList
            tracks={playlistTracks}
            onAction={onRemove}
            actionLabel='- Remove'
            />
        </div>
    );
}

export default Playlist;