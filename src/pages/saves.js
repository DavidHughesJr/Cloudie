import { Box, Stack } from '@mui/material'
import React  from 'react'
import SavedItems from '../components/SavedItems'

const Saves = () => {

  
  return (
    <Box p={4}>
      <Stack spacing={2}>
        <SavedItems />           
      </Stack>
    </Box>
  )
}

export default Saves