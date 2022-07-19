import * as express from 'express';
import loginRouter from './login/loginRouter';
import teamsRouter from './teams/teamsRouter';
import matchesRouter from './matches/matchesRouter';
import leaderBoardRouter from './leaderBoard/leaderBoardRouter';

const router = express.Router();

router.use('/login', loginRouter);
router.use('/teams', teamsRouter);
router.use('/matches', matchesRouter);
router.use('/leaderboard', leaderBoardRouter);

export default router;
