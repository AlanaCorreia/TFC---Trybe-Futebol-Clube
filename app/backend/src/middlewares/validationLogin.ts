import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';

const validateLogin = (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(StatusCodes.BAD_REQUEST)
      .json({ message: 'All fields must be filled' });
  }

  const validEmail = /\S+@\S+\.\S+/;
  const validation = validEmail.test(email);

  if (!validation) {
    return res.status(StatusCodes.BAD_REQUEST)
      .json({ message: '"email" must be a valid email' });
  }

  if (password.length < 6) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      message: '"password" length must be at least 6 characters long',
    });
  }

  next();
};

export default validateLogin;
