import { getCustomRepository } from 'typeorm';
import { hash } from 'bcryptjs';
import User from '../models/Users';
import UserRepository from '../repositories/UsersRepository';

interface Request {
  username: string;
  password: string;
  email: string;
}

class CreateUserService {
  public async execute({ username, email, password }: Request): Promise<User> {
    const userRepository = getCustomRepository(UserRepository);
    const validateMail = await userRepository.find({ where: { email } });

    if (validateMail.length > 0) {
      throw Error('Email already in use');
    }
    const encriptedpassword = await hash(password, 7);

    const newUser = userRepository.create({
      password: encriptedpassword,
      email,
      username,
    });
    await userRepository.save(newUser);
    return newUser;
  }
}

export default CreateUserService;
