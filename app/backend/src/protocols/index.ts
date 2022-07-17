export interface IUser {
  id?: number;
  username: string;
  role: string;
  email: string;
  password: string;

}
export interface ITeam {
  id?: number;
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

export interface IMatchAssociation extends IMatch {
  teamHome: {
    teamName: string,
  },
  teamAway: {
    teamName: string,
  }
}

export interface IMatchesModel {
  list(): Promise<IMatchAssociation[]>;
  create(homeTeam: number, awayTeam: number,
    homeTeamGoals: number, awayTeamGoals: number): Promise<IMatch>;
  update(id: number): Promise<void>;
}
export interface ILoginModel {
  login(email: string): Promise<IUser | null>;
}
export interface ITeamsModel {
  list(): Promise<ITeam[]>;
  findTeam(id: number): Promise<ITeam | null>;
}

export interface IMatchesService {
  list(): Promise<IMatchAssociation[]>;
  create(homeTeam: number, awayTeam: number,
    homeTeamGoals: number, awayTeamGoals: number): Promise<IMatch>;
  update(id: number): Promise<void>;
}
export interface ILoginService {
  login(email: string, password: string): Promise<string>
}
export interface ITeamsService {
  list(): Promise<ITeam[]>
  findTeam(id: number): Promise<ITeam | void>;
}
