import express from 'express';
import { validateData } from '../middleware/validateData.js';
// import { serviceSchemaValidation } from "../validator/validateService.js";
import { buyerSchemaValidation } from '../validator/validateBuyer.js';

const routeNote = express.Router();

routeNote.post('/test',validateData(buyerSchemaValidation),(req,res)=>{
    console.log(req);
    res.send("okay")
    
})

export default routeNote;