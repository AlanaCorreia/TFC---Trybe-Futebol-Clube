import { ILeaderBoardService, ITeam, ILeaderBoard } from '../protocols';
import TeamsRepository from '../repository/teamsRepository';
import MatchesRepository from '../repository/matchesRepository';
import createLeaderboard, { orderRanking } from '../utils/leaderBoardFunctions';

export default class LeaderBoardService implements ILeaderBoardService {
  teamModel = new TeamsRepository();
  matchesModel = new MatchesRepository();

  async leaderBoardHome(): Promise<ILeaderBoard[]> {
    const teams = await this.teamModel.list();
    const arrayMatchesTeams = await Promise.all(teams.map(async (team: ITeam) => {
      const matches = await this.matchesModel.finishList(team.id);

      const result = { teamName: team.teamName, matches };

      return result;
    }));

    const arrayLeaderboard = arrayMatchesTeams.map(
      ({ teamName, matches }) => createLeaderboard(teamName, matches),
    );

    const orderArray = orderRanking(arrayLeaderboard);

    return orderArray;
  }
}
