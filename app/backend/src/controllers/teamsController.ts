import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import { ITeamsService } from '../protocols';

export default class teamsController {
  constructor(private service: ITeamsService) {
    this.service = service;
  }

  list = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const teams = await this.service.list();

      return res.status(StatusCodes.OK).json(teams);
    } catch (error) {
      next(error);
    }
  };
}
