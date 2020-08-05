import nodemailer, { Transporter } from 'nodemailer';
import { inject, injectable } from 'tsyringe';
import IMailProvider from '../models/IMailProvider';
import IMailProviderDto from '../dtos/IMailProviderDTO';
import IMailTemplateProvider from '../../MailTemplateProvider/models/IMailTemplate';

interface Message {
  to: string;
  body: string;
}
@injectable()
export default class EtherealMailProvider implements IMailProvider {
  private client: Transporter;

  constructor(
    @inject('MailTemplateProvider')
    private mailTemplateProvider: IMailTemplateProvider,
  ) {
    nodemailer.createTestAccount().then(account => {
      const transporter = nodemailer.createTransport({
        host: account.smtp.host,
        port: account.smtp.port,
        secure: account.smtp.secure,
        auth: {
          user: account.user,
          pass: account.pass,
        },
      });
      this.client = transporter;
    });
  }

  public async sendMail({
    to,
    from,
    subject,
    templateData,
  }: IMailProviderDto): Promise<void> {
    const message = await this.client.sendMail({
      from: {
        name: from?.name || 'Equipe GoBarber',
        address: from?.email || 'equipe@GoBarber.com.br',
      },
      to: {
        name: to.email,
        address: to.email,
      },
      subject,
      html: await this.mailTemplateProvider.parse(templateData),
    });
    console.log(nodemailer.getTestMessageUrl(message));
    console.log(message.messageId);
  }
}
