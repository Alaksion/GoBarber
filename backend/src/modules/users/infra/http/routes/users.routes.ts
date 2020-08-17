import { Router } from 'express';
import multer from 'multer';

import Authenticate from '@shared/infra/http/middlewares/Authenticate';
import multerConfig from '@config/MulterConfig';
import { celebrate, Segments, Joi } from 'celebrate';
import UserController from '@modules/users/infra/http/controllers/UserController';
import UserAvatarController from '@modules/users/infra/http/controllers/UserAvatarController';

const UserRouter = Router();
const upload = multer(multerConfig);

const UsersController = new UserController();
const UsersAvatarController = new UserAvatarController();

UserRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      username: Joi.string().required(),
      password: Joi.string().required(),
      email: Joi.string().email().required(),
    },
  }),
  UsersController.create,
);

UserRouter.patch(
  '/avatar',
  Authenticate,
  upload.single('avatar'),
  UsersAvatarController.update,
);

export default UserRouter;
