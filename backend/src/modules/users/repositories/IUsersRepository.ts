import User from '@modules/users/infra/typeorm/entities/Users';
import CreateUserDto from '@modules/users/dtos/ICreateUserDto';
import FindAllProviderDTO from '@modules/users/dtos/IFindProviderDTO';

export default interface IUsersRepository {
  findById(id: string): Promise<User | undefined>;
  findByEmail(email: string): Promise<User | undefined>;
  findAllProviders(data: FindAllProviderDTO): Promise<Array<User> | undefined>;
  create(data: CreateUserDto): Promise<User>;
  save(user: User): Promise<User>;
}
