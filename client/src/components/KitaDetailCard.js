import React from "react";
// import axios from "axios";
// import useKitaSearch from "../useKitaSearch";

// Style
import "../assets/stylesheets/kitaDetailCard.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPhoneSquareAlt,
  faEnvelopeSquare
} from "@fortawesome/free-solid-svg-icons";

function KitaDetailCard(props) {
  // console.log("Card props:", props.kitas);
  const card = [...props.kitas].map(kita => {
    const {
      _id,
      name,
      einrichtungsart,
      traegerart,
      adresse,
      postleitzahl,
      stadt,
      viertel,
      telefon,
      email,
      // paedagogischeSchwerpunkte,
      // oeffnungszeiten,
      // unter3Jahre,
      // ueber3Jahre,
      fruehestesAufnahmealterInMonaten
      // paedagogischeAnsaetze,
      // thematischeSchwerpunkte
    } = kita;

    return (
      <div key={_id} className="card">
        <div className="card-header flex">
          <h4>{name}</h4>
          <p>ab {fruehestesAufnahmealterInMonaten} M.</p>
        </div>
        <span>
          {adresse}, {postleitzahl} {stadt}
        </span>
        <hr />
        <p>
          {einrichtungsart} in {viertel}
        </p>
        <div className="address">
          <p>
            <FontAwesomeIcon icon={faPhoneSquareAlt} className="icon" />
            {telefon}
          </p>
          <p>
            <FontAwesomeIcon icon={faEnvelopeSquare} className="icon" />
            {email}
          </p>
        </div>
        <span>
          <hr />
          Träger: <strong>{traegerart}</strong>
        </span>
      </div>
    );
  });

  return card;
}

export default KitaDetailCard;
