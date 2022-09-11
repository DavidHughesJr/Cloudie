import React, { useEffect } from 'react'
import Moment from 'react-moment';
import useGeoLocation from '../hooks/useGeoLocation'
import { useSelector, useDispatch } from 'react-redux'
import { WeatherContainer } from '../theme/containers'
import { Box, Typography, Button, Stack } from '@mui/material'
import { StyledLinearProgress } from '../theme/theme'
import { useGetForecastWeatherQuery } from '../services/weatherApi'
import { setFahrenheit, setLocation } from '../services/weatherSlice';
import { SpaceAroundPaper } from '../theme/theme';
import { Colors } from '../helper/colors'

const WeatherDisplay = () => {
    const getGeoLocation = useGeoLocation()
    const locationState = useSelector((state) => state.weatherState.location)
    const { data, isFetching } = useGetForecastWeatherQuery(locationState)
    const current = data?.current
    const forecast = data?.forecast?.forecastday
    const location = data?.location
    const astro = data?.forecast?.forecastday?.[0].astro
    const dateToFormat = location?.localtime
    const fahrenheit = useSelector(state => state.weatherState.fahrenheit)
    const dispatch = useDispatch()
    const date = new Date()
    const currentHour = date.getHours()
    const rain48HourForecast = data ? [...forecast?.[0]?.hour, ...forecast?.[1]?.hour] : ''


    useEffect(() => {
        const currentLocation = [getGeoLocation?.coordinates.lat, getGeoLocation?.coordinates.lng].toString()
        dispatch(setLocation(currentLocation))
    }, [getGeoLocation])


    if (isFetching) return 'Loading'

    return (
        <WeatherContainer>
            <Box p={4}>
                <Box pb={4} sx={{ borderBottom: '1px solid lightgrey' }}>
                    <Typography variant='h5' color='secondary'> {location?.name} </Typography>
                    <Typography sx={{ paddingBottom: '1rem' }} variant='subtitle2' color='secondary'>  <Moment format="LT" date={dateToFormat} />  </Typography>
                    <img src={current?.condition.icon} alt="weather icon" />
                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                        <Typography variant='h3' color='secondary'> {fahrenheit ? `${current?.temp_f}°F` : `${current?.temp_c}°C`}  </Typography>
                        <Typography variant='h6' color='secondary'>  {current?.condition.text}</Typography>
                    </Stack>
                    <Button onClick={() => dispatch(setFahrenheit(fahrenheit ? false : true))} variant="contained"> {fahrenheit ? 'celsius' : 'fahrenheit'} </Button>
                </Box>
                <Stack sx={{ marginTop: '1rem' }}>
                    <Typography sx={{ paddingBottom: '1rem' }} variant='h6' color='secondary'> Chance of rain </Typography>
                    {
                        rain48HourForecast?.slice(currentHour, currentHour + 4).map((hour, i) => {
                            const dateToFormathour = hour.time
                            return (
                                <Box key={i} sx={{ display: 'flex', justifyContent: 'space-between', gap: '1rem' }}>
                                    <Typography variant='subtitle2' color='secondary'> {fahrenheit ? `${Math.round(hour?.temp_f)}°F` : `${Math.round(hour?.temp_c)}°C`} </Typography>
                                    <Typography variant='subtitle2' color='secondary'> <Moment format="hhA" date={dateToFormathour} /> </Typography>
                                    <StyledLinearProgress variant="determinate" value={hour.chance_of_rain} />
                                    <Typography sx={{ minWidth: '2rem', textAlign: 'left' }} variant='caption' color='secondary'> {hour.chance_of_rain}%</Typography>
                                </Box>
                            )
                        })
                    }
                </Stack>
                <Typography sx={{ paddingBottom: '1rem' }} variant='h5' color='secondary'> Sunrise & Sunset </Typography>
                <Stack spacing={2}>
                    <SpaceAroundPaper sx={{ backgroundImage: Colors.backgroundImage }}>
                        <img src="https://cdn.weatherapi.com/weather/64x64/day/116.png" alt="img" />
                        <Stack>
                            <Typography variant='subtitle2' color='secondary'> Sunrise </Typography>
                            <Typography variant='subtitle2' color='secondary'> {astro.sunrise} </Typography>
                        </Stack>
                        <Typography variant='subtitle2' color='secondary'> {astro.sunrise} </Typography>
                    </SpaceAroundPaper>
                    <SpaceAroundPaper sx={{ backgroundImage: Colors.backgroundImage }}>
                        <img src="https://cdn.weatherapi.com/weather/64x64/night/116.png" alt="img" />
                        <Stack>
                            <Typography variant='subtitle2' color='secondary'> Sunset </Typography>
                            <Typography variant='subtitle2' color='secondary'> {astro.sunset}  </Typography>
                        </Stack>
                        <Typography variant='subtitle2' color='secondary'> {astro.sunset} </Typography>
                    </SpaceAroundPaper>
                </Stack>
            </Box>
        </WeatherContainer >
    )
}

export default WeatherDisplay