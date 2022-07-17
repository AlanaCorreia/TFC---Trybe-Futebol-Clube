import * as dotenv from 'dotenv';
import * as jwt from 'jsonwebtoken';
import { IUser } from '../protocols';

dotenv.config();

const secret = process.env.JWT_SECRET || '123456';

const jwtConfig:jwt.SignOptions = {
  expiresIn: '4h',
  algorithm: 'HS256',
};

const generateJWT = (payload: Omit<IUser, 'password'>) => {
  const token = jwt.sign({ data: payload }, secret, jwtConfig);

  return token;
};

export default generateJWT;
