import React, { useState } from 'react'
import { Box, Typography, Grid, Paper } from '@mui/material'
import SearchBar from '../components/Searchbar'
import { useGetForecastWeatherQuery } from '../services/weatherApi'
import windImg from '../img/wind.png'
import rainImg from '../img/rain.png'
import pressureImg from '../img/pressure.png'
import sunImg from '../img/sun.png'
import useGeoLocation from '../hooks/useGeoLocation'


const Dashboard = () => {
    const getLocation = useGeoLocation()
    const currentLocation = getLocation?.coordinates
    const [selectedLocation, setSelectedLocation] = useState('33.599589,-88.7012556')
    const { data, isFetching } = useGetForecastWeatherQuery('33.599589,-88.7012556')
    console.log(currentLocation)

    const current = data?.current

    console.log(current)

    const todaysOverviewItems = [
        { icon: windImg, item: 'Wind Speed', value: current?.wind_mph, direction: 'Direction', path: current?.wind_dir },
        { icon: rainImg, item: 'Rain Chance', value: current?.wind_mph, direction: 'Direction', path: current?.wind_dir },
        { icon: pressureImg, item: 'Pressure', value: current?.wind_mph, direction: 'Direction', path: current?.wind_dir },
        { icon: sunImg, item: 'Uv Index', value: current?.wind_mph, direction: 'Direction', path: current?.wind_dir }
    ]

    console.log(data)


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
                        todaysOverviewItems.map(({ icon, item, value }) =>
                            <Grid item xs={6}>
                                <Paper sx={{ display: 'flex', width: '100%', height: '10rem', justifyContent: 'space-around', alignItems: 'center', backgroundColor: '#FBFBFB' }} elevation={0}>
                                    <div>
                                        <img className='img-icon' src={icon} alt='icon' />
                                    </div>
                                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                                        <Typography> {item} </Typography>
                                        <Typography> {item} </Typography>
                                    </div>
                                    Window Direction
                                </Paper>
                            </Grid>
                        )
                    }
                </Grid>
            </Box>
            {/* Weekly overview  */}
            <Box sx={{marginTop: '2rem'}}>
                    Weekly
            </Box>
        </Box>
    )
}

export default Dashboard