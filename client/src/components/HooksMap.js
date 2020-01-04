import React, { useState, useEffect, useRef } from "react";
import ReactMapGL, { Marker, FlyToInterpolator } from "react-map-gl";
// import mapboxgl from "mapbox-gl";
import useSupercluster from "use-supercluster";
import axios from "axios";
import "../assets/stylesheets/map.css";

function HooksMap() {
  const [data, setData] = useState([]);
  const [viewport, setViewport] = useState({
    latitude: 52.518365,
    longitude: 13.341646,
    width: "100vw",
    height: "100vh",
    zoom: 12
  });

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
      .get("/api/kita")
      .then(res => {
        console.log("We have our data", res.data);
        setData(res.data);
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

  // console.log(points);

  return (
    <ReactMapGL
      {...viewport}
      maxZoom={20}
      mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
      onViewportChange={newViewport => {
        setViewport({ ...newViewport });
      }}
      ref={mapRef}
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

        {
          // we have a single point (kita) to render return
        }
        return (
          <Marker
            key={cluster.kitaId}
            longitude={parseFloat(cluster.geometry.coordinates[0])}
            latitude={parseFloat(cluster.geometry.coordinates[1])}
          >
            <button>KITA</button>
          </Marker>
        );
      })}
    </ReactMapGL>
  );
}

export default HooksMap;
