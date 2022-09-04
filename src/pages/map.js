import React, { useEffect } from 'react';
import Mapbox from '../components/Mapbox'
import News from '../components/News';
import { Box, Stack, Typography } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { useGetForecastWeatherQuery, useGetSearchWeatherQuery } from '../services/weatherApi';
import { useGetWeatherNewsQuery } from '../services/newsApi'
import { setLocation } from '../services/weatherSlice';
import { Search } from '@mui/icons-material';

const Map = () => {
  const locationState = useSelector((state) => state.weatherState.location)
  const { data, isFetching } = useGetForecastWeatherQuery(locationState)
  const dispatch = useDispatch()
  const location = data?.location
  const current = data?.current



  const { data: news } = useGetWeatherNewsQuery(location?.region)



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