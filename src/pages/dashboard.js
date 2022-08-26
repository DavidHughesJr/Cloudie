import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setLocation } from '../services/weatherSlice'
import { Box, Typography } from '@mui/material'
import { useGetForecastWeatherQuery } from '../services/weatherApi'
import Moment from 'react-moment';
import useGeoLocation from '../hooks/useGeoLocation'
import AverageDailyTemp from '../components/AverageDailyTemp'
import TodaysOverview from '../components/TodaysOverview'
import SearchBar from '../components/Searchbar'


const Dashboard = () => {
    const getGeoLocation = useGeoLocation()
    const locationState = useSelector((state) => state.weatherState.location)
    const { data, isFetching } = useGetForecastWeatherQuery(locationState)
    const current = data?.current
    const forecast = data?.forecast?.forecastday
    const location = data?.location
    const dispatch = useDispatch()
    const dateToFormat = location?.localtime

    useEffect(() => {
        const currentLocation = [getGeoLocation?.coordinates.lat, getGeoLocation?.coordinates.lng].toString()
        dispatch(setLocation(currentLocation))
    }, [getGeoLocation])

    if (isFetching) return 'Loading'

    return (
        <Box>
            <Box sx={{ paddingBottom: '2rem', display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid lightgrey' }}>
                <Box>
                    <Typography variant='h5'> {location?.name} </Typography>
                    <Typography variant='subtitle2'> {location?.region} </Typography>
                    <Typography variant='subtitle2'>  <Moment format="LLL" date={dateToFormat} />  </Typography>
                </Box>
                <SearchBar />
            </Box>
            <TodaysOverview current={current} forecast={forecast}/> 
            <AverageDailyTemp forecast={forecast} /> 
        </Box>
    )
}

export default Dashboard