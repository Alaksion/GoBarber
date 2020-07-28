import { hash } from 'bcryptjs';
import User from '@modules/users/infra/typeorm/entities/Users';
import IUserRepository from '@modules/users/repositories/IUsersRepository';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';

interface Request {
  username: string;
  password: string;
  email: string;
}

@injectable()
class CreateUserService {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,
  ) {}

  public async execute({ username, email, password }: Request): Promise<User> {
    const validateMail = await this.userRepository.findByEmail(email);

    if (validateMail) {
      throw new AppError('Email already in use', 400);
    }
    const encriptedpassword = await hash(password, 7);

    const newUser = await this.userRepository.create({
      password: encriptedpassword,
      email,
      name: username,
    });
    return newUser;
  }
}

export default CreateUserService;
