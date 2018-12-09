import React from "react";
import PropTypes from "prop-types";
import { faSearch, faSort } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const SortAndSearch = ({ handleChangeSort, sort, search, handleSearch }) => {
  return (
    <div id="sort-and-search">
      {/* Sort  */}
      <FontAwesomeIcon icon={faSort} />
      <label htmlFor="sort-select">SORT:</label>
      <select
        name="sort-select"
        id="sort-select"
        onChange={handleChangeSort}
        value={sort}
      >
        <option value="">Sort by...</option>
        <option value="title asc">Title (A-Z)</option>
        <option value="title desc">Title (Z-A)</option>
        <option value="votes asc">Votes (Low-High)</option>
        <option value="votes desc">Votes (High-Low)</option>
        <option value="created_at asc">Date (Oldest-Newest)</option>
        <option value="created_at desc">Date (Newest-Oldest)</option>
      </select>
      {"     "}
      {/* Search */}
      <FontAwesomeIcon icon={faSearch} />
      <label htmlFor="article-search">SEARCH:</label>
      <input
        type="text"
        placeholder={`Search...`}
        id="article-search"
        onChange={handleSearch}
        value={search}
      />
    </div>
  );
};

SortAndSearch.propTypes = {
  handleChangeSort: PropTypes.func,
  sort: PropTypes.string,
  search: PropTypes.string,
  handleSearch: PropTypes.func
};

export default SortAndSearch;
