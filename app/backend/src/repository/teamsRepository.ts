import Team from '../database/models/team';

import { ITeamsModel, ITeam } from '../protocols';

export default class teamsRepository implements ITeamsModel {
  constructor(private model = Team) {
    this.model = model;
  }

  list = async (): Promise<ITeam[]> => {
    const teams = await this.model.findAll();

    return teams as ITeam[];
  };
}
