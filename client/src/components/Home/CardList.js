import React, { useRef, useCallback, useState } from "react";
import KitaDetailCard from "../KitaDetailCard";
import SearchForm from "../SearchForm";
import axios from "axios";

// Style
import "../../assets/stylesheets/cardList.css";

const CardList = props => {
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

  const clickHandle = kita => {
    console.log(kita);
    const kitaId = kita._id;
    // REMOVE PRODUCT FROM FAVORITES
    // IF -> IF PRODUCT IS ALREADY IN THE FAVORITES
    if (favorites.includes(kitaId)) {
      const shallow = [...favorites];
      const indexOfKita = shallow.indexOf(kitaId);
      shallow.splice(indexOfKita, 1);
      setFavorites({ shallow }, () => {
        // PUT -> REMOVE KITA FROM USER FAVORITES ARRAY AND DELETE ALLTOGETHER
        axios.put(`/kitaDetailCard/favorite`, kita).then(response => {
          console.log(response);
        });
      });
      // ADD KITA TO FAVORITES
      // ELSE -> PRODUCT TO BE ADDED
    } else {
      setFavorites([...favorites, kita], () => {
        console.log(favorites);
        //POST -> CREATING A PRODUCT
        axios.post("/kitaDetailCard/favorite", kita).then(response => {
          console.log(response);
        });
      });
    }
  };

  console.log(props);

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

        if (props.kitas.length === index + 1) {
          return (
            <div key={kita._id} ref={lastKitaElementRef}>
              <KitaDetailCard
                kitaInfo={kitaInfo}
                user={props.user}
                kita={kita}
                clickHandle={clickHandle}
                favorites={favorites}
              />
            </div>
          );
        } else {
          return (
            <div key={kita._id}>
              <KitaDetailCard
                kitaInfo={kitaInfo}
                user={props.user}
                kita={kita}
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
