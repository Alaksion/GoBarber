import FakeAppointments from '@modules/appointments/repositories/Fakes/FakeAppointmentsRepository';

import ListProviderDayAvailaibility from './ListProviderDayAvailabilityService';

let fakeAppointmentsRepository: FakeAppointments;
let listProviderDayAvailability: ListProviderDayAvailaibility;

describe('listProviderMonthAvailability', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointments();
    listProviderDayAvailability = new ListProviderDayAvailaibility(
      fakeAppointmentsRepository,
    );
  });

  it('It should be able to list the day availability from provider', async () => {
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

    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 7, 20, 11, 0, 0).getTime();
    });

    const MonthAvailability = await listProviderDayAvailability.execute({
      providerId: '1234',
      month: 8,
      year: 2020,
      day: 20,
    });

    expect(MonthAvailability).toEqual(
      expect.arrayContaining([
        { hour: 10, available: false },
        { hour: 11, available: true },
        { hour: 14, available: false },
        { hour: 15, available: false },
      ]),
    );
  });
});
