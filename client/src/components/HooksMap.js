import React, { useState, useEffect, useRef } from "react";
import ReactMapGL, { Marker, FlyToInterpolator, Popup } from "react-map-gl";
// import mapboxgl from "mapbox-gl";
import useSupercluster from "use-supercluster";
import axios from "axios";
import "../assets/stylesheets/map.css";
// import KitaDetailCard from "./KitaDetailCard";
import useKitaSearch from "../useKitaSearch";

function HooksMap() {
  const [data, setData] = useState([]);
  const [viewport, setViewport] = useState({
    latitude: 52.518365,
    longitude: 13.341646,
    width: "70%",
    height: "90vh",
    zoom: 12
  });
  const [showPopup, setShowPopup] = useState({ showPopup: true });

  const points = data.map(kitas => ({
    type: "Feature",
    properties: {
      cluster: false,
      kitaId: kitas._id
    },
    geometry: {
      types: "Point",
      coordinates: [parseFloat(kitas.long), parseFloat(kitas.lat)]
    }
  }));

  const mapRef = useRef();

  useEffect(() => {
    axios
      .get("/api/kita?page=1")
      .then(res => {
        // console.log("We have our data", res.data.results);
        setData(res.data.results);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  const bounds = mapRef.current
    ? mapRef.current
        .getMap()
        .getBounds()
        .toArray()
        .flat()
    : null;

  const { clusters, supercluster } = useSupercluster({
    points,
    bounds,
    zoom: viewport.zoom,
    options: { radius: 45, maxZoom: 20 }
  });

  return (
    <ReactMapGL
      mapStyle="mapbox://styles/mapbox/outdoors-v11"
      {...viewport}
      maxZoom={20}
      mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
      onViewportChange={newViewport => {
        setViewport({ ...newViewport });
      }}
      ref={mapRef}
      className="cardMap-container"
    >
      {clusters.map(cluster => {
        // every cluster point has coordinates
        const [longitude, latitude] = cluster.geometry.coordinates;
        // the point may be either a cluster or a crime point
        const {
          cluster: isCluster,
          point_count: pointCount
        } = cluster.properties;

        // we have a cluster to render
        if (isCluster) {
          return (
            <Marker
              key={`cluster-${cluster.id}`}
              latitude={latitude}
              longitude={longitude}
            >
              <div
                className="cluster-marker"
                style={{
                  width: `${10 + (pointCount / points.length) * 20}px`,
                  height: `${10 + (pointCount / points.length) * 20}px`
                }}
                onClick={() => {
                  const expansionZoom = Math.min(
                    supercluster.getClusterExpansionZoom(cluster.id),
                    20
                  );

                  setViewport({
                    ...viewport,
                    latitude,
                    longitude,
                    zoom: expansionZoom,
                    transitionInterpolator: new FlyToInterpolator({
                      speed: 2
                    }),
                    transitionDuration: "auto"
                  });
                }}
              >
                {pointCount}
              </div>
            </Marker>
          );
        }

        return (
          <Marker
            key={cluster.properties.kitaId}
            latitude={latitude}
            longitude={longitude}
          >
            {showPopup && (
              <Popup
                latitude={latitude}
                longitude={longitude}
                anchor="bottom"
                dynamicPosition={true}
                closeButton={true}
                closeOnClick={true}
                onClose={() => setShowPopup({ showPopup: false })}
              >
                YAY! A POPUP
                {/* <KitaDetailCard kitaInfo={kitaInfo} /> */}
              </Popup>
            )}
            <button className="kita-marker"></button>
          </Marker>
        );
      })}
    </ReactMapGL>
  );
}

export default HooksMap;
