import React from 'react'
import { Box, Typography, Grid, Stack, Paper, Divider } from '@mui/material'
import windImg from '../img/wind.png'
import rainImg from '../img/rain.png'
import pressureImg from '../img/pressure.png'
import sunImg from '../img/sun.png'
import { SpaceAroundPaper } from '../theme/theme'
import { Colors } from '../helper/colors'
import { useSelector } from 'react-redux'
import Moment from 'react-moment'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';


const TodaysOverview = ({ current, forecast }) => {

    const todaysOverviewItems = [
        { icon: sunImg, item: 'High', value: current?.uv },
        { icon: sunImg, item: 'Low', value: current?.uv },
        { icon: windImg, item: 'Wind Speed', value: `${current?.wind_mph}mph` },
        { icon: rainImg, item: 'Rain Chance', value: `${forecast?.[0]?.day?.daily_chance_of_rain}%` },
        { icon: pressureImg, item: 'Pressure', value: `${current?.pressure_in}in` },
        { icon: sunImg, item: 'Humidity', value: current?.uv },
    ]

    const fahrenheit = useSelector(state => state.weatherState.fahrenheit)
    const date = new Date()
    const currentHour = date.getHours()
    const hours48length = [...forecast?.[0].hour, ...forecast?.[1].hour]

    return (
        <Box sx={{ marginTop: '2rem' }}>
            <Typography sx={{ marginBottom: '1rem', }} color='primary' variant='h6'> Todays Overview </Typography>
            <Swiper
                spaceBetween={15}
                slidesPerView={10}>
                {
                    hours48length?.slice(currentHour).map((hour, i) => {
                        const dateToFormathour = hour.time
                        console.log(hour)
                        return (
                            <SwiperSlide
                            >
                                <Box key={i}>
                                    <Paper sx={{ backgroundImage: Colors.backgroundImage, width: '5rem' }}>
                                        <Stack justifyContent='center' alignItems='center'>
                                            <Typography variant='subtitle2' color='secondary'>  <Moment format="hhA" date={dateToFormathour} /> </Typography>
                                            <img src={hour.condition.icon} alt="weather icon" />
                                            <Typography color='secondary'> {fahrenheit ? `${hour.temp_f}°F` : `${hour.temp_c}°C`}</Typography>
                                            <Typography color='secondary'> {hour.chance_of_rain}% </Typography>
                                        </Stack>
                                    </Paper>
                                </Box>
                            </SwiperSlide>
                        )

                    })
                }
            </Swiper>


            <Grid sx={{ paddingTop: 2 }} container columns={{ xs: 4, sm: 8, md: 12 }} justifyContent="center"
                alignItems="center">
                {
                    todaysOverviewItems.map(({ icon, item, value }) =>
                        <Grid item key={item} >
                            <SpaceAroundPaper sx={{ backgroundColor: Colors.grey, padding: '2rem' }} elevation={0}>
                                <img className='img-icon' src={icon} alt='icon' />
                                <Stack>
                                    <Typography color='secondary.dark' variant='subtitle2'> {item} </Typography>
                                    <Typography variant='h6'> {value} </Typography>
                                </Stack>
                            </SpaceAroundPaper>
                        </Grid>
                    )
                }
            </Grid>
            <Stack>
                <Typography> </Typography>
            </Stack>
            <Grid sx={{ paddingTop: 2 }} container columns={{ xs: 1, sm: 2, md: 12 }} >
                {
                    forecast?.map((days, i) => (
                        <Grid item xs={1} sm={4} md={4} key={i}>
                            <Paper elevation={2} sx={{ padding: 1, height: '100%' }}>
                                <Stack justifyContent="center"
                                    alignItems="center"
                                >
                                    <Typography variant='subtitle2'>  <Moment format='dddd' >
                                        {days.date}
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
        </Box>
    )
}

export default TodaysOverview