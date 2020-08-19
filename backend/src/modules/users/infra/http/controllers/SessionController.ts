import { Request, Response } from 'express';
import AuthenticateUserService from '@modules/users/services/AuthenticateUserService';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

class SessionController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { email, password } = req.body;
    const AuthUser = container.resolve(AuthenticateUserService);
    const { user, token } = await AuthUser.execute({
      email,
      password,
    });
    return res.json({ user: classToClass(user), token });
  }
}

export default SessionController;
