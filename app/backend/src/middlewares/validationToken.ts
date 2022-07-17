import * as dotenv from 'dotenv';
import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import * as jwt from 'jsonwebtoken';
import CostumError from '../utils/CostumError';

dotenv.config();

const secret = process.env.JWT_SECRET || '123456';

const validationToken = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization;

    if (!token) throw new CostumError(StatusCodes.UNAUTHORIZED, 'Token not found');

    const decoded = jwt.verify(token, secret) as jwt.JwtPayload;

    req.body.data = decoded.data;

    next();
  } catch (error) {
    return res.status(401).json({ message: 'Expired or invalid token' });
  }
};

export default validationToken;
