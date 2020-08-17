import { Router } from 'express';
import SessionController from '@modules/users/infra/http/controllers/SessionController';
import { celebrate, Segments, Joi } from 'celebrate';

const SessionsControler = new SessionController();
const SessionRouter = Router();

SessionRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      password: Joi.string().required(),
      email: Joi.string().email().required(),
    },
  }),
  SessionsControler.create,
);

export default SessionRouter;
