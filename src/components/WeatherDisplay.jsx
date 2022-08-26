import React, { useEffect } from 'react'
import useGeoLocation from '../hooks/useGeoLocation'
import Moment from 'react-moment';
import { useSelector, useDispatch } from 'react-redux'
import { WeatherContainer } from '../theme/containers'
import { Box, Typography, Paper } from '@mui/material'
import { StyledLinearProgress } from '../theme/theme'
import { useGetForecastWeatherQuery } from '../services/weatherApi'
import { setLocation } from '../services/weatherSlice'



const WeatherDisplay = () => {

    const locationState = useSelector((state) => state.weatherState.location)
    const { data, isFetching } = useGetForecastWeatherQuery(locationState)
    const current = data?.current
    const forecast = data?.forecast?.forecastday
    const location = data?.location
    const dispatch = useDispatch()
    const dateToFormat = location?.localtime




    if (isFetching) return 'Loading'

    return (
        <WeatherContainer>
            <Typography color='secondary'> {location.name} </Typography>
            <Typography color='secondary'>  <Moment format="LT" date={dateToFormat} />  </Typography>


            <Typography color='secondary'> Temp   </Typography>
            <StyledLinearProgress variant="determinate" value={44} />
            <StyledLinearProgress variant="determinate" value={44} />
            <StyledLinearProgress variant="determinate" value={44} />
            <StyledLinearProgress variant="determinate" value={44} />


            <Typography color='secondary'> Sunrise & Sunset </Typography>
            <Paper> SunRise</Paper>
            <Paper> Sunset</Paper>
        </WeatherContainer>
    )
}

export default WeatherDisplay