import { Box, Stack } from '@mui/material'
import React, {useEffect} from 'react'
import SavedItems from '../components/SavedItems'
const Saves = () => {

  const getSavedItems = JSON.parse(localStorage.getItem('savedItems'))

  useEffect(() => {
    if (getSavedItems) {
      
    }
  }, [])

  return (
    <Box p={4}>
      <Stack>
        <SavedItems /> 
        <div> Other Cities </div>
      </Stack>
    </Box>
  )
}

export default Saves