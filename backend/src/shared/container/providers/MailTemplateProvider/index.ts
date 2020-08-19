import { container } from 'tsyringe';
import IMailTemplateProvider from './models/IMailTemplate';
import HandleBarsMailTemplate from './implementations/HandlebarsMailTemplateProvider';

const providers = {
  handlebars: HandleBarsMailTemplate,
};

container.registerSingleton<IMailTemplateProvider>(
  'MailTemplateProvider',
  providers.handlebars,
);
