import { getRepository, Repository } from 'typeorm';

import User from '@modules/users/infra/typeorm/entities/Users';
import CreateUserDTO from '@modules/users/dtos/ICreateUserDto';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';

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
}

export default UserRepository;
