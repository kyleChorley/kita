import React, { Component } from "react";
// import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";
// import ReactMapGL, { Marker } from "react-map-gl";

// components
import Navbar from "./components/Navbar";
// import Map from "./components/Map";
import CardList from "./components/CardList";
// import Map from "./components/Map";
import HooksMap from "./components/HooksMap";

class App extends Component {
  render() {
    return (
      <div>
        <Navbar />
        <div className="main-app">
          <CardList />
          {/* <Map /> */}
          <HooksMap />
        </div>
      </div>
    );
  }
}

export default App;
