import {
    INTERNAL_SERVER_ERROR_CODE,
    SUCCESS_CODE,
    NOT_FOUND_CODE,
  } from "../../config/constant.js";
  import Review from "../../models/reviewModel.js";
  import Reply from "../../models/replyModel.js";

  export const getAllReply = async(req,res)=>{
    try{
        const reviewId = req.params.reviewId;
        const findReview = await Review.findById(reviewId);
        const allReply = [];

        if(!findReview){
            return res.status(NOT_FOUND_CODE).send({
                success: false,
                message: "review not found",
            });
        }

        const findAllReply = await Reply.find({reviewId:reviewId})

        if(!findAllReply.length){
            return res.status(NOT_FOUND_CODE).send({
                success: false,
                message: "reply not found",
            });
        }

        findAllReply.forEach(reply=>{
            allReply.push(reply);
        })

        return res.status(SUCCESS_CODE).send({
            success: true,
            message: "All reply get sucessfully",
            data:allReply
        });

    }catch(error){
        return res.status(INTERNAL_SERVER_ERROR_CODE).send({
            success: false,
            message: error.message,
          });
    }
  }