import TrackList from "./TrackList";

function SearchResults({ searchResults, onAdd }) {
  return (
    <div className="search-results">
      <h2>Results</h2>
      <TrackList tracks={searchResults} onAction={onAdd} actionLabel="+ Add" />
    </div>
  );
}

export default SearchResults;