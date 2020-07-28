import path from 'path';
import fs from 'fs';
import AppError from '@shared/errors/AppError';
import User from '@modules/users/infra/typeorm/entities/Users';
import IUserRepository from '@modules/users/repositories/IUsersRepository';
import MulterConfig from '@config/MulterConfig';
import { inject, injectable } from 'tsyringe';

interface Request {
  userId: string;
  filename: string;
}

@injectable()
class UpdateUserAvatarService {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,
  ) {}

  public async execute({ userId, filename }: Request): Promise<User> {
    const user = await this.userRepository.findById(userId);

    if (!user) {
      throw new AppError('Cannot change the avatar of an unknown user', 401);
    }

    if (user.avatar) {
      const userAvatarFilePath = path.resolve(
        MulterConfig.directory,
        user.avatar,
      );

      const FileExists = await fs.promises.stat(userAvatarFilePath);

      if (FileExists) {
        await fs.promises.unlink(userAvatarFilePath);
      }
    }

    user.avatar = filename;
    await this.userRepository.save(user);
    return user;
  }
}

export default UpdateUserAvatarService;
