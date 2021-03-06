import User from '@modules/users/infra/typeorm/entities/Users';
import IUserRepository from '@modules/users/repositories/IUsersRepository';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import '@modules/users/providers/HashProvider/index';
import IHashProvider from '@modules/users/providers/HashProvider/models/IHashProvider';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';

interface Request {
  username: string;
  password: string;
  email: string;
}

@injectable()
class CreateUserService {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,
    @inject('HashProvider')
    private hashProvider: IHashProvider,
    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({ username, email, password }: Request): Promise<User> {
    const validateMail = await this.userRepository.findByEmail(email);

    if (validateMail) {
      throw new AppError('Email already in use', 400);
    }
    const encriptedpassword = await this.hashProvider.generateHash(password);

    const newUser = await this.userRepository.create({
      password: encriptedpassword,
      email,
      username,
    });

    await this.cacheProvider.invalidatePrefix('providers-list');

    return newUser;
  }
}

export default CreateUserService;
