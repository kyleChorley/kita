import React, { Component } from "react";
import "./App.css";

// components
import Navbar from "./components/Navbar";
import CardList from "./components/CardList";
import HooksMap from "./components/HooksMap";

class App extends Component {
  render() {
    return (
      <div className="main-app">
        <Navbar />
        <div className="cardMap-container">
          <CardList />

          <HooksMap />
        </div>
      </div>
    );
  }
}

export default App;
