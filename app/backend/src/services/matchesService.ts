import { IMatch, IMatchAssociation, IMatchesModel, IMatchesService } from '../protocols';

export default class MatchesService implements IMatchesService {
  constructor(private model: IMatchesModel) {
    this.model = model;
  }

  async create(
    homeTeam: number,
    awayTeam: number,
    homeTeamGoals: number,
    awayTeamGoals: number,
  ): Promise<IMatch> {
    const match = await this.model.create(homeTeam, awayTeam, homeTeamGoals, awayTeamGoals);

    return match;
  }

  async list(): Promise<IMatchAssociation[]> {
    const matches = await this.model.list();

    return matches;
  }
}
