import React from 'react'
import { Box, Typography, Grid, Stack } from '@mui/material'
import windImg from '../img/wind.png'
import rainImg from '../img/rain.png'
import pressureImg from '../img/pressure.png'
import sunImg from '../img/sun.png'
import arrowUp from '../img/arrow-up.png'
import arrowDown from '../img/arrow-down.png'
import { SpaceAroundPaper } from '../theme/theme'
import { Colors } from '../config/colors'

const TodaysOverview = ({ current, forecast }) => {

    const highs = {
        wind: 15,
        rain: 65,
        pressure: 30,
        uv: 5
    }

    const todaysOverviewItems = [
        { icon: windImg, item: 'Wind Speed', value: `${current?.wind_mph}mph`, arrow: current?.wind_mph > highs.wind ? `${arrowUp}` : `${arrowDown}`, change: current?.wind_mph > highs.wind ? 'High' : 'Low' },
        { icon: rainImg, item: 'Rain Chance', value: `${forecast?.[0]?.day?.daily_chance_of_rain}%`, arrow: forecast?.[0]?.day?.daily_chance_of_rain > highs.rain ? `${arrowUp}` : `${arrowDown}`, change: forecast?.[0]?.day?.daily_chance_of_rain > highs.rain ? 'High' : 'Low' },
        { icon: pressureImg, item: 'Pressure', value: `${current?.pressure_in}in`, arrow: current?.pressure_in > highs.pressure ? `${arrowUp}` : `${arrowDown}`, change: current?.pressure_in > highs.pressure ? 'High' : 'Low' },
        { icon: sunImg, item: 'Uv Index', value: current?.uv, arrow: current?.uv > highs.uv ? `${arrowUp}` : `${arrowDown}`, change: current?.uv > highs.uv ? 'High' : 'Low' }
    ]

    return (
        <Box sx={{ marginTop: '2rem' }}>
            <Typography sx={{ marginBottom: '1rem', }} color='primary' variant='h6'> Todays Overview </Typography>
            <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                {
                    todaysOverviewItems.map(({ icon, item, value, change, arrow }) =>
                        <Grid item xs={6}>
                            <SpaceAroundPaper sx={{ backgroundColor: '#FBFBFB', padding: '2rem' }} elevation={0}>
                                <img className='img-icon' src={icon} alt='icon' />
                                <Stack>
                                    <Typography color='secondary.dark' variant='subtitle2'> {item} </Typography>
                                    <Typography variant='h5'> {value} </Typography>
                                </Stack>
                                <Stack direction='row'>
                                    <img className='img-arrow' src={arrow} />
                                    <Typography color='secondary.dark' variant='subtitle2'> {change} </Typography>
                                </Stack>
                            </SpaceAroundPaper>
                        </Grid>
                    )
                }
            </Grid>
        </Box>
    )
}

export default TodaysOverview