import React, { useState, useRef, useCallback } from "react";
import KitaDetailCard from "./KitaDetailCard";
import useKitaSearch from "../useKitaSearch";

// Style
import "../assets/stylesheets/cardList.css";

function CardList() {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const limit = 3;

  const { kitas, hasMore, loading, error } = useKitaSearch(query, page, limit);

  const observer = useRef();
  const lastKitaElementRef = useCallback(
    node => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting) {
          setPage(prevPage => prevPage + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  const handleSearch = event => {
    setQuery(event.target.value);
    setPage(1);
  };

  return (
    <div className="card-list">
      <label htmlFor="search">Search me:</label>
      <input
        type="text"
        value={query}
        onChange={handleSearch}
        name="search"
        id="search"
      />

      {kitas.map((kita, index) => {
        const kitaInfo = {
          fromAge: kita.fruehestesAufnahmealterInMonaten,
          name: kita.name,
          address: kita.adresse,
          postCode: kita.postleitzahl,
          city: kita.stadt,
          cityQuarter: kita.stadt,
          type: kita.einrichtungsart,
          phone: kita.telefon,
          mail: kita.email,
          owner: kita.traegerart
        };

        if (kitas.length === index + 1) {
          return (
            <div key={kita._id} ref={lastKitaElementRef}>
              <KitaDetailCard kitaInfo={kitaInfo} />
            </div>
          );
        } else {
          return (
            <div key={kita._id}>
              <KitaDetailCard kitaInfo={kitaInfo} />
            </div>
          );
        }
      })}
      {loading && <div>Loading...</div>}
      {error && <div>Error! Please try again!</div>}
    </div>
  );
}

export default CardList;
