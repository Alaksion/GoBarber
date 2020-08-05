import { Router } from 'express';
import ForgotPasswordController from '../../controllers/ForgotPasswordController';
import ResetPasswordController from '../../controllers/ResetPasswordController';

const forgotPasswordController = new ForgotPasswordController();
const resetPasswordController = new ResetPasswordController();
const PassWordRouter = Router();

PassWordRouter.post('/forgot', forgotPasswordController.create);
PassWordRouter.post('/reset', resetPasswordController.create);

export default PassWordRouter;
