import { injectable, inject } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProvider';
import path from 'path';
import UserRepository from '../repositories/IUsersRepository';
import IUserTokenRepository from '../repositories/IUserTokenRepository';

interface Request {
  email: string;
}
@injectable()
class ForgotPasswordService {
  constructor(
    @inject('UserRepository')
    private userRepository: UserRepository,
    @inject('MailProvider')
    private mailProvider: IMailProvider,
    @inject('UserTokenRepository')
    private userTokenRepository: IUserTokenRepository,
  ) {}

  public async execute(data: Request): Promise<void> {
    const user = await this.userRepository.findByEmail(data.email);

    if (!user) {
      throw new AppError('User does not exist', 401);
    }

    const { token } = await this.userTokenRepository.generate(user.id);

    await this.mailProvider.sendMail({
      to: {
        name: user.username,
        email: user.email,
      },
      subject: '[GoBarber]Recuperação de senha',
      templateData: {
        file: path.resolve(__dirname, '..', 'views', 'forgot_password.hbs'),
        variables: {
          name: user.username,
          link: `${process.env.APP_WEB_URL}/resetpassword?token=${token}`,
        },
      },
    });
  }
}

export default ForgotPasswordService;
