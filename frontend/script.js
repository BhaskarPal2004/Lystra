const successCallback = async (position) => {
    console.log(position)
    console.log(`${position.coords.latitude} & ${position.coords.longitude}`)
    const res = await fetch(`http://localhost:3000/api/user/getCoordinates/${position.coords.latitude}/${position.coords.longitude}`)
    const jsonData = await res.json()
    console.log(jsonData.coordinates)
}

const failureCallback = (error) => {
    console.log(error.message)
}

//eslint-disable-next-line
if (window.navigator) {
    //eslint-disable-next-line
    navigator.geolocation.getCurrentPosition(successCallback, failureCallback)
}