import { getCustomRepository } from 'typeorm';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import UserRepository from '../repositories/UsersRepository';
import User from '../models/Users';
import authConfig from '../config/auth';
import AppError from '../errors/AppError';

interface Request {
  email: string;
  password: string;
}

interface Response {
  user: User;
  token: string;
}

class AuthenticateUserService {
  public async execute({ email, password }: Request): Promise<Response> {
    const userRepository = getCustomRepository(UserRepository);

    const findUser = await userRepository.findOne({
      where: { email },
    });

    if (!findUser) {
      throw new AppError('Invalid credentials', 401);
    }

    if ((await compare(password, findUser.password)) === false) {
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
