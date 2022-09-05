import React from 'react'
import { useGetForecastWeatherQuery } from '../services/weatherApi'
import { setSaves, setItemSaved } from "../services/weatherSlice";
import { useSelector} from 'react-redux'

const SavedItems = () => {

  const saves = useSelector(state => state.weatherState.saves)
  console.log(saves)
  return ( 
    <div>SavedItems</div>
  ) 
}
 
export default SavedItems