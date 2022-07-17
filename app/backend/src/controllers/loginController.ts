import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import { ILoginService } from '../protocols';

export default class loginController {
  constructor(private service: ILoginService) {
    this.service = service;
  }

  login = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, password } = req.body;
      const token = await this.service.login(email, password);

      return res.status(StatusCodes.OK).json({ token });
    } catch (error) {
      next(error);
    }
  };

  validateLogin = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { data: { role } } = req.body;

      return res.status(StatusCodes.OK).json({ role });
    } catch (error) {
      next(error);
    }
  };
}
