import express from "express"
import { listingSchema } from "../validator/validateListing.js";
import { validateData } from "../middleware/validateData.js"

const testRoute = express.Router()

testRoute.post("/test",validateData(listingSchema))

export default testRoute;
 