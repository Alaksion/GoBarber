import { getRepository, Repository, Not } from 'typeorm';

import User from '@modules/users/infra/typeorm/entities/Users';
import CreateUserDTO from '@modules/users/dtos/ICreateUserDto';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';

import FindAllProviderDTO from '@modules/users/dtos/IFindProviderDTO';

class UserRepository implements IUsersRepository {
  private ormRepository: Repository<User>;

  constructor() {
    this.ormRepository = getRepository(User);
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne({ where: { email } });
    return user;
  }

  public async findById(id: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne({ where: { id } });
    return user;
  }

  public async create(UserData: CreateUserDTO): Promise<User> {
    const user = this.ormRepository.create(UserData);
    await this.ormRepository.save(user);
    return user;
  }

  public async save(user: User): Promise<User> {
    const savedUser = this.ormRepository.save(user);
    return savedUser;
  }

  public async findAllProviders(
    data: FindAllProviderDTO,
  ): Promise<Array<User>> {
    let users: User[];

    if (data.exceptUserID) {
      users = await this.ormRepository.find({
        where: {
          id: Not(data.exceptUserID),
        },
      });
    } else {
      users = await this.ormRepository.find();
    }

    return users;
  }
}

export default UserRepository;
