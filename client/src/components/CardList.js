import React from "react";
import LazyLoad from "react-lazyload";
import KitaDetailCard from "./KitaDetailCard";

// Style
import "../assets/stylesheets/cardList.css";

const CardList = props => {
  return (
    <div className="card-list">
      <LazyLoad height={2}>
        <KitaDetailCard />
      </LazyLoad>
    </div>
  );
};

export default CardList;
