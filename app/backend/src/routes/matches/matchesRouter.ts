import * as express from 'express';
import validationToken from '../../middlewares/validationToken';

import Controller from '../../controllers/matchesController';
import Repository from '../../repository/matchesRepository';
import Service from '../../services/matchesService';

const entityFactory = () => {
  const repository = new Repository();
  const service = new Service(repository);
  const controller = new Controller(service);

  return controller;
};

const matchesController = entityFactory();

const matchesRouter = express.Router();

matchesRouter.post('/', validationToken, (req, res, next) => {
  matchesController.create(req, res, next);
});

matchesRouter.get('/', (req, res, next) => {
  matchesController.list(req, res, next);
});

export default matchesRouter;
