import Ad from "../../models/adModel.js"

export const saveOrdersInAd = async (adId, orderId) => {
    const ad = await Ad.find({ _id: adId })
    ad[0].orders.push(orderId)
    await ad[0].save()
   
}