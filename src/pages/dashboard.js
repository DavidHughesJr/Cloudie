import React, { useEffect, useState } from 'react'
import { Box, Typography, Grid, Paper } from '@mui/material'
import SearchBar from '../components/Searchbar'
import { useGetForecastWeatherQuery, useGetHistoryWeatherQuery } from '../services/weatherApi'
import useGeoLocation from '../hooks/useGeoLocation'
import { yesterdayISO } from '../config/helpers'
import windImg from '../img/wind.png'
import rainImg from '../img/rain.png'
import pressureImg from '../img/pressure.png'
import sunImg from '../img/sun.png'
import arrowUp from '../img/arrow-up.png'
import arrowDown from '../img/arrow-down.png'


const Dashboard = () => {
    const getLocation = useGeoLocation()
    const [selectedLocation, setSelectedLocation] = useState('')
    const { data, isFetching } = useGetForecastWeatherQuery(selectedLocation)
    // Get date for history
    const yesterday = yesterdayISO().toString()
    const { data: historyData } = useGetHistoryWeatherQuery({ selectedLocation, yesterday })
    // breakdown api data
    const current = data?.current
    const forecast = data?.forecast?.forecastday
    const history = historyData?.forecast?.forecastday[0]


    useEffect(() => {
        const currentLocation = [getLocation?.coordinates.lat, getLocation?.coordinates.lng].toString()

        setSelectedLocation(currentLocation)
    }, [getLocation])


    const allWind = history?.hour?.map((wind) => {
        return wind.wind_mph
    })

    const allPressure = history?.hour?.map((pressure) => {
        return pressure.pressure_in
    })
    const allRain = history?.hour?.map((rain) => {
        return rain.chance_of_rain
    })
    const sumOfOverview = (item) => {
        const sum = item?.reduce((acc, value) => {
            return acc + value / 24
        }, 0)
        return sum
    }
    const yesterdayWind = sumOfOverview(allWind)
    const yesterdayPressure = sumOfOverview(allPressure)
    const yesterdayRain = sumOfOverview(allRain)


    const todaysOverviewItems = [
        { icon: windImg, item: 'Wind Speed', value: `${current?.wind_mph}mph`, arrow: yesterdayWind <= current?.wind_mph ? arrowUp : arrowDown, change: `${(yesterdayWind - current?.wind_mph).toFixed(2)}mph` },
        { icon: rainImg, item: 'Rain Chance', value: `${forecast?.[0]?.day?.daily_chance_of_rain}%`, arrow: yesterdayRain <= forecast?.[0]?.day?.daily_chance_of_rain ? arrowUp : arrowDown, change: `${(yesterdayRain - forecast?.[0]?.day?.daily_chance_of_rain).toFixed(2)}%` },
        { icon: pressureImg, item: 'Pressure', value: `${current?.pressure_in}in`, arrow: yesterdayPressure <= current?.pressure_in ? arrowUp : arrowDown, change: `${(yesterdayPressure - current?.pressure_in).toFixed(2)}in` },
        { icon: sunImg, item: 'Uv Index', value: current?.uv, arrow: history?.day?.uv <= current?.uv ? arrowUp : arrowDown, change: `${(current?.uv - history?.day?.uv)}uv` }
    ]


    if (isFetching) return 'Loading'


    console.log(forecast?.[0]?.day?.daily_chance_of_rain)

    return (
        <Box>
            <Box sx={{ padding: '1rem 0 3rem 1rem', display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid lightgrey' }}>
                <Box>
                    <Typography variant='h5'> Date </Typography>
                    <Typography variant='subtitle2'> Another Date </Typography>
                </Box>
                <SearchBar setSelectedLocation={setSelectedLocation} />
            </Box>
            {/* // Todays Overview */}
            <Box sx={{ marginTop: '2rem' }}>
                <Typography sx={{ marginBottom: '1rem' }} variant='h5'> Todays Overview </Typography>
                <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                    {
                        todaysOverviewItems.map(({ icon, item, value, change, arrow }) =>
                            <Grid item xs={6}>
                                <Paper sx={{ display: 'flex', width: '100%', height: '10rem', justifyContent: 'space-around', alignItems: 'center', backgroundColor: '#FBFBFB' }} elevation={0}>
                                    <div>
                                        <img className='img-icon' src={icon} alt='icon' />
                                    </div>
                                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                                        <Typography variant='subtitle2'> {item} </Typography>
                                        <Typography variant='h5'> {value} </Typography>
                                    </div>
                                    <div className='arrow-container'>
                                        <img className='img-arrow' src={arrow} />
                                        <Typography variant='subtitle'> {change} </Typography>
                                    </div>

                                </Paper>
                            </Grid>
                        )
                    }
                </Grid>
            </Box>
            {/* Weekly overview  */}
            <Box sx={{ marginTop: '2rem' }}>
                Weekly
            </Box>
        </Box>
    )
}

export default Dashboard