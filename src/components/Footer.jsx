import React from 'react'
import { Link } from 'react-router-dom'
import { Box, Stack, Typography } from '@mui/material'
import { Colors } from '../helper/colors'

const Footer = () => {
    return (
        <Box sx={{ width: '100%', height: '75px', backgroundColor: Colors.tertiaryBackground, }}>
            <Stack direction='row' spacing={2} justifyContent="center" alignItems="center" sx={{padding: 3}}>
                <Link to='/' style={{ textDecoration: 'none' }} > <Typography variant='subtitle2' color='secondary'> Dashboard </Typography> </Link>
                <Link to='/map' style={{ textDecoration: 'none' }}> <Typography variant='subtitle2' color='secondary'> Map </Typography> </Link>
                <Link to='/saves' style={{ textDecoration: 'none'}}> <Typography variant='subtitle2' color='secondary'> Saves </Typography> </Link>
                <Typography color='secondary' variant='caption'> Copyright @DavidHughesJr Youtube Video  </Typography>
            </Stack>
        </Box>
    )
}

export default Footer