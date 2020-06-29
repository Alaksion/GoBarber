import path from 'path';
import { getCustomRepository } from 'typeorm';
import fs from 'fs';
import UserRepository from '../repositories/UsersRepository';
import User from '../models/Users';
import MulterConfig from '../config/MulterConfig';
import AppError from '../errors/AppError';

interface Request {
  userId: string;
  filename: string;
}

class UpdateUserAvatarService {
  public async execute({ userId, filename }: Request): Promise<User> {
    const userRepository = getCustomRepository(UserRepository);
    const user = await userRepository.findOne({
      where: { id: userId },
    });

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
    await userRepository.save(user);
    return user;
  }
}

export default UpdateUserAvatarService;
