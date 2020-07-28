import User from '@modules/users/infra/typeorm/entities/Users';
import CreateUserDto from '@modules/users/dtos/ICreateUserDto';

export default interface IUsersRepository {
  findById(id: string): Promise<User | undefined>;
  findByEmail(email: string): Promise<User | undefined>;
  create(data: CreateUserDto): Promise<User>;
  save(user: User): Promise<User>;
}
