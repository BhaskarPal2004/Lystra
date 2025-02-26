import express from "express"
import { validateData } from "../Middleware/validateData.js"
import { listingSchema } from "../validator/validateListing.js";

const testRoute = express.Router()

testRoute.post("/test",validateData(listingSchema))

export default testRoute;
