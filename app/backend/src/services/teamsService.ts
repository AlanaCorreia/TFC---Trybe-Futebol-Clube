import { StatusCodes } from 'http-status-codes';
import CostumError from '../utils/CostumError';
import { ITeam, ITeamsModel, ITeamsService } from '../protocols';

export default class teamsService implements ITeamsService {
  constructor(private model: ITeamsModel) {
    this.model = model;
  }

  async list(): Promise<ITeam[]> {
    const teams = await this.model.list();

    return teams;
  }

  async findTeam(id: number): Promise<ITeam | void> {
    const team = await this.model.findTeam(id);

    if (!team) throw new CostumError(StatusCodes.BAD_REQUEST, 'Team not found');

    return team as ITeam;
  }
}
