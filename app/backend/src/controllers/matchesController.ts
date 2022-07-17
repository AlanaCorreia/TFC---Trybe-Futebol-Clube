import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import { IMatches } from '../protocols';

export default class MatchesController {
  constructor(private service: IMatches) {
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

  finishUpdate = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const idMatch = Number(id);

      await this.service.finishUpdate(idMatch);

      return res.status(StatusCodes.OK).json({ message: 'Finished' });
    } catch (error) {
      next(error);
    }
  };

  matchUpdate = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const { homeTeamGoals, awayTeamGoals } = req.body;
      const idMatch = Number(id);

      await this.service.matchUpdate(idMatch, homeTeamGoals, awayTeamGoals);

      return res.status(StatusCodes.OK).json({ message: 'Updated match' });
    } catch (error) {
      next(error);
    }
  };
}
