import FakeAppointments from '../repositories/Fakes/FakeAppointmentsRepository';
import ListProviderAppointmentsService from './ListProviderAppointmentsService';

let fakeAppointmentRepository: FakeAppointments;
let listProviderAppointmentsService: ListProviderAppointmentsService;

describe('Create Appointments', () => {
  beforeEach(() => {
    fakeAppointmentRepository = new FakeAppointments();
    listProviderAppointmentsService = new ListProviderAppointmentsService(
      fakeAppointmentRepository,
    );
  });

  it('should be able to list all appointment for a provider in a certain date', async () => {
    const appointment1 = await fakeAppointmentRepository.create({
      date: new Date(2020, 7, 10, 11),
      providerId: 'providerId',
      userId: 'UserId',
    });

    const appointment2 = await fakeAppointmentRepository.create({
      date: new Date(2020, 7, 10, 12),
      providerId: 'providerId',
      userId: 'UserId',
    });

    const appointment3 = await fakeAppointmentRepository.create({
      date: new Date(2020, 7, 10, 13),
      providerId: 'providerId',
      userId: 'UserId',
    });

    const appointments = await listProviderAppointmentsService.execute({
      day: 10,
      month: 8,
      year: 2020,
      providerId: 'providerId',
    });

    expect(appointments).toEqual([appointment1, appointment2, appointment3]);
  });
});
