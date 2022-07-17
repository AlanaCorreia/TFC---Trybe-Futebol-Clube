import Team from '../database/models/team';
import Matches from '../database/models/matches';

import { IMatch, IMatchAssociation, IMatchesModel } from '../protocols';

export default class MatchesRepository implements IMatchesModel {
  constructor(private model = Matches) {
    this.model = model;
  }

  async create(
    homeTeam: number,
    awayTeam: number,
    homeTeamGoals: number,
    awayTeamGoals: number,
  ): Promise<IMatch> {
    const match = await this.model
      .create({ homeTeam, awayTeam, homeTeamGoals, awayTeamGoals, inProgress: true });

    return match as unknown as IMatch;
  }

  list = async (): Promise<IMatchAssociation[]> => {
    const teams = await this.model.findAll({ include: [
      { model: Team, as: 'teamHome', attributes: { exclude: ['id'] } },
      { model: Team, as: 'teamAway', attributes: { exclude: ['id'] } }],
    });

    return teams as unknown as IMatchAssociation[];
  };
}
