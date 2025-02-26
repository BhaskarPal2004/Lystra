import express from 'express';
import { validateData } from '../middleware/validateData.js';
import { serviceSchemaValidation } from "../validator/validateService.js";

const routeNote = express.Router();

routeNote.post('/test',validateData(serviceSchemaValidation))

export default routeNote;