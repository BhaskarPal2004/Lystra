// import { listingSchema } from "../validator/validateListing.js";
// import { secondHandModelSchema } from "../validator/validateSecondHand.js";
// import { orderSchema } from "../validator/validateOrder.js";
// import { paymentSchema } from "../validator/validatePayment.js";
// import { validateData } from "../Middleware/validateData.js";
// listingSchema.parse({name:"ssr",isFeatured:true,category:["electrical"],description:"it's very good quality",keyWords:["electronics,books"], address:"48 Sonali park Garia Kol-84"})
// secondHandModelSchema.parse({name:"ssr",isFeatured:true,category:["electrical"],description:"it's very good quality",keyWords:["electronics,books"], address:"48 Sonali park Garia Kol-84", price: 23, boughtOn:"2020-01-01", condition:null, listedOn:"2020-01-01"})
// orderSchema.parse({status:"created"})
// paymentSchema.parse({amount:2,paymentType:"cod",status:"paid"})

// const response = validateData(paymentSchema)
// console.log(response)

import { testSchema } from "../validator/validateAd.js";

testSchema.parse({performance:{}})