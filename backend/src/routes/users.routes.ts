import { Router } from 'express';
import { getCustomRepository } from 'typeorm';
import UserRepository from '../repositories/UsersRepository';
import CreateUserService from '../services/CreateUserService';

const UserRouter = Router();

UserRouter.post('/', async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const CreateUser = new CreateUserService();
    const newUser = await CreateUser.execute({
      username,
      email,
      password,
    });
    delete newUser.password;
    return res.json(newUser);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
});

UserRouter.get('/', async (req, res) => {
  const userRepository = getCustomRepository(UserRepository);
  const users = await userRepository.find();
  return res.json(users);
});

export default UserRouter;
