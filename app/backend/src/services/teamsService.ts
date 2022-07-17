import { ITeam, ITeamsModel, ITeamsService } from '../protocols';

export default class teamsService implements ITeamsService {
  constructor(private model: ITeamsModel) {
    this.model = model;
  }

  async list(): Promise<ITeam[]> {
    const teams = await this.model.list();

    return teams;
  }
}
