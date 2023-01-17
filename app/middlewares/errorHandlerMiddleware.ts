import { CustomError } from '@app/errors/index';
import { Request, Response, NextFunction } from 'express';

const errorHandlerMiddleware = (error: CustomError, _req: Request, res: Response, _next: NextFunction) => {
  return res.status(error.statusCode).json({
    code: error.statusCode,
    message: error.message,
  });
}

export default errorHandlerMiddleware