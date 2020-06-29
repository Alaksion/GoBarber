import { Router } from 'express';
import AuthenticateUserService from '../services/AuthenticateUserService';

const SessionRouter = Router();

SessionRouter.post('/', async (req, res) => {
  const { email, password } = req.body;
  const AuthUser = new AuthenticateUserService();
  const { user, token } = await AuthUser.execute({
    email,
    password,
  });
  delete user.password;
  res.json({ user, token });
});

export default SessionRouter;
