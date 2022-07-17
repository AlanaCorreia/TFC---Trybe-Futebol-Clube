import * as express from 'express';

import Controller from '../../controllers/teamsController';
import Repository from '../../repository/teamsRepository';
import Service from '../../services/teamsService';

const entityFactory = () => {
  const repository = new Repository();
  const service = new Service(repository);
  const controller = new Controller(service);

  return controller;
};

const teamsController = entityFactory();

const teamsRouter = express.Router();

teamsRouter.get('/', (req, res, next) => {
  teamsController.list(req, res, next);
});

export default teamsRouter;
