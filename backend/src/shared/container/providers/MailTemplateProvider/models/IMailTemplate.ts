import IParseMailDTO from '../dtos/IParseMailTemplateDto';

export default interface IMailTemplate {
  parse(data: IParseMailDTO): Promise<string>;
}
