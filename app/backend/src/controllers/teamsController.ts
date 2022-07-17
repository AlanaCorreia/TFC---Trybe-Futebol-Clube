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

  findTeam = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const idTeam = Number(id);

      const team = await this.service.findTeam(idTeam);

      return res.status(StatusCodes.OK).json(team);
    } catch (error) {
      next(error);
    }
  };
}
