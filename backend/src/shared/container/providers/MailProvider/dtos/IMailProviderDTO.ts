import IParseMailDto from '@shared/container/providers/MailTemplateProvider/dtos/IParseMailTemplateDto';

interface IMailContact {
  name: string;
  email: string;
}

export default interface IMailProviderDTO {
  to: IMailContact;
  from?: IMailContact;
  subject: string;
  templateData: IParseMailDto;
}
