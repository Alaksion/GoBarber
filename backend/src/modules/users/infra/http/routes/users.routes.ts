import { Router } from 'express';
import multer from 'multer';

import Authenticate from '@shared/infra/http/middlewares/Authenticate';
import multerConfig from '@config/MulterConfig';

import UserController from '@modules/users/infra/controllers/UserController';
import UserAvatarController from '@modules/users/infra/controllers/UserAvatarController';

const UserRouter = Router();
const upload = multer(multerConfig);

const UsersController = new UserController();
const UsersAvatarController = new UserAvatarController();

UserRouter.post('/', UsersController.create);

UserRouter.patch(
  '/avatar',
  Authenticate,
  upload.single('avatar'),
  UsersAvatarController.update,
);

export default UserRouter;
