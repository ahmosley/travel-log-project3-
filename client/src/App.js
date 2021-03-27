import * as React from "react";
import { useState, useEffect } from "react";
import ReactMapGL from "react-map-gl";
import { listLogEntries } from './API';

const App = () => {
  const [viewport, setViewport] = useState({
    width: "100vw",
    height: "100vh",
    latitude: 37.6,
    longitude: -95.665,
    zoom: 3,
  });
  

  useEffect(() => {
    (async() =>{
    const logEntries= await listLogEntries();
    console.log(logEntries);
    })();
  }, []);


  return (
    <ReactMapGL
      {...viewport}
      mapStyle="mapbox://styles/ahmosley/ckmrvqoqk0i0t17myup56zifd"
      mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
      onViewportChange={(nextViewport) => setViewport(nextViewport)}
    />
  );
};

export default App;
