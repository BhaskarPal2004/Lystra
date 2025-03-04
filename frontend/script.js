const successCallback = (position) => {
    console.log(position)
    console.log(`${position.coords.latitude} & ${position.coords.longitude}`)
}
const failureCallback = (error) => {
    console.log(error.message)
}

//eslint-disable-next-line
if (window.navigator) {
    //eslint-disable-next-line
    navigator.geolocation.getCurrentPosition(successCallback, failureCallback)
}