import handlebars from 'handlebars';
import fs from 'fs';
import IMailTemplate from '../models/IMailTemplate';
import IParseMailDTO from '../dtos/IParseMailTemplateDto';

class HandleBarsMailTemplate implements IMailTemplate {
  public async parse(data: IParseMailDTO): Promise<string> {
    const { file, variables } = data;

    const templateFileContent = await fs.promises.readFile(file, {
      encoding: 'utf-8',
    });

    const parseTemplate = handlebars.compile(templateFileContent);
    return parseTemplate(variables);
  }
}

export default HandleBarsMailTemplate;
