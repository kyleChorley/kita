import React from "react";
import StarYellow from "../assets/images/starYellow.png";
import StarBlack from "../assets/images/starBlack.png";

// Style
import "../assets/stylesheets/kitaDetailCard.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPhoneSquareAlt,
  faEnvelopeSquare
} from "@fortawesome/free-solid-svg-icons";

const KitaDetailCard = props => {
  console.log("Card props:", props);

  const { kita, clickHandle, user, favorites } = props;
  console.log(kita);

  const starColor = (
    <>
      {user ? (
        favorites.includes(kita) === false ? (
          <img className="favorite-star" src={StarBlack} alt="" />
        ) : (
          <img className="favorite-star" src={StarYellow} alt="" />
        )
      ) : null}
    </>
  );

  const alreadyFavorite = (
    <>
      <img className="favorite-star" src={StarYellow} alt="" />
    </>
  );

  const {
    kitaId,
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

  console.log(props);

  return (
    <div className="card">
      <div className="card-header flex">
        <h4>{name}</h4>
        <p>ab {fromAge} M.</p>
      </div>
      <span className="card-header-span flex">
        {address}, {postCode} {city}
        <div className="btn">
          <div onClick={() => clickHandle(props.kitaInfo)}>
            {props.relevant ? alreadyFavorite : starColor}
          </div>
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
};

export default KitaDetailCard;
