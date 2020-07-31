import AppError from '@shared/errors/AppError';
import FakeUser from '@modules/users/repositories/Fakes/FakeUserRepository';
import CreateUserService from '@modules/users/services/CreateUserService';
import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider';

const FakeUserRepository = new FakeUser();
const fakeHashProvider = new FakeHashProvider();

describe('Create user', () => {
  it('Should be able to create a new user', async () => {
    const createUser = new CreateUserService(
      FakeUserRepository,
      fakeHashProvider,
    );
    const newUser = await createUser.execute({
      username: 'Lucca',
      password: '123456',
      email: 'luccab.souza@gmail.com',
    });
    expect(newUser).toHaveProperty('id');
  });

  it('Should not be able to create two users with same e-mail', async () => {
    const createUser = new CreateUserService(
      FakeUserRepository,
      fakeHashProvider,
    );
    const newUser = await createUser.execute({
      username: 'Lucca',
      password: '123456',
      email: 'luccab.souza@2gmail.com',
    });
    expect(
      createUser.execute({
        username: 'Lucca',
        password: '123456',
        email: 'luccab.souza@2gmail.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
