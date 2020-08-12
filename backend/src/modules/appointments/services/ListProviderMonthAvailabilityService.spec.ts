import FakeAppointments from '@modules/appointments/repositories/Fakes/FakeAppointmentsRepository';

import ListProviderMonthAvailability from './ListProviderMonthAvailabilityService';

let fakeAppointmentsRepository: FakeAppointments;
let listProviderMonthAvailability: ListProviderMonthAvailability;

describe('listProviderMonthAvailability', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointments();
    listProviderMonthAvailability = new ListProviderMonthAvailability(
      fakeAppointmentsRepository,
    );
  });

  it('It should be able to list the month availability from provider', async () => {
    await fakeAppointmentsRepository.create({
      date: new Date(2020, 7, 20, 8, 0, 0),
      providerId: '1234',
      userId: '12345',
    });

    await fakeAppointmentsRepository.create({
      date: new Date(2020, 7, 20, 9, 0, 0),
      providerId: '1234',
      userId: '12345',
    });

    await fakeAppointmentsRepository.create({
      date: new Date(2020, 7, 20, 10, 0, 0),
      providerId: '1234',
      userId: '12345',
    });

    await fakeAppointmentsRepository.create({
      date: new Date(2020, 7, 20, 11, 0, 0),
      providerId: '1234',
      userId: '12345',
    });

    await fakeAppointmentsRepository.create({
      date: new Date(2020, 7, 20, 12, 0, 0),
      providerId: '1234',
      userId: '12345',
    });

    await fakeAppointmentsRepository.create({
      date: new Date(2020, 7, 20, 13, 0, 0),
      providerId: '1234',
      userId: '12345',
    });

    await fakeAppointmentsRepository.create({
      date: new Date(2020, 7, 20, 14, 0, 0),
      providerId: '1234',
      userId: '12345',
    });

    await fakeAppointmentsRepository.create({
      date: new Date(2020, 7, 20, 15, 0, 0),
      providerId: '1234',
      userId: '12345',
    });

    await fakeAppointmentsRepository.create({
      date: new Date(2020, 7, 20, 16, 0, 0),
      providerId: '1234',
      userId: '12345',
    });
    await fakeAppointmentsRepository.create({
      date: new Date(2020, 7, 20, 17, 0, 0),
      providerId: '1234',
      userId: '12345',
    });

    const MonthAvailability = await listProviderMonthAvailability.execute({
      providerId: '1234',
      month: 8,
      year: 2020,
    });

    expect(MonthAvailability).toEqual(
      expect.arrayContaining([
        { day: 19, available: true },
        { day: 20, available: false },
        { day: 21, available: true },
        { day: 22, available: true },
        { day: 23, available: true },
      ]),
    );
  });
});
