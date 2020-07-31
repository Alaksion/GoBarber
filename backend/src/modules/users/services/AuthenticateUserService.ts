import IHashProvider from '@modules/users/providers/HashProvider/models/IHashProvider'
import '@modules/users/providers/HashProvider/index'
import { sign } from 'jsonwebtoken';
import User from '@modules/users/infra/typeorm/entities/Users';
import authConfig from '@config/auth';
import AppError from '@shared/errors/AppError';
import IUserRepository from '@modules/users/repositories/IUsersRepository';
import { inject, injectable } from 'tsyringe';

interface Request {
  email: string;
  password: string;
}

interface Response {
  user: User;
  token: string;
}

@injectable()
class AuthenticateUserService {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,
    @inject('HashProvider')
    private hashProvider : IHashProvider
  ) {}

  public async execute({ email, password }: Request): Promise<Response> {
    const findUser = await this.userRepository.findByEmail(email);

    if (!findUser) {
      throw new AppError('Invalid credentials', 401);
    }

    if ((await this.hashProvider.compareHash(password, findUser.password)) === false) {
      throw new AppError('Invalid credentials', 401);
    }

    const token = sign({}, authConfig.secret, {
      subject: findUser.id,
      expiresIn: authConfig.expiresAt,
    });

    return { user: findUser, token };
  }
}

export default AuthenticateUserService;
