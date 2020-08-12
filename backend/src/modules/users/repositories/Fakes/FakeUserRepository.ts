import { uuid } from 'uuidv4';
import FindAllProviderDTO from '@modules/users/dtos/IFindProviderDTO';
import User from '../../infra/typeorm/entities/Users';
import CreateUserDTO from '../../dtos/ICreateUserDto';
import IUsersRepository from '../IUsersRepository';

class UserRepository implements IUsersRepository {
  private users: Array<User> = [];

  public async findByEmail(email: string): Promise<User | undefined> {
    const findUser = this.users.find(user => user.email === email);
    return findUser;
  }

  public async findById(id: string): Promise<User | undefined> {
    const findUser = this.users.find(user => user.id === id);
    return findUser;
  }

  public async create(data: CreateUserDTO): Promise<User> {
    const newUser = new User();

    newUser.id = uuid();
    newUser.email = data.email;
    newUser.password = data.password;
    newUser.username = data.username;

    this.users.push(newUser);
    return newUser;
  }

  public async save(user: User): Promise<User> {
    const findIndex = this.users.findIndex(
      currentUser => currentUser.id === user.id,
    );
    this.users[findIndex] = user;
    return user;
  }

  public async findAllProviders(
    data: FindAllProviderDTO,
  ): Promise<Array<User> | undefined> {
    let users = this.users;

    if (data.exceptUserID) {
      users = this.users.filter(user => user.id !== data.exceptUserID);
    }

    return users;
  }
}

export default UserRepository;
