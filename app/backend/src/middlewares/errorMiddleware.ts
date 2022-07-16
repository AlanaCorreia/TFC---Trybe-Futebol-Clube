import { ErrorRequestHandler } from 'express';
import { StatusCodes } from 'http-status-codes';

const errorMiddleware: ErrorRequestHandler = (err, _req, res, _next) => {
  console.log(err);
  if (err.status) return res.status(err.status).json({ message: err.message });
  return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: err.message });
};

export default errorMiddleware;
