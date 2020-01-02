import React from "react";
import axios from "axios";

// Style
import "../assets/stylesheets/kitaDetailCard.css";

class KitaDetailCard extends React.Component {
  state = {
    kitas: []
  };

  getData = () => {
    axios.get("/api/kita").then(res => {
      const kitas = res.data.map(kita => {
        return kita;
      });
      this.setState({
        kitas: kitas.slice(0, 10)
      });
    });
  };

  componentDidMount() {
    this.getData();
  }

  render() {
    const card = this.state.kitas.map(kita => {
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
        paedagogischeSchwerpunkte,
        oeffnungszeiten,
        unter3Jahre,
        ueber3Jahre,
        fruehestesAufnahmealterInMonaten,
        paedagogischeAnsaetze,
        thematischeSchwerpunkte
      } = kita;

      return (
        <div key={_id} className="card">
          <h1>{name}</h1>
        </div>
      );
    });

    return card;
  }
}

export default KitaDetailCard;
