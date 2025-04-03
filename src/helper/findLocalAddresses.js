import Address from "../models/addressModel.js";

export const findLocalAddresses = async (longitude, latitude, maxDistance, role) => {
  const geoNearStage = {
    $geoNear: {
      near: { type: "Point", coordinates: [latitude, longitude] },
      distanceField: "distance",
      spherical: true,
    },
  };

  if (role !== "seller") {
    geoNearStage.$geoNear.maxDistance = maxDistance; 
  }
  let filteredAddresses = await Address.aggregate([geoNearStage]);

  filteredAddresses = filteredAddresses.map((element) => element._id.toString());

  return filteredAddresses;
};
