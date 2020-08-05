import { Router } from 'express';
import Authenticate from '@shared/infra/http/middlewares/Authenticate';

import ProfileController from '../../controllers/ProfileController';

const profileController = new ProfileController();

const profileRouter = Router();
profileRouter.use(Authenticate);

profileRouter.put('/', profileController.update);
profileRouter.get('/', profileController.show);

export default profileRouter;
