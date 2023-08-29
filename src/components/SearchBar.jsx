import React, { useState } from "react";
import "./SearchBar.css";

const SearchBar = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleChange = (event) => {
    setSearchQuery(event.target.value);
    onSearch(event.target.value);
  };

  return (
    <div>
      <input
        type="text"
        className="searchbar"
        value={searchQuery}
        onChange={handleChange}
        placeholder="Search by name , email or role..."
      />
      <hr />
    </div>
  );
};
export default SearchBar;
