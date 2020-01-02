import React, { Component } from "react";

// import ReactMapGL, { Marker } from "react-map-gl";
import mapboxgl from "mapbox-gl";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
// import { ReactMapboxGlCluster } from "react-mapbox-gl-cluster";
import axios from "axios";

// style
import "../assets/stylesheets/map.css";

mapboxgl.accessToken = `${process.env.REACT_APP_MAPBOX_TOKEN}`;

class Map extends Component {
  state = {
    lat: 52.518365,
    lng: 13.341646,
    width: "60vw",
    height: "100vh",
    zoom: 16,
    data: [],
    coordinates: []
  };

  getData = () => {
    axios
      .get("/api/kita")
      .then(res => {
        let point = res.data.map(data => {
          return [data.long, data.lat];
        });
        console.log("We have our data", res.data);
        this.setState({ data: res.data, coordinates: point }, () => {
          console.log("COORDINATES", this.state.coordinates);
        });
        const map = new mapboxgl.Map({
          container: this.mapContainer,
          style: "mapbox://styles/mapbox/outdoors-v11",
          center: [this.state.lng, this.state.lat],
          zoom: this.state.zoom
        });

        var geocoder = new MapboxGeocoder({
          // Initialize the geocoder
          accessToken: mapboxgl.accessToken, // Set the access token
          mapboxgl: mapboxgl, // Set the mapbox-gl instance
          marker: false, // Do not use the default marker style
          placeholder: "Finden Sie Kitas in Berlin"
        });

        map.addControl(geocoder);

        const location = res.data.map(point => {
          var markerHeight = 55,
            markerRadius = 35,
            linearOffset = 25;
          var popupOffsets = {
            top: [0, 0],
            "top-left": [0, 0],
            "top-right": [0, 0],
            bottom: [0, 0 - markerHeight],
            "bottom-left": [
              linearOffset,
              (markerHeight - markerRadius + linearOffset) * -1
            ],
            "bottom-right": [
              -linearOffset,
              (markerHeight - markerRadius + linearOffset) * -1
            ],
            left: [markerRadius, (markerHeight - markerRadius) * -1],
            right: [-markerRadius, (markerHeight - markerRadius) * -1]
          };

          const popupText = `<div class="popupTextBox" ><a href="/kita/${point._id}"><h3>${point.name}</h3></a >
          <p class="popupText">${point.adresse}, ${point.postleitzahl} <br> ${point.stadt} ${point.viertel} <br> +49 ${point.telefon} <br> Frühestes Aufnahmealter In Monaten: <span class="earliestAge" style="color: black;">${point.fruehestesAufnahmealterInMonaten}
          </span><br></div>`;

          const coordinates = [point.long, point.lat];
          new mapboxgl.Marker({ offset: [0, 0] })
            .setLngLat(coordinates)
            .setPopup(
              new mapboxgl.Popup({ offset: popupOffsets })
                .setMaxWidth("700px")
                .setHTML(popupText)
            )
            .addTo(map);
        });
      })
      .catch(err => {
        console.log(err);
      });
  };

  componentDidMount() {
    this.getData();
  }

  render() {
    return (
      <div ref={el => (this.mapContainer = el)} className="mapContainer"></div>
    );
  }
}

export default Map;
