import { Router } from 'express';
import SessionController from '@modules/users/infra/http/controllers/SessionController';

const SessionsControler = new SessionController();
const SessionRouter = Router();

SessionRouter.post('/', SessionsControler.create);

export default SessionRouter;
