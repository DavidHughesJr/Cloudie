import React from 'react';
import Mapbox from '../components/Mapbox'
import News from '../components/News';
import { Box, Stack } from '@mui/material';
import { useSelector } from 'react-redux';
import { useGetForecastWeatherQuery } from '../services/weatherApi';
import { useGetWeatherNewsQuery } from '../services/newsApi'


const Map = () => {
  const locationState = useSelector((state) => state.weatherState.location)
  const { data, isFetching } = useGetForecastWeatherQuery(locationState)
  const location = data?.location
  const current = data?.current



  const { data: news } = useGetWeatherNewsQuery(location?.region)

console.log(location)

  if (isFetching) return 'Loading'

  return (
    <Box>
      <Stack spacing={2}>
        <Mapbox location={location} current={current} />
        <News news={news} />
      </Stack>
    </Box>
  )
}

export default Map