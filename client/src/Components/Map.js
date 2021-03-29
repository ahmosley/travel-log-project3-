import  React from "react";
import { useState, useEffect } from "react";
import ReactMapGL, { Marker, Popup } from "react-map-gl";
import { listLogEntries } from "../API";

const Map = () => {
  const [logEntries, setLogEntries] = useState([]);
  const [showPopup, setShowPopup] = useState({});
  const [viewport, setViewport] = useState({
    width: "100vw",
    height: "100vh",
    latitude: 37.6,
    longitude: -95.665,
    zoom: 3,
  });

  const getEntries = async () => {
    const logEntries = await listLogEntries();
    setLogEntries(logEntries);
  };

  useEffect(() => {
    getEntries();
  }, []);

  return (
    <ReactMapGL
      {...viewport}
      mapStyle="mapbox://styles/ahmosley/ckmrvqoqk0i0t17myup56zifd"
      mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
      onViewportChange={(nextViewport) => setViewport(nextViewport)}
    >
      {logEntries.map((entry) => (
        <Marker
          key={entry._ID}
          latitude={entry.latitude}
          longitude={entry.longitude}
          onClick= {() => setShowPopup }
        >
          <div></div>
          onClick=
          {() =>
            setShowPopup({
              // ...showPopup,
              [entry._id]: true,
            })
          }
          <div>
            <svg
              className="marker"
              width="24px"
              height="24px"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="3"
              fill="none"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
              <circle cx="12" cy="10" r="3"></circle>
            </svg>
          </div>
        </Marker>
      ))}
      {showPopup && (
        <Popup
          latitude={37.78}
          longitude={-122.41}
          closeButton={true}
          closeOnClick={false}
          onClose={() => setShowPopup({})}
          anchor="top"
        >
          <div>You are here</div>
        </Popup>
      )}
    </ReactMapGL>
  );
};

export default Map;