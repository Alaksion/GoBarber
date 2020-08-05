import IMailProvider from '../models/IMailProvider';
import IMailProviderDto from '../dtos/IMailProviderDTO';

export default class FakeMailProvider implements IMailProvider {
  private messages: Array<IMailProviderDto> = [];

  public async sendMail(message: IMailProviderDto): Promise<void> {
    this.messages.push(message);
  }
}
