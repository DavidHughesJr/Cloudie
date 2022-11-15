import React, { useState, useEffect, useRef } from 'react';
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import { useSelector, useDispatch } from 'react-redux';

import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import { setLocation, setSaves, setItemSaved } from '../services/weatherSlice';


//  *** imports for PURE JS based mapbox ***

import { Button } from '@mui/material';

// *** imports for REACT based mapbox ***
// import Map, { Marker, Popup, GeolocateControl, NavigationControl, useControl } from 'react-map-gl';
// import { Typography, Stack, Button } from '@mui/material';
// import MapBoxGeocoder from '@mapbox/mapbox-gl-geocoder';



import 'mapbox-gl/dist/mapbox-gl.css';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css'


const token = mapboxgl.accessToken = `pk.eyJ1IjoiZGF2aWRodWdoZXNqciIsImEiOiJjbGFnYjk0ZTIwZGh0M3Vxd3I2aGFodG13In0.GSLD5MNRwE8n3Da_bqQS-A`


const Mapbox = ({ location, current }) => {

  const lat = location?.lat
  const lng = location?.lon

  // eslint-disable-next-line
  const fahrenheit = useSelector(state => state.weatherState.fahrenheit)
  const dispatch = useDispatch()


  // const [viewState, setViewState] = useState({
  //   longitude: lng,
  //   latitude: lat,
  //   zoom: 10
  // });
  // const [showPopup, setShowPopup] = useState(false);


  // const geolocateControlRef = React.useCallback((ref) => {
  //   if (ref) {
  //     // Activate as soon as the control is loaded
  //     ref.trigger();
  //   }
  // }, []);


  // const Geocoder = () => {
  //   const geoMap = new MapBoxGeocoder({
  //     accessToken: token,
  //     marker: false,
  //     collapsed: true
  //   })
  //   useControl(() => geoMap)
  //   geoMap.on('result', (e) => {
  //     dispatch(setLocation(e.result.text))

  //   })
  // }


  const savedItems = JSON.parse(localStorage.getItem('savedItems'))
  const saves = useSelector(state => state.weatherState.saves)
  const savedToLocal = useSelector(state => state.weatherState.itemSaved)

  useEffect(() => {
    dispatch(setSaves(savedItems))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])


  const addSaves = (item) => {
    let itemList = [...saves]
    let addArray = true
    for (let i = 0; i < saves.length; i++) {
      if (saves[i].name === item.name) {
        itemList.splice(i, 1);
        addArray = false
      }
    }
    if (addArray) {
      itemList.push(item)
    }
    dispatch(setSaves([...itemList]))
  }

  useEffect(() => {
    // save to local storage
    localStorage.setItem('savedItems', JSON.stringify(saves))
    if (savedItems) {
      for (let i = 0; i < savedItems.length; i++) {
        if (savedItems[i].name === location.name) {
          dispatch(setItemSaved(true))
          // break to stop statement from throwing false
          break
        } else if (savedItems[i].id !== location.name) {
          dispatch(setItemSaved(false))
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [savedItems])

  // *** ATTENTION THIS STARTS mapbox fix for netlify *** 
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng2, setLng] = useState(lng);
  const [lat2, setLat] = useState(lat);
  const [zoom, setZoom] = useState(9);


  useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [lng2, lat2],
      zoom: zoom,
    }); // eslint-disable-next-line
    const marker = new mapboxgl.Marker()
      .setLngLat([lng2, lat2]) // Marker [lng, lat] coordinates
      .setPopup(
        new mapboxgl.Popup({ offset: 25 }) // add popups
          .setHTML(
            `<h3>You are here </h3>`
          )
      )
      .addTo(map.current); // Initialize a new marker

    const geocoder = new MapboxGeocoder({
      // Initialize the geocoder
      accessToken: token, // Set the access token
      mapboxgl: mapboxgl, // Set the mapbox-gl instance
      marker: false, // Do not use the default marker style
    });
    // add geocoder to map
    map.current.addControl(geocoder);

    // Listen for the `result` event from the Geocoder // `result` event is triggered when a user makes a selection
    //  Add a marker at the result's coordinates
    geocoder.on('result', (e) => {
      dispatch(setLocation(e.result.text))
    });
  });

  useEffect(() => {
    if (!map.current) return; // wait for map to initialize
    map.current.on('move', () => {
      setLng(map.current.getCenter().lng.toFixed(4));
      setLat(map.current.getCenter().lat.toFixed(4));
      setZoom(map.current.getZoom().toFixed(2));
    });
  });

  // *** ATTENTION THIS ENDS mapbox fix for netlify *** 

  return (
    <>
      {/* START PURE JAVASCRIPT BASED MAPBOX FOR DEPLOYMENT */}
      <div ref={mapContainer} className="map-container" />
      {/* END PURE JAVASCRIPT BASED MAPBOX FOR DEPLOYMENT */}

      {/* REACT BASED MAPBOX */}
      {/* <Map
        {...viewState}
        style={{ width: '50', height: '50vh' }}
        onMove={evt => setViewState(evt.viewState)}
        mapStyle="mapbox://styles/mapbox/streets-v11"
        mapboxAccessToken={token}
      >
        <Marker longitude={lng} latitude={lat} anchor="bottom" >
          <Stack justifyContent="center" alignItems="center" onClick={() => setShowPopup(true)}>
            <img className='mapbox-img' src={current ? current?.condition.icon : ''} alt="weather logo" />
            <Typography color='primary' variant='h6'> {fahrenheit ? `${current?.temp_f}°F` : `${current?.temp_c}°C`} </Typography>
          </Stack>
        </Marker>
        <Geocoder />
        <GeolocateControl position='bottom-right' ref={geolocateControlRef} />
        <NavigationControl position='bottom-right' />
        {showPopup && (
          <Popup longitude={lng} latitude={lat}
            anchor="top"
            closeOnClick={false}
            onClose={() => setShowPopup(false)}>
            You are here
          </Popup>)}
      </Map> */}
      {/* END REACT BASED MAPBOX */}
      <Button onClick={() => { addSaves(location); dispatch(setItemSaved(!savedToLocal)) }} sx={savedToLocal ? { margin: '0 !important', backgroundColor: 'green' } : { margin: '0 !important', backgroundColor: '' }} variant={'contained'}> {savedToLocal ? 'Location Saved' : 'Save location'} </Button>
    </>
  );
}

export default Mapbox

