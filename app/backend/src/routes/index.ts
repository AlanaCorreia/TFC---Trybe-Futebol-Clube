import * as express from 'express';
import loginRouter from './login/loginRouter';
import teamsRouter from './teams/teamsRouter';

const router = express.Router();

router.use('/login', loginRouter);
router.use('/teams', teamsRouter);

export default router;
