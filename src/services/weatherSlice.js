import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    location: '',
    fahrenheit: true,
    saves: [],
    itemSaved: false
}

const weatherSlice = createSlice({
    name: 'weather',
    initialState,
    reducers: {
        setLocation: (state, action) => {
            state.location = action.payload
        },
        setFahrenheit: (state, action) => {
            state.fahrenheit = action.payload
        },
        setSaves: (state, action) => {
            state.saves = action.payload
        },
        setItemSaved: (state, action) => {
            state.itemSaved = action.payload
        }
    },
})

export const { setLocation, setFahrenheit, setSaves, setItemSaved } = weatherSlice.actions
export default weatherSlice.reducer 