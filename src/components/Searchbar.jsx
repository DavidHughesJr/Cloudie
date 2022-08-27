
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { setLocation } from '../services/weatherSlice'
import { Box, Autocomplete, TextField, InputAdornment, ToggleButton } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search';
import StarIcon from '@mui/icons-material/Star';
import { useGetSearchWeatherQuery } from '../services/weatherApi'


const SearchBar = () => {

  const dispatch = useDispatch()
  const [selected, setSelected] = useState(false);
  const [search, setSearch] = useState('')
  const [autoCompleteList, setAutoCompleteList] = useState([])
  const { data } = useGetSearchWeatherQuery(search)


  useEffect(() => {
    if (data) {
      setAutoCompleteList(data)

    }
  }, [data])

  const handleKeyDown = (event) => {

    setSearch(event.target.value)
    if (event.key === 'Enter') {
      document.getElementsByClassName('text').click()
      event.target.value = ''
    }
  }

  return (
    <Box sx={{ display: 'flex', alignItems: 'flex-end', gap: '1rem' }}>
      <Autocomplete
        sx={{ width: '15rem', padding: 0}}
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
              startAdornment: <InputAdornment position="start"> <SearchIcon /> </InputAdornment>,

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
        }}
      >
        <StarIcon />
      </ToggleButton>
    </Box>
  )
}

export default SearchBar