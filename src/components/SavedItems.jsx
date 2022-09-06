import React from 'react'
import { Box, Paper, Typography, Stack} from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { setLocation } from '../services/weatherSlice'


const SavedItems = () => {
  const getSavedItems = JSON.parse(localStorage.getItem('savedItems'))
  const dispatch = useDispatch()


  
  return (
    <Stack spacing={2}>
      {
        !getSavedItems ? 'No Location Are Saved!' :
          getSavedItems?.map((local) => (
            <Paper sx={{ padding: 2 }} elevation={1} key={local.name} onClick={() => dispatch(setLocation(local.name))}>
              <Typography variant='h6'> {local.name} {local.region} </Typography>
              <Typography variant='subtitle2'> {local.country} </Typography>
              <Typography variant='caption'> {local.tz_id} </Typography>
            </Paper>
          ))
      }
    </Stack>
  )
}

export default SavedItems