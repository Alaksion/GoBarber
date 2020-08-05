import AppError from '@shared/errors/AppError';
import User from '@modules/users/infra/typeorm/entities/Users';
import IUserRepository from '@modules/users/repositories/IUsersRepository';
import { inject, injectable } from 'tsyringe';
import HashProvider from '../providers/HashProvider/models/IHashProvider';

interface Request {
  userId: string;
  name: string;
  email: string;
  password?: string;
  oldPassword?: string;
}

@injectable()
class UpdateUserService {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,
    @inject('HashProvider')
    private hashProvider: HashProvider,
  ) {}

  public async execute(data: Request): Promise<User> {
    const user = await this.userRepository.findById(data.userId);

    if (!user) {
      throw new AppError('User not found', 401);
    }

    const userWithSameEmail = await this.userRepository.findByEmail(data.email);

    if (userWithSameEmail && userWithSameEmail.id !== data.userId) {
      throw new AppError('E-mail already in use');
    }

    if (data.password && !data.oldPassword) {
      throw new AppError('Old password must be filled');
    }

    if (data.password && data.oldPassword) {
      const comparePasswords = await this.hashProvider.compareHash(
        data.oldPassword,
        user.password,
      );

      if (!comparePasswords) {
        throw new AppError('Old password is incorrect');
      }

      user.password = await this.hashProvider.generateHash(data.password);
    }

    user.username = data.name;
    user.email = data.email;
    await this.userRepository.save(user);
    return user;
  }
}

export default UpdateUserService;
