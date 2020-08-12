import { Router } from 'express';
import ResetPasswordController from '@modules/users/infra/http/controllers/ResetPasswordController';
import ForgotPasswordController from '@modules/users/infra/http/controllers/ForgotPasswordController';

const forgotPasswordController = new ForgotPasswordController();
const resetPasswordController = new ResetPasswordController();
const PassWordRouter = Router();

PassWordRouter.post('/forgot', forgotPasswordController.create);
PassWordRouter.post('/reset', resetPasswordController.create);

export default PassWordRouter;
