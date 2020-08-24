import { injectable, inject } from 'tsyringe';
import IUserRepository from '@modules/users/repositories/IUsersRepository';
import User from '@modules/users/infra/typeorm/entities/Users';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';

interface Request {
  userId: string;
}

@injectable()
class ListProviderService {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,
    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({ userId }: Request): Promise<Array<User>> {
    let users = await this.cacheProvider.recover<User[]>(
      `providers-list:${userId}`,
    );

    if (!users) {
      users = await this.userRepository.findAllProviders({
        exceptUserID: userId,
      });

      await this.cacheProvider.save(`providers-list:${userId}`, users);
    }

    return users;
  }
}

export default ListProviderService;
