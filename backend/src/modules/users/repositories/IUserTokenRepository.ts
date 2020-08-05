import UserToken from '../infra/typeorm/entities/Users_Token';

export default interface IUserTokensRepository {
  generate(userId: string): Promise<UserToken>;
  findUserByToken(token: string): Promise<UserToken | undefined>;
}
