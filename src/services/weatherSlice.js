import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    location: '',
    fahrenheit: true
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
    },
})

export const { setLocation, setFahrenheit } = weatherSlice.actions
export default weatherSlice.reducer 