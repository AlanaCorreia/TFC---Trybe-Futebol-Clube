import * as bcrypt from 'bcryptjs';
import { StatusCodes } from 'http-status-codes';
import generateJWT from '../utils/generateJWT';
import { ILoginModel, ILoginService } from '../protocols';
import CostumError from '../utils/CostumError';

const validationPass = (password: string, hash: string) => {
  const validatePass = bcrypt.compareSync(password, hash);

  if (!validatePass) throw new CostumError(StatusCodes.UNAUTHORIZED, 'Incorrect email or password');

  return validatePass;
};

export default class loginService implements ILoginService {
  constructor(private model: ILoginModel) {
    this.model = model;
  }

  async login(email: string, password: string): Promise<string> {
    const user = await this.model.login(email);

    if (!user) throw new CostumError(StatusCodes.UNAUTHORIZED, 'Incorrect email or password');

    validationPass(password, user.password);

    const objToken = { id: user.id, username: user.username, role: user.role, email: user.email };

    const token = generateJWT(objToken);

    return token;
  }
}
