import { Box, Stack } from '@mui/material'
import React, {useEffect} from 'react'

const Saves = () => {

  const getSavedItems = JSON.parse(localStorage.getItem('savedItems'))

  useEffect(() => {
    if (getSavedItems) {
      
    }
  }, [])

  return (
    <Box p={4}>
      <Stack>
        <div> Saves </div>
        <div> Other Cities </div>
      </Stack>
    </Box>
  )
}

export default Saves