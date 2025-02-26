import { faker } from "@faker-js/faker";
import Ad from "../src/Models/adModel.js";
import Seller from "../src/Models/sellerModel.js";
import Address from "../src/models/addressModel.js";
const createAd = async n => {
    const seller=await Seller.find({});
    const address=await Address.find({});
    const listingTypes=['service', 'product', 'secondHandProduct', 'others'];
    const categories=['electronics', 'vehicles', 'real estate', 'home and furniture', 'jobs and services', 'fashion and beauty'];
    for (let i = 0; i < n; i++) {
        const product= faker.commerce;
        const ad= new Ad({
            name: product.product(),
            sellerId: seller[Math.floor(Math.random()*seller.length)]._id,
            isFeatured: (i%3)?false:true,
            listingType: listingTypes[Math.floor(Math.random()*listingTypes.length)],
            category: categories[Math.floor(Math.random()*categories.length)],
            description: product.productDescription(),
            details:{brand:'randomBrand', dimension:'5x7x2', weight: Math.floor(Math.random()*500)+'g'},
            price: product.price(),
            address: address[Math.floor(Math.random()*address.length)]._id,
            performance: {
                views: Math.floor(Math.random()*100),
                clicks: Math.floor(Math.random()*100)
            }
        })
        await ad.save();
    }
}
export default createAd;