import { injectable, inject } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import { differenceInHours } from 'date-fns';
import UserRepository from '../repositories/IUsersRepository';
import IUserTokenRepository from '../repositories/IUserTokenRepository';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';

interface Request {
  password: string;
  token: string;
}
@injectable()
class ResetPasswordService {
  constructor(
    @inject('UserRepository')
    private userRepository: UserRepository,
    @inject('UserTokenRepository')
    private userTokenRepository: IUserTokenRepository,
    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute(data: Request): Promise<void> {
    const userToken = await this.userTokenRepository.findUserByToken(
      data.token,
    );

    if (!userToken) {
      throw new AppError('Invalid token', 401);
    }

    const user = await this.userRepository.findById(userToken.userId);

    if (!user) {
      throw new AppError("User doesn't exists");
    }

    const tokenCreatedAt = userToken.createdAt;
    if (differenceInHours(Date.now(), tokenCreatedAt) > 2) {
      throw new AppError('Token expired', 401);
    }
    user.password = await this.hashProvider.generateHash(data.password);
    this.userRepository.save(user);
  }
}

export default ResetPasswordService;
