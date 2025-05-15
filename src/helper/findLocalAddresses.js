import Address from "../models/addressModel.js";

export const findLocalAddresses = async (longitude, latitude, maxDistance) => {

  const geoNearStage = {
    $geoNear: {
      near: { type: "Point", coordinates: [parseFloat(latitude), parseFloat(longitude)] },
      distanceField: "distance",
      spherical: true,
      maxDistance: maxDistance,
    },
  };

  let filteredAddresses = await Address.aggregate([geoNearStage]);

  filteredAddresses = filteredAddresses.map((element) => element._id.toString());

  return filteredAddresses;
};