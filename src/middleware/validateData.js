import { ZodError } from 'zod';
import { BAD_REQUEST_CODE, INTERNAL_SERVER_ERROR_CODE } from '../config/constant.js';


export const validateData = (schema) => {
  let finalError = ""
  return (req, res, next) => {
    try {
      schema.parse(req.body);
      next();

    } catch (error) {
      if (error instanceof ZodError) {
        const errorMessages = error.errors.map((issue) => ({
          message: `${issue.path.join('.')} : ${issue.message}`,
        }));
        errorMessages.forEach((obj) => {
          finalError = finalError.concat(obj.message, ", ")
        })
        finalError = finalError.slice(0, -2)
        return res.status(BAD_REQUEST_CODE).json({
          success: false,
          message: finalError
        });

      } else
        return res.status(INTERNAL_SERVER_ERROR_CODE).json({
          success: false,
          error: error.message
        });
    }
  };
}





