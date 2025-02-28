import Ad from "../../models/adModel";
import Buyer from "../../models/buyerModel";
import Seller from "../../models/sellerModel";

export const createAddReport = async (req, res) => {
    try {
        const { userId, role } = req.body;
        const {message , isFake ,isFraudulent} = req.body;
        const {Id} = req.params;
        if(role === "seller"){
            const findUser = await Seller.findOne({ _id: userId });
            const findAd = await Ad.findOne({_id:Id});
            if(findUser && findAd){
                await Ad.findByIdAndUpdate(Id, {

                });
            }
        }
    }catch(err){

    }
};
