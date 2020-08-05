import IMailProviderDto from '../dtos/IMailProviderDTO';

export default interface IMailProvider {
  sendMail(data: IMailProviderDto): Promise<void>;
}
