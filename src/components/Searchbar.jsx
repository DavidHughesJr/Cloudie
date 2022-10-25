import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setLocation } from '../services/weatherSlice'
import { Box, Autocomplete, TextField, InputAdornment, ToggleButton } from '@mui/material'
import { Search, Star } from '@mui/icons-material'
import { useGetSearchWeatherQuery } from '../services/weatherApi'
import { setSaves, setItemSaved } from "../services/weatherSlice";


const SearchBar = ({ location }) => {

  const [selected, setSelected] = useState(false);
  const [search, setSearch] = useState('')
  const [autoCompleteList, setAutoCompleteList] = useState([])


  const { data } = useGetSearchWeatherQuery(search)
  const saves = useSelector(state => state.weatherState.saves)
  const dispatch = useDispatch()

  const getSavedItems = JSON.parse(localStorage.getItem('savedItems'))

  useEffect(() => {
    if (data) {
      setAutoCompleteList(data)
    }
    if (getSavedItems) {
      dispatch(setSaves(getSavedItems))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data])

  const handleKeyDown = (event) => {
    setSearch(event.target.value)
    if (event.key === 'Enter') {
      document.getElementsByClassName('text').click()
      event.target.value = ''
    }
  }

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

  useEffect(() => {
    // save to local storage
    localStorage.setItem('savedItems', JSON.stringify(saves))

    const savedItems = JSON.parse(localStorage.getItem('savedItems'))
    if (savedItems) {
      for (let i = 0; i < savedItems.length; i++) {
        if (savedItems[i].name === location.name) {
          setSelected(true)
          dispatch(setItemSaved(true))
          // break to stop statement from throwing false
          break
        } else if (savedItems[i].id !== location.name) {
          setSelected(false)
          dispatch(setItemSaved(false))
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [saves])


  return (
    <Box sx={{ display: 'flex', alignItems: 'flex-end', gap: '1rem' }}>
      <Autocomplete
        sx={{ width: '15rem', padding: 0 }}
        freeSolo
        disableClearable
        filterOptions={(x) => x}
        id="search"
        onChange={(event, value) => dispatch(setLocation(value))}
        options={autoCompleteList?.map((data) => data.name)}
        renderInput={(params) => (
          <TextField
            className='text'
            id='searchField'
            placeholder='Search Locations'
            onKeyDown={handleKeyDown}
            {...params}
            InputProps={{
              ...params.InputProps,
              type: 'search',
              startAdornment: <InputAdornment position="start"> <Search /> </InputAdornment>,

            }}
          />
        )}
      />
      <ToggleButton
        sx={{ width: '4rem' }}
        value="check"
        color='primary'
        selected={selected}
        onChange={() => {
          setSelected(!selected);
          addSaves(location)

        }}
      >
        <Star />
      </ToggleButton>
    </Box>
  )
}

export default SearchBar