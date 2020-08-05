import { Repository, getRepository } from 'typeorm';
import IUserTokenRepository from '../../../repositories/IUserTokenRepository';
import UserToken from '../entities/Users_Token';

class UserTokenRepository implements IUserTokenRepository {
  private ormRepository: Repository<UserToken>;

  constructor() {
    this.ormRepository = getRepository(UserToken);
  }

  public async generate(userId: string): Promise<UserToken> {
    const token = this.ormRepository.create({ userId });
    await this.ormRepository.save(token);
    return token;
  }

  public async findUserByToken(token: string): Promise<UserToken | undefined> {
    const userToken = this.ormRepository.findOne({ where: { token } });
    return userToken;
  }
}

export default UserTokenRepository;
