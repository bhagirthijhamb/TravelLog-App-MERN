import React, { useState, useEffect } from 'react';
import ReactMapGL, { Marker, Popup } from 'react-map-gl';
import { listLogEntries } from './API';
import LogEntryForm from './LogEntryForm';

const App = () => {
  const [logEntries, setLogEntries] = useState([]);
  const [showPopup, setShowPopup] = useState({});
  const [addEntryLocation, setAddEntryLocation] = useState(null);
  const [viewport, setViewport] = useState({
    width: '100vw',
    height: '100vh',
    latitude: 37.6,
    longitude: -95.665,
    zoom: 3
  });

  const getEntries = async() => {
    const logEntries = await listLogEntries();
    setLogEntries(logEntries);
  }

  useEffect(() => {
    // async IIFE
    // (async() => {
    //   const logEntries = await listLogEntries();
    //   // console.log(logEntries);
    //   setLogEntries(logEntries);
    // })();
 
    // when the component loads, we call getEntries()
    getEntries()
  }, [])
  
  // console.log(showPopup);

  const showAddMarkerPopup = (e) => {
    // console.log(e);
    const [longitude, latitude] = e.lngLat;
    setAddEntryLocation({
      latitude,
      longitude
    }) 
  }
  // console.log(addEntryLocation)

  const REACT_APP_MAPBOX_TOKEN='pk.eyJ1IjoiYmhhZ2lydGhpIiwiYSI6ImNra29pdDc2eDFyM3Yydm9hdzhyZXN1a2IifQ.vrX1Rz9qk7wk4-cIUjRI7w'
  
  
  return (
    <ReactMapGL
      {...viewport}
      mapStyle="mapbox://styles/bhagirthi/ckkok7vzi19sj17pim3eyh62m"
      mapboxApiAccessToken={REACT_APP_MAPBOX_TOKEN}
      onViewportChange={nextViewport => setViewport(nextViewport)}
      onDblClick={showAddMarkerPopup}
    >
      {logEntries.map(entry => (
        <React.Fragment key={entry._id}>
        <Marker  
          latitude={entry.latitude} 
          longitude={entry.longitude} 
          offsetLeft={-12} 
          offsetTop={-24}
        >
          {/* <div>{entry.title}</div> */}
          <div
            onClick={() => setShowPopup({
            ...showPopup,
            [entry._id]: true
          })}
          >
            <svg viewBox="0 0 24 24" width="24" height="24" stroke="red" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="css-i6dzq1"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
          </div>
        </Marker>
        {
          showPopup[entry._id] ? (
          <Popup
            latitude={entry.latitude} 
            longitude={entry.longitude}
            dynamicPosition={true}
            closeButton={true}
            closeOnClick={false}
            onClose={() => setShowPopup({
              ...showPopup,
              [entry._id]: false
            })}
            anchor="top" >
            <div className='popup'>
              <h3>{entry.title}</h3>
              <p>{entry.comments}</p>
              <small>Visited on: {new Date(entry.visitDate).toLocaleDateString()}</small>
              {entry.image && <img src={entry.image} alt={entry.title} />}
            </div>
          </Popup>
          ) : null
        }
        </React.Fragment>
      ))}
    
      {addEntryLocation ? (
        <>
          <Marker 
            latitude={addEntryLocation.latitude} 
            longitude={addEntryLocation.longitude} 
            offsetLeft={-12} 
            offsetTop={-24}
          >
            {/* <div>{entry.title}</div> */}
            <div>
              <svg viewBox="0 0 24 24" width="24" height="24" stroke="red" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="css-i6dzq1"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
            </div>
          </Marker>
          <Popup
            latitude={addEntryLocation.latitude} 
            longitude={addEntryLocation.longitude}
            dynamicPosition={true}
            closeButton={true}
            closeOnClick={false}
            // onClose={() => setShowPopup({
            //   ...showPopup,
            //   [entry._id]: false
            // })}
            onClose={() => setAddEntryLocation(null)}
            anchor="top" >
            <div className='popup'>
              <h3>Add your new log entry</h3>
            </div>
            <LogEntryForm 
              location={addEntryLocation} 
              onClose={() => {
                setAddEntryLocation(null);
                getEntries();
              }}
            />
          </Popup>
        </>
      )  : null}
    </ReactMapGL>
  );
}

export default App;
