import { Router } from 'express';
import ResetPasswordController from '@modules/users/infra/http/controllers/ResetPasswordController';
import ForgotPasswordController from '@modules/users/infra/http/controllers/ForgotPasswordController';
import { celebrate, Segments, Joi } from 'celebrate';

const forgotPasswordController = new ForgotPasswordController();
const resetPasswordController = new ResetPasswordController();
const PassWordRouter = Router();

PassWordRouter.post(
  '/forgot',
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().email().required(),
    },
  }),
  forgotPasswordController.create,
);
PassWordRouter.post(
  '/reset',
  celebrate({
    [Segments.BODY]: {
      token: Joi.string().uuid().required(),
      password: Joi.string().required().min(6),
      passwordConfirmation: Joi.string().required().valid(Joi.ref('password')),
    },
  }),
  resetPasswordController.create,
);

export default PassWordRouter;
