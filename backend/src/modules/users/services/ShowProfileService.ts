import { injectable, inject } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import User from '../infra/typeorm/entities/Users';
import IUserRepository from '../repositories/IUsersRepository';

interface Request {
  userId: string;
}

@injectable()
class ShowProfileService {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,
  ) {}

  public async execute({ userId }: Request): Promise<User> {
    const user = await this.userRepository.findById(userId);

    if (!user) {
      throw new AppError('User does not exist');
    }
    return user;
  }
}

export default ShowProfileService;
