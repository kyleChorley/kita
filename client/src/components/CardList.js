import React, { useState, useRef, useCallback } from "react";
import KitaDetailCard from "./KitaDetailCard";
import SearchForm from "./SearchForm";
import useKitaSearch from "../useKitaSearch";

// Style
import "../assets/stylesheets/cardList.css";

function CardList(props) {
  const observer = useRef();
  const lastKitaElementRef = useCallback(
    node => {
      if (props.loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting && props.hasMore) {
          props.setPage(prevPage => prevPage + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [props.loading, props.hasMore]
  );

  return (
    <div className="card-list">
      <SearchForm handleSearch={props.handleSearch} query={props.query} />

      {props.kitas.map((kita, index) => {
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

        if (props.kitas.length === index + 1) {
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
      {props.loading && <div>Loading...</div>}
      {props.error && <div>Error! Please try again!</div>}
    </div>
  );
}

export default CardList;
