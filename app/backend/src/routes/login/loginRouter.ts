import * as express from 'express';
import validateLogin from '../../middlewares/validationLogin';

import Controller from '../../controllers/loginController';
import Repository from '../../repository/loginRepository';
import Service from '../../services/loginService';

const entityFactory = () => {
  const repository = new Repository();
  const service = new Service(repository);
  const controller = new Controller(service);

  return controller;
};

const loginController = entityFactory();

const loginRouter = express.Router();

loginRouter.post('/', validateLogin, (req, res, next) => {
  loginController.login(req, res, next);
});

export default loginRouter;
