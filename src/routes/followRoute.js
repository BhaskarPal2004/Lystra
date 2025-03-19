import express from "express";
import { createFollow } from "../controllers/followController/createFollow.js";
import { verifyAccessToken } from "../middleware/isAuthenticated.js";
import isVerified from "../middleware/isVerified.js";
import { getAllFollower } from "../controllers/followController/getAllFollower.js";
import { getAllFollowing } from "../controllers/followController/getAllFollowing.js";
import { unFollow } from "../controllers/followController/unFollow.js";

const followRoute = express.Router()
followRoute.post('/follow/:followId',verifyAccessToken,isVerified,createFollow);
followRoute.get('/getAllFollower',verifyAccessToken,isVerified,getAllFollower);
followRoute.get('/getAllFollowing',verifyAccessToken,isVerified,getAllFollowing);
followRoute.put('/unfollow/:followId',verifyAccessToken,isVerified,unFollow);

export default followRoute