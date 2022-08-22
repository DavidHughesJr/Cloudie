import { configureStore } from "@reduxjs/toolkit";
import { weatherApi } from "../services/weatherApi";


export default configureStore({
    reducer: {
        [weatherApi.reducerPath] : weatherApi.reducer
    }
})


