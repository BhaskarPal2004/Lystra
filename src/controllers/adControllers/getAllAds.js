import { INTERNAL_SERVER_ERROR_CODE, SUCCESS_CODE } from "../../config/constant.js";
import Ad from "../../models/adModel.js";

export const getAllAds = async (req, res) => {

  const { searchKeyword, searchCategory } = req.query
  // console.log("searchkeyword",searchKeyword)
  // console.log("searchcategory",searchCategory)

  if (searchKeyword || searchCategory) {
    // console.log("user searched")
    if(searchCategory && searchKeyword===undefined){
      const filtered_notes = await Ad.find({category: new RegExp(searchCategory)})
      
      // const filtered_notes = await Ad.find({category: "vehicles"})
      return res.status(SUCCESS_CODE).send({
        success: true,
        ads: filtered_notes
      });
      
      // const all_notes = await notes.find({userID:req.id,title:{ "$regex": search_query, "$options": "i" } })
      // x = 'abc'
      // find({name: { $regex : x, $options: 'i' }} )

      // find({ name: new RegExp(x, 'i')}})
    }
    else if(searchKeyword && searchCategory===undefined){
      console.log(2)
    }
    else {
      console.log(3)
    }

  }
  else {
    try {
      const ads = await Ad.find().populate('sellerId', 'name email');
      // console.log("user didn't search")

      res.status(SUCCESS_CODE).send({
        success: true,
        ads: ads
      });
    }
    catch (error) {
      res.status(INTERNAL_SERVER_ERROR_CODE).send({
        message: error.message,
        success: false,
      });
    }
  }

}