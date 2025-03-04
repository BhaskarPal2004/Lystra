import { ZodError } from 'zod';
import { BAD_REQUEST_CODE, INTERNAL_SERVER_ERROR_CODE } from '../config/constant.js';


export const validateData = (schema) => {
  return (req, res, next) => {
    try {
      schema.parse(req.body);
      next();

    } catch (error) {
      if (error instanceof ZodError) {
        const errorMessages = error.errors.map((issue) => ({
          path: issue.path.toString(),
          message: issue.message,
        }));

        return res.status(BAD_REQUEST_CODE).json({
          success: false,
          message: errorMessages
        });

      } else
        return res.status(INTERNAL_SERVER_ERROR_CODE).json({
          success: false,
          error: error.message
        });
    }
  };
}