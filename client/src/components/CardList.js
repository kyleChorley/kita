import React, { useState, useRef, useCallback } from "react";
// import KitaDetailCard from "./KitaDetailCard";
import useKitaSearch from "../useKitaSearch";

// Style
import "../assets/stylesheets/cardList.css";
// Style
import "../assets/stylesheets/kitaDetailCard.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPhoneSquareAlt,
  faEnvelopeSquare
} from "@fortawesome/free-solid-svg-icons";

function CardList(props) {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);

  const { index, kitas, hasMore, loading, error } = useKitaSearch(query, page);

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
  // console.log(props);
  const handleSearch = event => {
    setQuery(event.target.value);
    setPage(1);
  };

  console.log(index);
  return (
    <div className="card-list">
      <input type="text" value={query} onChange={handleSearch} />
      {loading && <div>Loading...</div>}
      {error && <div>Error! Please try again!</div>}
      {kitas.map((kita, index) => {
        if (kitas.length === index + 1) {
          return (
            <div ref={lastKitaElementRef} className="card-list">
              <div key={kita._id} className="card">
                <div className="card-header flex">
                  <h4>{kita.name}</h4>
                  <p>ab {kita.fruehestesAufnahmealterInMonaten} M.</p>
                </div>
                <span>
                  {kita.adresse}, {kita.postleitzahl} {kita.stadt}
                </span>
                <hr />
                <p>
                  {kita.einrichtungsart} in {kita.viertel}
                </p>
                <div className="address">
                  <p>
                    <FontAwesomeIcon icon={faPhoneSquareAlt} className="icon" />
                    {kita.telefon}
                  </p>
                  <p>
                    <FontAwesomeIcon icon={faEnvelopeSquare} className="icon" />
                    {kita.email}
                  </p>
                </div>
                <span>
                  <hr />
                  Träger: <strong>{kita.traegerart}</strong>
                </span>
              </div>
            </div>
          );
        } else {
          return (
            <div className="card-list">
              <div key={kita._id} className="card">
                <div className="card-header flex">
                  <h4>{kita.name}</h4>
                  <p>ab {kita.fruehestesAufnahmealterInMonaten} M.</p>
                </div>
                <span>
                  {kita.adresse}, {kita.postleitzahl} {kita.stadt}
                </span>
                <hr />
                <p>
                  {kita.einrichtungsart} in {kita.viertel}
                </p>
                <div className="address">
                  <p>
                    <FontAwesomeIcon icon={faPhoneSquareAlt} className="icon" />
                    {kita.telefon}
                  </p>
                  <p>
                    <FontAwesomeIcon icon={faEnvelopeSquare} className="icon" />
                    {kita.email}
                  </p>
                </div>
                <span>
                  <hr />
                  Träger: <strong>{kita.traegerart}</strong>
                </span>
              </div>
            </div>
          );
        }
      })}
    </div>
  );
}

export default CardList;
