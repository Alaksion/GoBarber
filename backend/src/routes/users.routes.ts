import { Router } from 'express';
import { getCustomRepository } from 'typeorm';
import multer from 'multer';
import UserRepository from '../repositories/UsersRepository';
import CreateUserService from '../services/CreateUserService';
import Authenticate from '../middlewares/Authenticate';
import multerConfig from '../config/MulterConfig';
import UpdateUserAvatarService from '../services/UpdateUserAvatar';

const UserRouter = Router();
const upload = multer(multerConfig);

UserRouter.post('/', async (req, res) => {
  const { username, email, password } = req.body;
  const CreateUser = new CreateUserService();
  const newUser = await CreateUser.execute({
    username,
    email,
    password,
  });
  delete newUser.password;
  return res.json(newUser);
});

UserRouter.get('/', async (req, res) => {
  const userRepository = getCustomRepository(UserRepository);
  const users = await userRepository.find();
  return res.json(users);
});

UserRouter.patch(
  '/avatar',
  Authenticate,
  upload.single('avatar'),
  async (req, res) => {
    const UpdateAvatarService = new UpdateUserAvatarService();
    const UpdateAvatar = await UpdateAvatarService.execute({
      userId: req.user.id,
      filename: req.file.filename,
    });
    delete UpdateAvatar.password;
    return res.json(UpdateAvatar);
  },
);

export default UserRouter;
