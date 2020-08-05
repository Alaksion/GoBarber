import FakeUser from '@modules/users/repositories/Fakes/FakeUserRepository';
import FakeTokens from '@modules/users/repositories/Fakes/FakeUserTokenRepository';
import SendPasswordEmailService from '@modules/users/services/SendPasswordEmailService';
import FakeMailProvider from '@shared/container/providers/MailProvider/fakes/FakeMailProvider';
import AppError from '@shared/errors/AppError';

let fakeUserRepository: FakeUser;
let mailProvider: FakeMailProvider;
let mailService: SendPasswordEmailService;
let fakeTokensRepository: FakeTokens;

describe('Reset passowrd user', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUser();

    fakeTokensRepository = new FakeTokens();

    mailProvider = new FakeMailProvider();

    mailService = new SendPasswordEmailService(
      fakeUserRepository,
      mailProvider,
      fakeTokensRepository,
    );
  });

  it('Should be able to recover the password of an existing user', async () => {
    const sendMail = jest.spyOn(mailProvider, 'sendMail');

    await fakeUserRepository.create({
      username: 'Name',
      email: 'name@mail.com',
      password: '123456',
    });

    await mailService.execute({ email: 'name@mail.com' });
    await expect(sendMail).toHaveBeenCalled();
  });

  it('Should not be able to recover the password of a not existing user', async () => {
    await expect(
      mailService.execute({ email: 'name@mail.com' }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('Should generate an unique token for the user who requested the reset password email', async () => {
    const generateToken = jest.spyOn(fakeTokensRepository, 'generate');

    const user = await fakeUserRepository.create({
      username: 'Name',
      email: 'name@mail.com',
      password: '123456',
    });

    await mailService.execute({ email: 'name@mail.com' });

    await expect(generateToken).toHaveBeenCalledWith(user.id);
  });
});
