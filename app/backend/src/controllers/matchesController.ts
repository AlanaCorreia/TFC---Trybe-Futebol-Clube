import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import { IMatchesService } from '../protocols';

export default class MatchesController {
  constructor(private service: IMatchesService) {
    this.service = service;
  }

  list = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const matches = await this.service.list();

      return res.status(StatusCodes.OK).json(matches);
    } catch (error) {
      next(error);
    }
  };

  create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { homeTeam, awayTeam, homeTeamGoals, awayTeamGoals } = req.body;

      const match = await this.service.create(homeTeam, awayTeam, homeTeamGoals, awayTeamGoals);

      return res.status(StatusCodes.CREATED).json(match);
    } catch (error) {
      next(error);
    }
  };
}
