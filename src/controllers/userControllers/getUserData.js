import Buyer from "../../models/buyerModel";
import Seller from "../../models/sellerModel";
// import isVerified from "../../middleware/isVerified";
// import { verifyAccessToken } from "../../middleware/isAuthenticated";

export const findUserData = async (req, res) => {
    try{
        const { userId,role } = req.body;
        if(role === user){
            findUser =await Buyer.findOne({_id :userId});
            if(findUser){
                res.json({
                    status: 200,
                    message: "find successfully",
                    findUser
                });
            }
            else{
                res.json({
                    status: 404,
                    message: "user not found",
                });
            }
        }
        else {
            findUser =await Seller.findOne({_id :userId});
            if(findUser){
                res.json({
                    status: 200,
                    message: "find successfully",
                    findUser
                });
            }
            else{
                res.json({
                    status: 404,
                    message: "user not found",
                });
            }
        }
    }catch(err){
        res.json({
            status: 500,
            message: "can not get data",
        });
    }
};