import { Router } from 'express';
import Authenticate from '@shared/infra/http/middlewares/Authenticate';
import { celebrate, Segments, Joi } from 'celebrate';
import ProfileController from '@modules/users/infra/http/controllers/ProfileController';

const profileController = new ProfileController();

const profileRouter = Router();
profileRouter.use(Authenticate);

profileRouter.put(
  '/',
  celebrate({
    [Segments.BODY]: {
      username: Joi.string().required(),
      oldPassword: Joi.string(),
      password: Joi.string(),
      passwordConfirmation: Joi.string().valid(Joi.ref('password')),
      email: Joi.string().email().required(),
    },
  }),
  profileController.update,
);
profileRouter.get('/', profileController.show);

export default profileRouter;
