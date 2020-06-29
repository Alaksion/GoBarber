import { getCustomRepository } from 'typeorm';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import UserRepository from '../repositories/UsersRepository';
import User from '../models/Users';
import authConfig from '../config/auth';

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
      throw Error('Invalid credentials');
    }

    if ((await compare(password, findUser.password)) === false) {
      throw Error('Invalid credentials');
    }

    const token = sign({}, authConfig.secret, {
      subject: findUser.id,
      expiresIn: authConfig.expiresAt,
    });

    return { user: findUser, token };
  }
}

export default AuthenticateUserService;
