import express from 'express'
import { verifyAccessToken } from '../middleware/isAuthenticated.js'
import isVerified from '../middleware/isVerified.js'
import saveAd from '../controllers/buyerControllers/saveAd.js'
import removeSavedAd from '../controllers/buyerControllers/removeSavedAd.js'
import addInterests from '../controllers/buyerControllers/addInterests.js'

const buyerRoute = express.Router()

//all api's of buyer
buyerRoute.post('/saveAd/:adId', verifyAccessToken, isVerified, saveAd);
buyerRoute.delete('/removeSavedAd/:adId', verifyAccessToken, isVerified, removeSavedAd);
buyerRoute.post('/interest',verifyAccessToken,isVerified,addInterests);

// import {
//     INTERNAL_SERVER_ERROR_CODE,
//     NOT_FOUND_CODE,
//     SUCCESS_CODE,
//   } from "../../config/constant.js";
//   import Buyer from "../../models/buyerModel.js";
  
//   const addInterests = async (req, res) => {
  
//     try {
//       const userId = req.userId;
//       let { interests, others } = req.body;
//       const buyer = await Buyer.findById(userId);
  
//       // if(!interests){
//       //     interests=[]
//       // }
  
//       if (others?.trim().length > 0) {
//         const items = others.split(",");
//         for (let i = 0; i < items.length; i++) {
//           interests.push(items[i]);
//         }
//       }
  
//       if (buyer) {
//         if (!interests && !others) {
//           res.status(NOT_FOUND_CODE).send({
//             success: false,
//             message: "interest not found",
//           });
//         } 
//         else {
//           await Buyer.findOneAndUpdate(
//             { _id: userId },
//             {
//               interests: interests,
//             }
//           );
//           res.status(SUCCESS_CODE).send({
//             success: true,
//             message: "add interest successfully",
//           });
//         }
//       } else {
//         res.status(NOT_FOUND_CODE).send({
//           success: false,
//           message: "user not found",
//         });
//       }
//     } catch (error) {
//       res.status(INTERNAL_SERVER_ERROR_CODE).send({
//         success: false,
//         message: error.message,
//       });
//     }
//   };
//   export default addInterests;
  

export default buyerRoute