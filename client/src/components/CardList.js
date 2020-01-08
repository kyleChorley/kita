import React, { useState, useRef, useCallback } from "react";
import KitaDetailCard from "./KitaDetailCard";
import useKitaSearch from "../useKitaSearch";

// Style
import "../assets/stylesheets/cardList.css";

function CardList() {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);

  const { kitas, hasMore, loading, error } = useKitaSearch(query, page);

  const observer = useRef();
  const lastKitaElementRef = useCallback(
    node => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting) {
          setPage(prevPage => prevPage + 1);
          console.log("visible");
        }
      });
      if (node) observer.current.observe(node);
      console.log(node);
    },
    [loading, hasMore]
  );

  const handleSearch = event => {
    setQuery(event.target.value);
    setPage(1);
  };

  return (
    <div className="card-list">
      <input type="text" value={query} onChange={handleSearch} />
      {loading && <div>Loading...</div>}
      {error && <div>Error! Please try again!</div>}
      {kitas.map((kita, index) => {
        if (kitas.length === index + 1) {
          return (
            <div key={kita._id} ref={lastKitaElementRef}>
              <KitaDetailCard
                fromAge={kita.fruehestesAufnahmealterInMonaten}
                name={kita.name}
                address={kita.adresse}
                postCode={kita.postleitzahl}
                city={kita.stadt}
                cityQuarter={kita.stadt}
                type={kita.einrichtungsart}
                phone={kita.telefon}
                mail={kita.email}
                owner={kita.traegerart}
              />
            </div>
          );
        } else {
          return (
            <div key={kita._id}>
              <KitaDetailCard
                fromAge={kita.fruehestesAufnahmealterInMonaten}
                name={kita.name}
                address={kita.adresse}
                postCode={kita.postleitzahl}
                city={kita.stadt}
                cityQuarter={kita.stadt}
                type={kita.einrichtungsart}
                phone={kita.telefon}
                mail={kita.email}
                owner={kita.traegerart}
              />
            </div>
          );
        }
      })}
    </div>
  );
}

export default CardList;
