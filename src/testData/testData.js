import { productSchemaValidation } from "../validator/validateProduct.js";
import { serviceSchemaValidation } from "../validator/validateService.js";
import { addressSchemaValidation } from "../validator/validateAddress.js";
addressSchemaValidation.parse({
    line1:"vvvvvvvv",
    pinCode:222777
});