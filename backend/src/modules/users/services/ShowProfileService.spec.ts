import 'reflect-metadata';
import ShowProfileService from '@modules/users/services/ShowProfileService';
import FakeUser from '@modules/users/repositories/Fakes/FakeUserRepository';
import AppError from '@shared/errors/AppError';

let fakeUserRepository: FakeUser;
let showProfileService: ShowProfileService;

describe('UserAuthentication', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUser();
    showProfileService = new ShowProfileService(fakeUserRepository);
  });

  it('Should be able to find an existing user profile', async () => {
    const newUser = await fakeUserRepository.create({
      username: 'Lucca',
      password: '123456',
      email: 'luccab.souza@gmail.com',
    });

    const profile = await showProfileService.execute({ userId: newUser.id });

    expect(profile).toHaveProperty('id');
    expect(profile.username).toBe('Lucca');
    expect(profile.email).toBe('luccab.souza@gmail.com');
  });

  it('Should not be able to find a non-existing user profile', async () => {
    await expect(
      showProfileService.execute({ userId: 'non-existing-id' }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
