import React from "react";

// Style
import "../assets/stylesheets/kitaDetailCard.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPhoneSquareAlt,
  faEnvelopeSquare
} from "@fortawesome/free-solid-svg-icons";

function KitaDetailCard(props) {
  // console.log("Card props:", props);

  const {
    fromAge,
    name,
    address,
    postCode,
    city,
    cityQuarter,
    type,
    phone,
    mail,
    owner
  } = props.kitaInfo;

  return (
    <div className="card">
      <div className="card-header flex">
        <h4>{name}</h4>
        <p>ab {fromAge} M.</p>
      </div>
      <span className="card-header-span flex">
        {address}, {postCode} {city}
        <div className="btn">
          <button>Save</button>
        </div>
      </span>
      <hr />
      <p>
        {type} in {cityQuarter}
      </p>
      <div className="address">
        <p>
          <FontAwesomeIcon icon={faPhoneSquareAlt} className="icon" />
          {phone}
        </p>
        <p>
          <FontAwesomeIcon icon={faEnvelopeSquare} className="icon" />
          {mail}
        </p>
      </div>
      <span>
        <hr />
        Träger: <strong>{owner}</strong>
      </span>
    </div>
  );
}

export default KitaDetailCard;
