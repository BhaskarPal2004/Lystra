import Address from "../models/addressModel.js"

export const findLocalAddressess = async (longitude, latitude, maxDistance) => {
  // console.log("latitude in func", latitude)
  // console.log("long in func", longitude)
  // console.log("maxDis in func", maxDistance)
  let filteredAdresses = await Address.aggregate([
    {
      $geoNear: {
        near: { type: 'Point', coordinates: [latitude, longitude] },
        distanceField: 'distance',
        maxDistance: maxDistance,
        spherical: true,
      }
    }])
  // console.log("address", filteredAdresses)
  filteredAdresses = filteredAdresses.map(element => element._id.toString())

  return filteredAdresses;
}