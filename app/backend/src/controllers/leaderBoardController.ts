import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import { ILeaderBoardService } from '../protocols';

export default class LeaderBoardController {
  constructor(private service: ILeaderBoardService) {
    this.service = service;
  }

  leaderBoardHome = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const leaderboard = await this.service.leaderBoardHome();

      return res.status(StatusCodes.OK).json(leaderboard);
    } catch (error) {
      next(error);
    }
  };
}
