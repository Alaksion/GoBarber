import 'reflect-metadata';
import AuthenticateUserService from '@modules/users/services/AuthenticateUserService';
import CreateUserService from '@modules/users/services/CreateUserService';
import FakeUser from '@modules/users/repositories/Fakes/FakeUserRepository';
import AppError from '@shared/errors/AppError';
import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider';

const fakeHashProvider = new FakeHashProvider();

describe('UserAuthentication', () => {
  it('Should be able to authenticate an existing user', async () => {
    const fakeUserRepository = new FakeUser();
    const authenticateUser = new AuthenticateUserService(
      fakeUserRepository,
      fakeHashProvider,
    );
    const createUser = new CreateUserService(
      fakeUserRepository,
      fakeHashProvider,
    );
    const newUser = await createUser.execute({
      username: 'Lucca',
      password: '123456',
      email: 'luccab.souza@gmail.com',
    });
    const authenticationResponse = await authenticateUser.execute({
      email: newUser.email,
      password: newUser.password,
    });
    expect(authenticationResponse).toHaveProperty('user');
    expect(authenticationResponse).toHaveProperty('token');
  });

  it('Should not be able to authenticate an unexisting user', async () => {
    const fakeUserRepository = new FakeUser();
    const authenticateUser = new AuthenticateUserService(
      fakeUserRepository,
      fakeHashProvider,
    );
    expect(
      authenticateUser.execute({
        email: 'teste@teste.com.br',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('Should not be able to authenticate an existing user with the wrong email-password combination', async () => {
    const fakeUserRepository = new FakeUser();
    const createUser = new CreateUserService(
      fakeUserRepository,
      fakeHashProvider,
    );
    const authenticateUser = new AuthenticateUserService(
      fakeUserRepository,
      fakeHashProvider,
    );
    const newUser = await createUser.execute({
      username: 'Lucca',
      password: '123456',
      email: 'luccab.souza@gmail.com',
    });
    expect(
      authenticateUser.execute({
        email: newUser.email,
        password: `${newUser.password}123`,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
