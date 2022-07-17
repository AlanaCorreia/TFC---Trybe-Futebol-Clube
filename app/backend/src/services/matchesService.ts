import { IMatchAssociation, IMatchesModel, IMatchesService } from '../protocols';

export default class MatchesService implements IMatchesService {
  constructor(private model: IMatchesModel) {
    this.model = model;
  }

  async list(): Promise<IMatchAssociation[]> {
    const matches = await this.model.list();

    return matches;
  }
}
