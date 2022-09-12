import { useEffect, useState } from 'react'

const useGeoLocation = () => {
    const [geoLocation, setGeoLocation] = useState({
        loaded: false,
        coordinates: { lat: '', lng: '' }
    })

   const successMsg = (location) => {
        setGeoLocation({
            loaded: true,
            coordinates: {
                lat: location.coords.latitude,
                lng: location.coords.longitude
            }
        })
    }

   const errorMsg = (error) => {
        setGeoLocation({
            loaded: true,
            error,
        })
    }

    
    
    useEffect(() => {
        if (!('geolocation' in navigator)) {
            errorMsg({
                code: 0,
                message: "Geolocation not enabled or supported"
            })
        }
        navigator.geolocation.getCurrentPosition(successMsg, errorMsg)
    }, [])
    return geoLocation
}

export default useGeoLocation