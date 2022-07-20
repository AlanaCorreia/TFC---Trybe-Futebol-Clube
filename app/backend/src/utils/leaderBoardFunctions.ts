import { ILeaderBoard, IMatchAssociation } from '../protocols';

const totalVictories = (matchesTeam: IMatchAssociation[]) => {
  const totalVic = matchesTeam.reduce((acc: number, curr: IMatchAssociation) => {
    if (curr.homeTeamGoals > curr.awayTeamGoals) return acc + 1;
    return acc;
  }, 0);

  return totalVic;
};

const totalDraws = (matchesTeam: IMatchAssociation[]) => {
  const totalDr = matchesTeam.reduce((acc: number, curr: IMatchAssociation) => {
    if (curr.homeTeamGoals === curr.awayTeamGoals) return acc + 1;
    return acc;
  }, 0);

  return totalDr;
};

const totalLosses = (matchesTeam: IMatchAssociation[]) => {
  const totalLos = matchesTeam.reduce((acc: number, curr: IMatchAssociation) => {
    if (curr.homeTeamGoals < curr.awayTeamGoals) return acc + 1;
    return acc;
  }, 0);

  return totalLos;
};

const goalsFavor = (matchesTeam: IMatchAssociation[]) => {
  const totalGoalsFavor = matchesTeam
    .reduce((acc: number, curr: IMatchAssociation) => acc + curr.homeTeamGoals, 0);

  return totalGoalsFavor;
};

const goalsOwn = (matchesTeam: IMatchAssociation[]) => {
  const totalGoalsOwn = matchesTeam
    .reduce((acc: number, curr: IMatchAssociation) => acc + curr.awayTeamGoals, 0);

  return totalGoalsOwn;
};

const totalPoints = (matchesTeam: IMatchAssociation[]) => {
  const totalPts = matchesTeam.reduce((acc: number, curr: IMatchAssociation) => {
    if (curr.homeTeamGoals > curr.awayTeamGoals) return acc + 3;
    if (curr.homeTeamGoals === curr.awayTeamGoals) return acc + 1;
    return acc;
  }, 0);

  return totalPts;
};

export const orderRanking = (arrayLeaderboard: any) => {
  const order = arrayLeaderboard.sort((a: ILeaderBoard, b: ILeaderBoard) => {
    if (a.totalPoints > b.totalPoints) return -1;
    if (a.totalPoints < b.totalPoints) return 1;

    if (a.totalVictories > b.totalVictories) return -1;
    if (a.totalVictories < b.totalVictories) return 1;

    if (a.goalsBalance > b.goalsBalance) return -1;
    if (a.goalsBalance < b.goalsBalance) return 1;

    if (a.goalsFavor > b.goalsFavor) return -1;
    if (a.goalsFavor < b.goalsFavor) return 1;

    if (a.goalsOwn > b.goalsOwn) return -1;
    if (a.goalsOwn < b.goalsOwn) return 1;

    return 0;
  });

  return order;
};

const createLeaderboard = (team: string, matches: IMatchAssociation[]) => ({
  name: team,
  totalPoints: totalPoints(matches),
  totalGames: matches.length,
  totalVictories: totalVictories(matches),
  totalDraws: totalDraws(matches),
  totalLosses: totalLosses(matches),
  goalsFavor: goalsFavor(matches),
  goalsOwn: goalsOwn(matches),
  goalsBalance: goalsFavor(matches) - goalsOwn(matches),
  efficiency: Number(((totalPoints(matches) / (matches.length * 3)) * 100).toFixed(2)),
});

export default createLeaderboard;
