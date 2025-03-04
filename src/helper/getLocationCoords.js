import opencage from 'opencage-api-client'

export const getLocationCoords = async (city, state) => {
    const response = await opencage.geocode({ q: city, state })

    if (response.status.code === 200 && response.results.length > 0) {
        console.log(response.results[0].formatted)
        console.log(response.results[0].geometry)
        return response.results[0].geometry
    } else {
        console.log('Status', response.status.message);
        console.log('total_results', response.total_results);
        return null
    }
}