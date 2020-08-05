import IMailTemplate from '../models/IMailTemplate';

class FakeMailTemplate implements IMailTemplate {
  public async parse(): Promise<string> {
    return 'mail content';
  }
}

export default FakeMailTemplate;
