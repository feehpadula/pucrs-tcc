import { useState } from "react";
import "./Search.scss";

function Search({ className, placeholder }) {
  const [search, setSearch] = useState();

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    window.location.href = `/search/${search}`;
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        id="search"
        name="search"
        className={`search ${className}`}
        placeholder={placeholder}
        onChange={handleChange}
      />
    </form>
  );
}

export default Search;
