import { CREATED_CODE, INTERNAL_SERVER_ERROR_CODE,NOT_FOUND_CODE } from "../../config/constant.js"
import { invoiceCreateFunction } from "../../helper/invoiceSetup/invoice.js"

export const createInvoice = (req,res)=>{
    try{
        const {orderId} = req.params.orderId;
        if(!orderId){
            return res.status(NOT_FOUND_CODE ).json({
            success:false,
            message:"OrderId is required"
            })
        }
        invoiceCreateFunction(orderId);
        return res.status(CREATED_CODE).json({
            success:true,
            message:"Invoice created successfully"
        })

    }catch(error){
        return res.status(INTERNAL_SERVER_ERROR_CODE).json({
            success: false,
            message: error.message
        })
    }
}