export interface IUser {
  id?: number;
  username: string;
  role: string;
  email: string;
  password: string;

}

export interface ILoginModel {
  login(email: string): Promise<IUser | null>;
}

export interface ILoginService {
  login(email: string, password: string): Promise<string>
}
