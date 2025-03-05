import Subscription from "../../models/subscriptionModel.js";
import { INTERNAL_SERVER_ERROR_CODE, SUCCESS_CODE ,BAD_REQUEST_CODE} from "../../config/constant.js";

export const createSubscription = async (req, res) => {
    try {
        const sellerId = req.userId;
        const paymentId  = req.params.paymentId;
        const findSellerInSubscriptionModel = await Subscription.findOne({sellerId: sellerId})

        if(findSellerInSubscriptionModel){
            return res.status(BAD_REQUEST_CODE).json({
                success: false,
                message: "you already subscribed",
            })
        }

        const newSubscription = await Subscription.create({
            sellerId: sellerId,
            paymentId: paymentId
        })
        newSubscription.save()

        return res.status(SUCCESS_CODE).json({
            success: true,
            message: "Subscription Done",
        })
    }catch(error){
        return res.status(INTERNAL_SERVER_ERROR_CODE).json({
            success: false,
            message: error.message,
        })
    }
    
}