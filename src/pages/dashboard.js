import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setLocation } from '../services/weatherSlice'
import { Box, Typography, Stack, Divider } from '@mui/material'
import { useGetForecastWeatherQuery } from '../services/weatherApi'
import Moment from 'react-moment';
import useGeoLocation from '../hooks/useGeoLocation'
import WeatherChart from '../components/WeatherChart'
import TodaysOverview from '../components/TodaysOverview'
import SearchBar from '../components/Searchbar'
import ThreeDayForecast from '../components/ThreeDayForecast'


const Dashboard = () => {
    const getGeoLocation = useGeoLocation()
    const locationState = useSelector((state) => state.weatherState.location)
    const { data, isFetching } = useGetForecastWeatherQuery(locationState)
    const dispatch = useDispatch()

    const current = data?.current
    const forecast = data?.forecast?.forecastday
    const location = data?.location
    const dateToFormat = location?.localtime


    useEffect(() => {
        const currentLocation =  locationState? locationState : [getGeoLocation?.coordinates.lat, getGeoLocation?.coordinates.lng].toString()

        dispatch(setLocation(currentLocation))
    }, [getGeoLocation])

    if (isFetching) return 'Loading'

    return (
        <Box p={4}>
            <Stack
                direction={{sm: 'column', md: 'row'}}
                justifyContent="space-between"
                sx={{paddingBottom: 2}}
                >
                <Stack>
                    <Typography variant='h5'> {location?.name} </Typography>
                    <Typography variant='subtitle2'> {location?.region} </Typography>
                    <Typography variant='subtitle2'>  <Moment format="LLL" date={dateToFormat} />  </Typography>
                </Stack>
                <SearchBar location={location}/>
            </Stack>
            <Divider light/> 
            <TodaysOverview current={current} forecast={forecast} />
            <ThreeDayForecast forecast={forecast} /> 
            <WeatherChart forecast={forecast} />
        </Box>
    )
}

export default Dashboard