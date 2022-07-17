import * as express from 'express';
import loginRouter from './login/loginRouter';
import teamsRouter from './teams/teamsRouter';
import matchesRouter from './matches/matchesRouter';

const router = express.Router();

router.use('/login', loginRouter);
router.use('/teams', teamsRouter);
router.use('/matches', matchesRouter);

export default router;
