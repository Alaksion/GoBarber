import FakeUser from '@modules/users/repositories/Fakes/FakeUserRepository';
import FakeTokens from '@modules/users/repositories/Fakes/FakeUserTokenRepository';
import ResetPasswordService from '@modules/users/services/ResetPasswordService';
import AppError from '@shared/errors/AppError';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';

let fakeUserRepository: FakeUser;
let fakeTokensRepository: FakeTokens;
let resetPasswordService: ResetPasswordService;
let fakeHashProvider: FakeHashProvider;

describe('Reset passowrd user', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUser();

    fakeTokensRepository = new FakeTokens();

    fakeHashProvider = new FakeHashProvider();

    resetPasswordService = new ResetPasswordService(
      fakeUserRepository,
      fakeTokensRepository,
      fakeHashProvider,
    );
  });

  it('Should be able to reset the password of an existing user', async () => {
    const user = await fakeUserRepository.create({
      username: 'Name',
      email: 'name@mail.com',
      password: '123456',
    });

    const token = await fakeTokensRepository.generate(user.id);

    const hash = jest.spyOn(fakeHashProvider, 'generateHash');

    await resetPasswordService.execute({
      password: '654321',
      token: token.token,
    });

    const updatedUser = await fakeUserRepository.findByEmail(user.email);

    await expect(hash).toHaveBeenCalledWith('654321');
    await expect(updatedUser?.password).toBe('654321');
  });

  it('Should not be able to reset the password of an non-existing user', async () => {
    const token = await fakeTokensRepository.generate('123456');
    await expect(
      resetPasswordService.execute({
        password: '654321',
        token: token.token,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('Should not be able to reset the password using a non-existing token', async () => {
    await expect(
      resetPasswordService.execute({
        password: '654321',
        token: 'abcde',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('Should not be able to reset the password using an expired token', async () => {
    const user = await fakeUserRepository.create({
      username: 'Name',
      email: 'name@mail.com',
      password: '123456',
    });

    const token = await fakeTokensRepository.generate(user.id);

    jest.spyOn(Date, 'now').mockImplementation(() => {
      const customDate = new Date();
      return customDate.setHours(customDate.getHours() + 3);
    });

    await expect(
      resetPasswordService.execute({
        password: '654321',
        token: token.token,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
