import FakeUsers from '@modules/users/repositories/Fakes/FakeUserRepository';
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';
import ListProviderService from './ListProvidersService';

let fakeUserRepository: FakeUsers;
let listProviderService: ListProviderService;
let fakeCacheProvider: FakeCacheProvider;

describe('List all providers', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUsers();
    fakeCacheProvider = new FakeCacheProvider();
    listProviderService = new ListProviderService(
      fakeUserRepository,
      fakeCacheProvider,
    );
  });

  it('Should be able to list all providers except for the logged one', async () => {
    const user1 = await fakeUserRepository.create({
      email: 'teste1@teste.com',
      password: '123456',
      username: 'teste1',
    });

    const user2 = await fakeUserRepository.create({
      email: 'teste2@teste.com',
      password: '123456',
      username: 'teste2',
    });

    const loggedUser = await fakeUserRepository.create({
      email: 'logged@teste.com',
      password: '123456',
      username: 'logged',
    });

    const fetchUsers = await listProviderService.execute({
      userId: loggedUser.id,
    });
    expect(fetchUsers).toHaveLength(2);
    expect(fetchUsers).toEqual([user1, user2]);
  });
});
