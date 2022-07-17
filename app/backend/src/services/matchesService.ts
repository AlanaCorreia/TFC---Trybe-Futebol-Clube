import { StatusCodes } from 'http-status-codes';
import CostumError from '../utils/CostumError';
import TeamsRepository from '../repository/teamsRepository';
import { IMatch, IMatchAssociation, IMatchesModel, IMatchesService } from '../protocols';

export default class MatchesService implements IMatchesService {
  teamsModel: TeamsRepository;

  constructor(private model: IMatchesModel) {
    this.model = model;
    this.teamsModel = new TeamsRepository();
  }

  async list(): Promise<IMatchAssociation[]> {
    const matches = await this.model.list();

    return matches;
  }

  async create(
    homeTeam: number,
    awayTeam: number,
    homeTeamGoals: number,
    awayTeamGoals: number,
  ): Promise<IMatch> {
    const validHomeTeam = await this.teamsModel.findTeam(homeTeam);
    const validAwayTeam = await this.teamsModel.findTeam(awayTeam);

    if (!validHomeTeam || !validAwayTeam) {
      throw new CostumError(StatusCodes.NOT_FOUND, 'There is no team with such id!');
    }

    if (validHomeTeam.id === validAwayTeam.id) {
      throw new CostumError(
        StatusCodes.UNAUTHORIZED,
        'It is not possible to create a match with two equal teams',
      );
    }

    const match = await this.model.create(homeTeam, awayTeam, homeTeamGoals, awayTeamGoals);

    return match;
  }

  async update(id: number): Promise<void> {
    await this.model.update(id);
  }
}
