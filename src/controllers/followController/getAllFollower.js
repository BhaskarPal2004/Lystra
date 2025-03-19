import {
  INTERNAL_SERVER_ERROR_CODE,
  SUCCESS_CODE,
  NOT_FOUND_CODE,
} from "../../config/constant.js";
import Follow from "../../models/followModel.js";

export const getAllFollower = async (req, res) => {
  try {
    const userId = req.userId;
    const allFollower=[];

    const follow = await Follow.find({following:userId})
    if(!follow.length){
        return res.status(NOT_FOUND_CODE).send({
            success: false,
            message: "You don't have any follower",
          });
    }

    follow.forEach(follow=>{
        allFollower.push(follow.follower)
    })

    return res.status(SUCCESS_CODE).send({
      success: true,
      message: "Follower getting successfully",
      data: allFollower
    });

  } catch (error) {
    return res.status(INTERNAL_SERVER_ERROR_CODE).send({
      success: false,
      message: error.message,
    });
  }
};
