import {createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const baseUrl = `https://weatherapi-com.p.rapidapi.com/`

const weatherHeaders = {
        'X-RapidAPI-Key': '419bd5942fmshff5dd7dcf34cd06p1dd32djsne642e068e809',
        'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
    }

const fetchRequest = (url) => ({url, headers: weatherHeaders})

export const weatherApi = createApi({
    reducerPath: 'weatherApi',
    baseQuery: fetchBaseQuery({baseUrl}),
    endpoints: (builder) => ({
        getForecastWeather: builder.query({
            query: (location) => fetchRequest(`/forecast.json?q=${location}&days=3`)
        }),
        getSearchWeather: builder.query({
            query: (search) => fetchRequest(`search.json?q=${search}`)
        }),
    })
})

export const { useGetForecastWeatherQuery, useGetSearchWeatherQuery } = weatherApi