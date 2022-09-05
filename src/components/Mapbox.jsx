import React, { useState } from 'react';
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import Map, { Marker, Popup, GeolocateControl, NavigationControl, useControl } from 'react-map-gl';
import MapBoxGeocoder from '@mapbox/mapbox-gl-geocoder';
import { useSelector, useDispatch } from 'react-redux';
import { Typography, Stack, Button } from '@mui/material';
import 'mapbox-gl/dist/mapbox-gl.css';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css'
import { setLocation } from '../services/weatherSlice';

const token = mapboxgl.accessToken = 'pk.eyJ1IjoiZGF2aWRodWdoZXNqciIsImEiOiJjbDN6dmlleGIzcHpoM2NyeHpwYmV0MW9jIn0.IPtZ9U22hIQNl6z1BsldMQ';

const Mapbox = ({ location, current }) => {

  const lat = location?.lat
  const lng = location?.lon

  const [viewState, setViewState] = useState({
    longitude: lng,
    latitude: lat,
    zoom: 9
  });
  const [showPopup, setShowPopup] = useState(false);

  const fahrenheit = useSelector(state => state.weatherState.fahrenheit)
  const dispatch = useDispatch()

  const geolocateControlRef = React.useCallback((ref) => {
    if (ref) {
      // Activate as soon as the control is loaded
      ref.trigger();
    }
  }, []);


  const Geocoder = () => {
    const geoMap = new MapBoxGeocoder({
      accessToken: token,
      marker: false,
      collapsed: true
    })
    useControl(() => geoMap)
    geoMap.on('result', (e) => {
      dispatch(setLocation(e.result.text))

    })
  }



  return (
    <>
      <Map
        {...viewState}
        style={{ width: '50', height: '50vh' }}
        onMove={evt => setViewState(evt.viewState)}
        mapStyle="mapbox://styles/mapbox/streets-v9"
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
      </Map>
      <Button   sx={{ marginTop: '0 !important', }}  variant={'contained'}> Save Location </Button>
    </>
  );
}

export default Mapbox

