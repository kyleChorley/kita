import React from "react";

// Style
import "../assets/stylesheets/searchForm.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

export default function SearchForm(props) {
  return (
    <div>
      <div id="search">
        <input
          className="searchTerm"
          type="text"
          value={props.query}
          onChange={props.handleSearch}
          name="search"
          placeholder="Suchen Sie nach Namen"
          // id="search"
        />
        <FontAwesomeIcon icon={faSearch} className="icon searchButton" />
      </div>
      <button>erweitert</button>
    </div>
  );
}
