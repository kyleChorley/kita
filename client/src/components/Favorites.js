import React, { Component } from "react";
import KitaDetailCard from "../components/KitaDetailCard";
import axios from "axios";

class Favorites extends Component {
  state = { favorites: [] };

  getData = () => {
    axios.get("/favorites").then(response => {
      console.log(response);
      this.props.setUser(response.data);
      this.setState({ favorites: response.data.user.kitas }, () => {});
    });
  };

  componentDidMount = () => {
    this.getData();
  };

  clickHandle = kita => {
    console.log(kita);
    const daycare = kita._id;
    const favorites = this.state.favorites.map(el => el._id);
    if (favorites.includes(daycare)) {
      const shallow = [...favorites];
      const indexOfKita = shallow.indexOf(daycare);
      shallow.splice(indexOfKita, 1);
      this.setState({ favorites: shallow }, () => {
        // PUT -> REMOVE KITA FROM USER FAVORITES ARRAY AND DELETE ALLTOGETHER
        axios.put(`/kitas/favorite`, kita).then(response => {
          this.getData();
        });
      });
      // ADD KITA TO FAVORITES
      // ELSE -> KITA TO BE ADDED
    }
  };

  render() {
    console.log(this.props);
    const { kitas } = this.props.user;
    return (
      <div className="card-list">
        {kitas.length ? (
          kitas.map(post => {
            console.log(post);

            return (
              <KitaDetailCard
                user={this.props.user}
                kita={this.props.kita}
                clickHandle={this.clickHandle}
                favorites={kitas}
                relevant={true}
              />
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