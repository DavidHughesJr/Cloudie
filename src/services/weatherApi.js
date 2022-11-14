import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

console.log(process.env.REACT_APP_WEATHER_API_KEY)

const baseUrl = `https://weatherapi-com.p.rapidapi.com`

const weatherHeaders = {
    'X-RapidAPI-Key': '419bd5942fmshff5dd7dcf34cd06p1dd32djsne642e068e809',
    'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
}

const requestWeather = (url) => ({ url, headers: weatherHeaders })

export const weatherApi = createApi({
    reducerPath: 'weatherApi',
    baseQuery: fetchBaseQuery({ baseUrl }),
    endpoints: (builder) => ({
        getForecastWeather: builder.query({
            query: (location) => requestWeather(`/forecast.json?q=${location}&days=3`)
        }),
        getSearchWeather: builder.query({
            query: (search) => requestWeather(`/search.json?q=${search}`)
        }),

    })
})



export const { useGetForecastWeatherQuery, useGetSearchWeatherQuery } = weatherApi