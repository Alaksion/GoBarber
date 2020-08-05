import 'reflect-metadata';
import AuthenticateUserService from '@modules/users/services/AuthenticateUserService';
import CreateUserService from '@modules/users/services/CreateUserService';
import FakeUser from '@modules/users/repositories/Fakes/FakeUserRepository';
import AppError from '@shared/errors/AppError';
import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider';

let fakeHashProvider: FakeHashProvider;
let createUserService: CreateUserService;
let fakeUserRepository: FakeUser;
let authenticateUserService: AuthenticateUserService;

describe('UserAuthentication', () => {
  beforeEach(() => {
    fakeHashProvider = new FakeHashProvider();
    fakeUserRepository = new FakeUser();
    createUserService = new CreateUserService(
      fakeUserRepository,
      fakeHashProvider,
    );
    authenticateUserService = new AuthenticateUserService(
      fakeUserRepository,
      fakeHashProvider,
    );
  });

  it('Should be able to authenticate an existing user', async () => {
    const newUser = await createUserService.execute({
      username: 'Lucca',
      password: '123456',
      email: 'luccab.souza@gmail.com',
    });
    const authenticationResponse = await authenticateUserService.execute({
      email: newUser.email,
      password: newUser.password,
    });
    await expect(authenticationResponse).toHaveProperty('user');
    await expect(authenticationResponse).toHaveProperty('token');
  });

  it('Should not be able to authenticate an unexisting user', async () => {
    await expect(
      authenticateUserService.execute({
        email: 'teste@teste.com.br',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('Should not be able to authenticate an existing user with the wrong email-password combination', async () => {
    const newUser = await createUserService.execute({
      username: 'Lucca',
      password: '123456',
      email: 'luccab.souza@gmail.com',
    });
    await expect(
      authenticateUserService.execute({
        email: newUser.email,
        password: `${newUser.password}123`,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
