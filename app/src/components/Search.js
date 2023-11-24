import "./Search.scss";

function Search({ className, placeholder }) {
  return (
    <input
      type="text"
      id="search"
      className={`search ${className}`}
      placeholder={placeholder}
    />
  );
}

export default Search;
