import * as express from 'express';

import Controller from '../../controllers/leaderBoardController';
import Service from '../../services/leaderBoardService';

const entityFactory = () => {
  const service = new Service();
  const controller = new Controller(service);

  return controller;
};

const leaderBoardController = entityFactory();

const leaderBoardRouter = express.Router();

leaderBoardRouter.get('/home', (req, res, next) => {
  leaderBoardController.leaderBoardHome(req, res, next);
});

export default leaderBoardRouter;
