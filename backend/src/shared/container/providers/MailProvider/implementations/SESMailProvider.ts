import nodemailer, { Transporter } from 'nodemailer';
import { inject, injectable } from 'tsyringe';
import * as aws from 'aws-sdk';
import mail from '@config/mail';
import IMailProvider from '../models/IMailProvider';
import IMailProviderDto from '../dtos/IMailProviderDTO';
import IMailTemplateProvider from '../../MailTemplateProvider/models/IMailTemplate';

interface Message {
  to: string;
  body: string;
}
@injectable()
export default class SESMailProvider implements IMailProvider {
  private client: Transporter;

  constructor(
    @inject('MailTemplateProvider')
    private mailTemplateProvider: IMailTemplateProvider,
  ) {
    this.client = nodemailer.createTransport({
      SES: new aws.SES({
        apiVersion: '2010-12-01',
        region: 'us_east-1',
      }),
    });
  }

  public async sendMail({
    to,
    from,
    subject,
    templateData,
  }: IMailProviderDto): Promise<void> {
    const { email, name } = mail.defaults.from;

    const message = await this.client.sendMail({
      from: {
        address: email,
        name,
      },
      to: {
        address: to.email,
        name: to.name,
      },
      subject,
      html: await this.mailTemplateProvider.parse(templateData),
    });
  }
}
