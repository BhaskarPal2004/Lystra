import Address from "../models/addressModel.js"

export const findLocalAddressess = async(longitude,latitude,maxDistance) => {
let filteredAdresses = await Address.aggregate([
      {
        $geoNear: {
          near: { type: 'Point', coordinates: [latitude,longitude] },
          key:"location",
          distanceField: 'distance',
          maxDistance: maxDistance,
          spherical: true,
        }
      }])

      filteredAdresses = filteredAdresses.map(element=>element._id.toString())

return filteredAdresses;
}