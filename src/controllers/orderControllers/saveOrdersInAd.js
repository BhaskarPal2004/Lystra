import Ad from "../../models/adModel.js"

export const saveOrdersInAd = async (adId, orderId) => {
    const ad = await Ad.find({ _id: adId })
    ad[0].orders.push(orderId)
    console.log("ad",ad)
    console.log("orders field value",ad[0].orders)
    await ad[0].save()
   
}