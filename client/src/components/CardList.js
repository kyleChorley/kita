import React, { useState } from "react";
import KitaDetailCard from "./KitaDetailCard";
import useKitaSearch from "../useKitaSearch";

// Style
import "../assets/stylesheets/cardList.css";

function CardList() {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);

  const handleSearch = event => {
    setQuery(event.target.value);
    setPage(1);
  };

  const { kitas, hasMore, loading, error } = useKitaSearch(query, page);

  return (
    <div className="card-list">
      <input type="text" onChange={handleSearch} />
      {loading && <div>Loading...</div>}
      {error && <div>Error! Please try again!</div>}
      <KitaDetailCard kitas={kitas} />
    </div>
  );
}

export default CardList;
