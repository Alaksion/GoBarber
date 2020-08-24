import AppError from '@shared/errors/AppError';
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';
import FakeUserRepository from '../repositories/Fakes/FakeUserRepository';
import UpdateUserService from './UpdateUserService';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import CreateUserService from './CreateUserService';

let fakeHashProvider: FakeHashProvider;
let fakeUserRepository: FakeUserRepository;
let updateUserService: UpdateUserService;
let fakeCacheProvider: FakeCacheProvider;
let createUserService: CreateUserService;

describe('Update profile', () => {
  beforeEach(() => {
    fakeHashProvider = new FakeHashProvider();
    fakeUserRepository = new FakeUserRepository();
    fakeCacheProvider = new FakeCacheProvider();

    updateUserService = new UpdateUserService(
      fakeUserRepository,
      fakeHashProvider,
    );
    createUserService = new CreateUserService(
      fakeUserRepository,
      fakeHashProvider,
      fakeCacheProvider,
    );
  });

  it('Shoulb be able to update the profile of an existing user', async () => {
    const newUser = await createUserService.execute({
      username: 'teste',
      password: '123456',
      email: 'luccab.souza@gmail.com',
    });

    const updatedUser = await updateUserService.execute({
      userId: newUser.id,
      name: 'teste - 2',
      email: 'luccab.souza@editado.com',
    });

    expect(updatedUser.username).toBe('teste - 2');
    expect(updatedUser.email).toBe('luccab.souza@editado.com');
  });

  it('Shoulb not be able to update the profile of non existing user', async () => {
    await expect(
      updateUserService.execute({
        userId: 'non-existing-userId',
        name: 'teste - 2',
        email: 'luccab.souza@editado.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('Should not be able to update the user profile with an e-mail that is already in use', async () => {
    await createUserService.execute({
      username: 'teste',
      password: '123456',
      email: 'luccab.souza@gmail.com',
    });

    const newUser = await createUserService.execute({
      username: 'teste2',
      password: '1234567',
      email: 'luccab.souza@teste.com',
    });

    await expect(
      updateUserService.execute({
        userId: newUser.id,
        name: 'teste3',
        email: 'luccab.souza@gmail.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('Should be able to update the password', async () => {
    const newUser = await createUserService.execute({
      username: 'teste',
      password: '123456',
      email: 'luccab.souza@gmail.com',
    });

    const updatedUser = await updateUserService.execute({
      userId: newUser.id,
      name: 'teste - 2',
      email: 'luccab.souza@editado.com',
      password: '1234567',
      oldPassword: newUser.password,
    });

    expect(updatedUser.password).toBe('1234567');
  });

  it('Should not be able to update the password without informing the old password', async () => {
    const newUser = await createUserService.execute({
      username: 'teste',
      password: '123456',
      email: 'luccab.souza@gmail.com',
    });

    await expect(
      updateUserService.execute({
        userId: newUser.id,
        name: 'teste - 2',
        email: 'luccab.souza@editado.com',
        password: '1234567',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('Should not be able to update the password when the old password is incorrect', async () => {
    const newUser = await createUserService.execute({
      username: 'teste',
      password: '123456',
      email: 'luccab.souza@gmail.com',
    });

    await expect(
      updateUserService.execute({
        userId: newUser.id,
        name: 'teste - 2',
        email: 'luccab.souza@editado.com',
        password: '1234567',
        oldPassword: 'wrongOldPassword',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
