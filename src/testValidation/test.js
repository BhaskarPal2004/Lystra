import { listingSchema } from "../validator/validateListing.js";

listingSchema.parse({name:"ssr",isFeatured:true,category:[" "],description:"it's very good quality",keyWords:["electronics,books"], address:"48 Sonali park Garia Kol-84"})