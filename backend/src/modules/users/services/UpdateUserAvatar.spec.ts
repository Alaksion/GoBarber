import FakeStorageProvider from '@shared/container/providers/StorageProvider/fakes/FakeStorageProvider';
import AppError from '@shared/errors/AppError';
import FakeUserRepository from '../repositories/Fakes/FakeUserRepository';
import UpdateUserAvatarService from './UpdateUserAvatar';

describe('User avatar', () => {
  it('Should be able to add an avatar do an existing user', async () => {
    const fakeUserRepository = new FakeUserRepository();
    const fakeStorage = new FakeStorageProvider();

    const newUser = await fakeUserRepository.create({
      username: 'Teste',
      email: 'teste@teste.com.br',
      password: '123456',
    });

    const AvatarSerice = new UpdateUserAvatarService(
      fakeUserRepository,
      fakeStorage,
    );

    await AvatarSerice.execute({ userId: newUser.id, filename: 'fileteste' });
    await expect(newUser.avatar).toBe('fileteste');
  });

  it('Should not be able to update the avatar of an unexisting user', async () => {
    const fakeUserRepository = new FakeUserRepository();
    const fakeStorage = new FakeStorageProvider();
    const AvatarSerice = new UpdateUserAvatarService(
      fakeUserRepository,
      fakeStorage,
    );

    await expect(
      AvatarSerice.execute({ userId: '123456', filename: 'fileteste' }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('Should be able to change the avatar of an existing user', async () => {
    const fakeUserRepository = new FakeUserRepository();
    const fakeStorage = new FakeStorageProvider();

    const deleteFileFunction = jest.spyOn(fakeStorage, 'deleteFile');

    const newUser = await fakeUserRepository.create({
      username: 'Teste',
      email: 'teste@teste.com.br',
      password: '123456',
    });

    const AvatarSerice = new UpdateUserAvatarService(
      fakeUserRepository,
      fakeStorage,
    );

    await AvatarSerice.execute({
      userId: newUser.id,
      filename: 'originalAvatar',
    });

    await AvatarSerice.execute({
      userId: newUser.id,
      filename: 'newAvatar',
    });

    await expect(deleteFileFunction).toHaveBeenLastCalledWith('originalAvatar');
    await expect(newUser.avatar).toBe('newAvatar');
  });
});
