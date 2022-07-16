import User from '../database/models/user';

import { ILoginModel, IUser } from '../protocols';

export default class loginRepository implements ILoginModel {
  constructor(private model = User) {
    this.model = model;
  }

  login = async (email: string): Promise<IUser | null> => {
    const user = await this.model.findOne({ where: { email } });

    return user as IUser;
  };
}
