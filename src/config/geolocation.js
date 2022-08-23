
successLocation = (position) => {
console.log(position)
}
errorLocation = () => {
    return 'No Location'
}

const options = {
    enableHighAccuracy: true
}

navigator.geolocation.getCurrentPosition(successLocation, errorLocation, {
    options
})