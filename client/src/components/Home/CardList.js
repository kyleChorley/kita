import React, { useRef, useCallback, useState, useEffect } from "react";
import KitaDetailCard from "../KitaDetailCard";
import SearchForm from "../SearchForm";
import axios from "axios";
import useKitaSearch from "../../useKitaSearch";

// Style
import "../../assets/stylesheets/cardList.css";

const CardList = props => {
  const { kitas } = useKitaSearch("", 1, 0);
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

  const [favorites, setFavorites] = useState([]);

  useEffect(() => {}, [favorites]);

  console.log("one:", favorites);

  const clickHandle = kita => {
    console.log("two", favorites);
    console.log(kita);
    const kitaId = kita.kitaId;
    // REMOVE PRODUCT FROM FAVORITES
    // IF -> IF PRODUCT IS ALREADY IN THE FAVORITES
    console.log(props);
    if (favorites.includes(kitaId)) {
      const shallow = [...favorites];
      console.log(kita);
      const indexOfKita = shallow.indexOf(kitaId);
      shallow.splice(indexOfKita, 1);
      setFavorites([shallow]);
      axios.put(`/kitaDetailCard/favorite`, favorites).then(response => {
        console.log(response);
      });

      // ADD KITA TO FAVORITES
      // ELSE -> PRODUCT TO BE ADDED
    } else {
      setFavorites([...favorites, kitaId]);
      axios.post("/kitaDetailCard/favorite", favorites).then(response => {
        console.log(response);
      });
      console.log("three", favorites);
    }
  };

  console.log(props.kitas);

  return (
    <div className="card-list">
      <SearchForm handleSearch={props.handleSearch} query={props.query} />

      {props.kitas.map((kita, index) => {
        console.log(kita);
        const kitaInfo = {
          kitaId: kita._id,
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
        console.log(kitaInfo);

        if (props.kitas.length === index + 1) {
          return (
            <div key={kita._id} ref={lastKitaElementRef}>
              <KitaDetailCard
                kitaInfo={props.kitas}
                user={props.user}
                kita={kita}
                kitaInfo={kitaInfo}
                clickHandle={clickHandle}
                favorites={favorites}
              />
            </div>
          );
        } else {
          return (
            <div key={kita._id}>
              <KitaDetailCard
                kitaInfo={props.kitas}
                user={props.user}
                kita={kita}
                kitaInfo={kitaInfo}
                clickHandle={clickHandle}
                favorites={favorites}
              />
            </div>
          );
        }
      })}
      {props.loading && <div>Loading...</div>}
      {props.error && <div>Error! Please try again!</div>}
    </div>
  );
};

export default CardList;
