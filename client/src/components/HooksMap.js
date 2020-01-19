import React, { useState, useEffect, useRef } from "react";
import ReactMapGL, { Marker, FlyToInterpolator, Popup } from "react-map-gl";
import useSupercluster from "use-supercluster";
import "../assets/stylesheets/map.css";
import useKitaSearch from "../useKitaSearch";
import KitaDetailCard from "./KitaDetailCard";

function HooksMap(props) {
  const [page] = useState(1);
  const [limit] = useState(0);
  const { kitas } = useKitaSearch(props.query, page, limit);
  const [viewport, setViewport] = useState({
    latitude: 52.518365,
    longitude: 13.341646,
    width: "70%",
    height: "90vh",
    zoom: 9
  });

  const [showPopup, setShowPopup] = useState(null);

  const points = [...new Set([...kitas])].map(kitas => ({
    type: "Feature",
    properties: {
      cluster: false,
      kitaId: kitas._id,
      fromAge: kitas.fruehestesAufnahmealterInMonaten,
      name: kitas.name,
      address: kitas.adresse,
      postCode: kitas.postleitzahl,
      city: kitas.stadt,
      cityQuarter: kitas.stadt,
      type: kitas.einrichtungsart,
      phone: kitas.telefon,
      mail: kitas.email,
      owner: kitas.traegerart
    },
    geometry: {
      types: "Point",
      coordinates: [parseFloat(kitas.long), parseFloat(kitas.lat)]
    }
  }));

  const mapRef = useRef();

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
  console.log(clusters);

  return (
    <ReactMapGL
      mapStyle="mapbox://styles/mapbox/outdoors-v11"
      {...viewport}
      maxZoom={20}
      mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
      onViewportChange={viewport => {
        setViewport({ ...viewport });
      }}
      ref={mapRef}
      className="cardMap-container"
    >
      {clusters.map(cluster => {
        // console.log(cluster);
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
          <div>
            <Marker
              key={cluster.kitaId}
              latitude={latitude}
              longitude={longitude}
            >
              {/* {cluster.geometry.coordinates.map(() => ( */}
              <div
                className="kita-marker"
                onClick={e => {
                  e.preventDefault();
                  setShowPopup(cluster);
                }}
              ></div>
              {/* ))} */}
              {/* <button className="kita-marker"></button> */}
            </Marker>
            <div>
              {showPopup ? (
                <Popup
                  latitude={showPopup.geometry.coordinates[1]}
                  longitude={showPopup.geometry.coordinates[0]}
                  anchor="bottom"
                  dynamicPosition={true}
                  closeButton={true}
                  closeOnClick={true}
                  onClose={() => {
                    setShowPopup(false);
                  }}
                >
                  <div>{cluster.kitaId}</div>
                  {/* <KitaDetailCard kitaInfo={points.properties} /> */}
                </Popup>
              ) : null}
            </div>
          </div>
        );
      })}
    </ReactMapGL>
  );
}

export default HooksMap;
