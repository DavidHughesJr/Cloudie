import React, { useState } from 'react'
import { Box, Typography } from '@mui/material'
import SearchBar from '../components/Searchbar'
import { useGetForecastWeatherQuery } from '../services/weatherApi'

const Dashboard = () => {
    const [selectedLocation, setSelectedLocation] = useState('')
    
    const { data } = useGetForecastWeatherQuery(selectedLocation)

    return (
        <Box sx={{ padding: '1rem 0 3rem 1rem', display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid lightgrey'}}>
            <Box>
                <Typography variant='h5'> Date </Typography>
                <Typography variant='subtitle2'> Another Date </Typography>
            </Box>
            <SearchBar setSelectedLocation={setSelectedLocation}/> 
        </Box>
    )
}

export default Dashboard