export interface IUser {
  id?: number;
  username: string;
  role: string;
  email: string;
  password: string;

}
export interface ITeam {
  id: number;
  teamName: string;
}

export interface IMatch {
  id?: number;
  homeTeam: number,
  homeTeamGoals: number,
  awayTeam: number,
  awayTeamGoals: number,
  inProgress?: boolean,
}

export interface IMatchLeaderBoard {
  totalPoints: number,
  totalGames: number,
  totalVictories: number,
  totalDraws: number,
  totalLosses: number,
  goalsFavor: number,
  goalsOwn: number,
  goalsBalance: number,
  efficiency: number | string,
}

export interface ILeaderBoard extends IMatchLeaderBoard{
  name: string,
}

export interface IMatchAssociation extends IMatch {
  teamHome: {
    teamName: string,
  },
  teamAway: {
    teamName: string,
  }
}

export interface ILoginModel {
  login(email: string): Promise<IUser | null>;
}
export interface ITeamsModel {
  list(): Promise<ITeam[]>;
  findTeam(id: number): Promise<ITeam | null>;
}

export interface IMatches {
  list(): Promise<IMatchAssociation[]>;
  create(homeTeam: number, awayTeam: number,
    homeTeamGoals: number, awayTeamGoals: number): Promise<IMatch>;
  finishUpdate(id: number): Promise<void>;
  matchUpdate(id: number, homeTeamGoals: number, awayTeamGoals: number): Promise<void>;
}
export interface ILoginService {
  login(email: string, password: string): Promise<string>
}
export interface ITeamsService {
  list(): Promise<ITeam[]>
  findTeam(id: number): Promise<ITeam | void>;
}
export interface ILeaderBoardService {
  leaderBoardHome(): Promise<ILeaderBoard[] | void>
}
