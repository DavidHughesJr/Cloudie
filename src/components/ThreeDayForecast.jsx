import React from 'react'
import { useSelector } from 'react-redux'
import { Typography, Grid, Stack, Paper, } from '@mui/material'
import Moment from 'react-moment'



const ThreeDayForecast = ({ forecast }) => {

    const fahrenheit = useSelector(state => state.weatherState.fahrenheit)

    return (
        <Grid sx={{ paddingTop: 2 }} container columns={{ xs: 1, sm: 2, md: 12 }} >
            {
                forecast?.map((days, i) => (
                    <Grid item xs={1} sm={4} md={4} key={i}>
                        <Paper elevation={2} sx={{ padding: 1, height: '100%' }}>
                            <Stack justifyContent="center"
                                alignItems="center"
                            >
                                <Typography variant='subtitle2'>  <Moment format='dddd' >{days.date}
                                </Moment> </Typography>
                                <Typography variant='caption'> {days.day.condition.text} </Typography>
                                <img className='img-icon-2' src={days.day.condition.icon} alt="weather icon" />
                                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1}>
                                    <Typography color='secondary.dark' variant='body2'> High: {fahrenheit ? `${days.day.maxtemp_f}°F` : `${days.day.maxtemp_c}°C`}</Typography>
                                    <Typography color='secondary.dark' variant='body2'>  Low: {fahrenheit ? `${days.day.mintemp_f}°F` : `${days.day.mintemp_c}°C`} </Typography>
                                </Stack>
                                <Typography color='secondary.dark' variant='subtitle2'> Rain: {days.day.daily_chance_of_rain}% </Typography>
                            </Stack>
                        </Paper>
                    </Grid>
                ))
            }

        </Grid>
    )
}

export default ThreeDayForecast