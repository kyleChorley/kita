import React, { Component } from "react";
import KitaDetailCard from "../components/KitaDetailCard";
import axios from "axios";

//Style
import "../assets/stylesheets/cardList.css";

class Favorites extends Component {
  state = { favorites: null };

  getData = () => {
    axios.get("/kitaDetailCard/myfavorites").then(response => {
      console.log(response);
      this.props.setUser(response.data);
      this.setState({ favorites: response.data.kitas }, () => {});
    });
  };

  componentDidMount = () => {
    this.getData();
  };

  clickHandle = kita => {
    console.log(kita);
    const daycare = kita.kita_id;
    const favorites = this.state.favorites.map(el => el._id);
    if (favorites.includes(daycare)) {
      const shallow = [...favorites];
      const indexOfKita = shallow.indexOf(daycare);
      shallow.splice(indexOfKita, 1);
      this.setState({ favorites: shallow });
      // PUT -> REMOVE KITA FROM USER FAVORITES ARRAY AND DELETE ALLTOGETHER
      axios.put(`/kitaDetailCard/favorite`, kita).then(response => {
        this.getData();
      });

      // ADD KITA TO FAVORITES
      // ELSE -> KITA TO BE ADDED
    }
  };

  render() {
    console.log(this.props);
    const { kitas } = this.props.user;
    console.log(kitas);
    return (
      <div className="card-list">
        {kitas.length ? (
          kitas.map((post, index) => {
            console.log(post);

            {
              /* const kitaInfo = {
              kitaId: post._id,
              fromAge: post.fruehestesAufnahmealterInMonaten,
              name: post.name,
              address: post.adresse,
              postCode: post.postleitzahl,
              city: post.stadt,
              cityQuarter: post.stadt,
              type: post.einrichtungsart,
              phone: post.telefon,
              mail: post.email,
              owner: post.traegerart
            }; */
            }

            return (
              <div key={post._id}>
                <KitaDetailCard
                  user={this.props.user}
                  kitas={kitas}
                  // kitaInfo={kitaInfo}
                  post={post}
                  clickHandle={this.clickHandle}
                  favorites={kitas}
                  relevant={true}
                />
              </div>
            );
          })
        ) : (
          <>No Favorites Yet!!!</>
        )}
      </div>
    );
  }
}

export default Favorites;
