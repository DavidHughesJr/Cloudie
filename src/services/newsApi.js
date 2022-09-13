import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const baseUrl = `https://bing-news-search1.p.rapidapi.com/news`

const newsHeaders = {
    'X-RapidAPI-Key': '0ba0a04913msh9d52f6d879fba2dp10df41jsnb342505a8317',
    'X-RapidAPI-Host': 'bing-news-search1.p.rapidapi.com'
}

const requestNews = (url) => ({ url, headers: newsHeaders })

export const newsApi = createApi({
    reducerPath: 'newsApi',
    baseQuery: fetchBaseQuery({ baseUrl }),
    endpoints: (builder) => ({
        getWeatherNews: builder.query({
            query: (location) => requestNews(`/search?q=${location}%20Weather&freshness=Day&textFormat=Raw&safeSearch=Off`)
        }),
    })
})



export const { useGetWeatherNewsQuery } = newsApi