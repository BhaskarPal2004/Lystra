import {
    INTERNAL_SERVER_ERROR_CODE,
    SUCCESS_CODE,
    NOT_FOUND_CODE,
  } from "../../config/constant.js";
  import Follow from "../../models/followModel.js";
  
  export const getAllFollowing = async (req, res) => {
    try {
      const userId = req.userId;
      const allFollowing=[];
  
      const follow = await Follow.find({follower:userId})
      if(!follow.length){
          return res.status(NOT_FOUND_CODE).send({
              success: false,
              message: "You do not follow anyone please follow to make connection",
            });
      }
  
      follow.forEach(follow=>{
          allFollowing.push(follow.following)
      })
  
      return res.status(SUCCESS_CODE).send({
        success: true,
        message: "Following getting successfully",
        data: allFollowing
      });
  
    } catch (error) {
      return res.status(INTERNAL_SERVER_ERROR_CODE).send({
        success: false,
        message: error.message,
      });
    }
  };
  