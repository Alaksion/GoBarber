import { Request, Response } from 'express';
import AuthenticateUserService from '@modules/users/services/AuthenticateUserService';
import { container } from 'tsyringe';

class SessionController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { email, password } = req.body;
    const AuthUser = container.resolve(AuthenticateUserService);
    const { user, token } = await AuthUser.execute({
      email,
      password,
    });
    delete user.password;
    return res.json({ user, token });
  }
}

export default SessionController;
