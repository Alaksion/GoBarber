import { injectable, inject } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import IUserRepository from '@modules/users/repositories/IUsersRepository';
import User from '@modules/users/infra/typeorm/entities/Users';

interface Request {
  userId: string;
}

@injectable()
class ListProviderService {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,
  ) {}

  public async execute({ userId }: Request): Promise<Array<User> | undefined> {
    const users = await this.userRepository.findAllProviders({
      exceptUserID: userId,
    });
    console.log(users);

    if (!users) {
      throw new AppError('No providers found');
    }

    return users;
  }
}

export default ListProviderService;
