import TrackList from './TrackList';

function SearchResults({ searchResults, onAdd }) {
    return (
        <TrackList
        tracks={searchResults}
        onAction={onAdd}
        actionLabel='+Add'
        />
    );
}

export default SearchResults;