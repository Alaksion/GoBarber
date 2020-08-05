import { uuid } from 'uuidv4';
import UserToken from '../../infra/typeorm/entities/Users_Token';
import IFakeUserToken from '../IUserTokenRepository';

class FakeTokenRepository implements IFakeUserToken {
  private tokens: Array<UserToken> = [];

  public async generate(userId: string): Promise<UserToken> {
    const userToken = new UserToken();
    Object.assign(userToken, {
      id: uuid(),
      userId,
      token: uuid(),
      createdAt: new Date(),
    });
    this.tokens.push(userToken);
    return userToken;
  }

  public async findUserByToken(token: string): Promise<UserToken | undefined> {
    const userToken = this.tokens.find(
      currentToken => currentToken.token === token,
    );
    return userToken;
  }
}

export default FakeTokenRepository;
