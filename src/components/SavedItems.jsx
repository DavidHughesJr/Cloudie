import React, {useMemo} from 'react'
import { Button, Paper, Typography, Stack } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { setLocation, setSaves } from '../services/weatherSlice'
import { useEffect } from 'react'

const SavedItems = () => {
  const savedItems = JSON.parse(localStorage.getItem('savedItems'))
  const saves = useSelector(state => state.weatherState.saves)
  const dispatch = useDispatch()


  useEffect(() => {
    dispatch(setSaves(savedItems))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])


  const addSaves = (item) => {
    let itemList = [...saves]
    let addArray = true
    for (let i = 0; i < saves.length; i++) {
      if (saves[i].name === item.name) {
        itemList.splice(i, 1);
        addArray = false
      }
    }
    if (addArray) {
      itemList.push(item)
    }
    dispatch(setSaves([...itemList]))
  }

  const savesMemo = useMemo(() => {
    return saves;
  }, [saves]);

  useEffect(() => {
    // save to local storage
    localStorage.setItem('savedItems', JSON.stringify(savesMemo))

  }, [savedItems, savesMemo])


  return (
    <Stack spacing={2}>
      {
        saves.length === 0 ? 'No Location Are Saved!' :
          saves?.map((local) => (
            <Paper sx={{ padding: 2 }} elevation={1} key={local.name} onClick={() => dispatch(setLocation(local.name))}>
              <Typography variant='h6'> {local.name} {local.region} </Typography>
              <Typography variant='subtitle2'> {local.country} </Typography>
              <Typography variant='body1'> Timezone: {local.tz_id} </Typography>
              <Button variant='contained' onClick={() => addSaves(local)}> Delete </Button>
            </Paper>
          ))
      }
    </Stack>
  )
}

export default SavedItems