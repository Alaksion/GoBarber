import AppError from '@shared/errors/AppError';
import FakeNotificationRepository from '@modules/notifications/repositories/fakes/fakeNotificationRepository';
import FakeAppointments from '../repositories/Fakes/FakeAppointmentsRepository';
import CreateAppointmentService from './CreateAppointmentService';

let fakeAppointmentRepository: FakeAppointments;
let createAppointmentService: CreateAppointmentService;
let fakeNotificationRepository: FakeNotificationRepository;

describe('Create Appointments', () => {
  beforeEach(() => {
    fakeAppointmentRepository = new FakeAppointments();
    fakeNotificationRepository = new FakeNotificationRepository();
    createAppointmentService = new CreateAppointmentService(
      fakeAppointmentRepository,
      fakeNotificationRepository,
    );
  });

  it('should be able to create an appointment', async () => {
    jest.spyOn(Date, 'now').mockImplementation(() => {
      return new Date(2020, 7, 11, 12).getTime();
    });

    const appointment = await createAppointmentService.execute({
      date: new Date(2020, 7, 11, 13),
      providerId: '12333213',
      userId: '12345',
    });

    expect(appointment).toHaveProperty('id');
  });

  it('should not be able to create two appointments in the same date', async () => {
    jest.spyOn(Date, 'now').mockImplementation(() => {
      return new Date(2020, 7, 11, 12).getTime();
    });

    const appointmentDate = new Date(2020, 7, 11, 13);

    await createAppointmentService.execute({
      date: appointmentDate,
      providerId: 'providerId',
      userId: 'userId',
    });

    expect(
      createAppointmentService.execute({
        date: appointmentDate,
        providerId: 'providerId',
        userId: 'userId',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('Should not be able to create an appointment in a past date', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 1, 1, 12).getTime();
    });

    await expect(
      createAppointmentService.execute({
        userId: 'userId',
        providerId: 'providerId',
        date: new Date(2020, 1, 1, 11),
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('Should not be able to create an appointment with same user as provider', async () => {
    jest.spyOn(Date, 'now').mockImplementation(() => {
      return new Date(2020, 7, 11, 11).getTime();
    });

    await expect(
      createAppointmentService.execute({
        date: new Date(2020, 7, 11, 13),
        providerId: 'userId',
        userId: 'userId',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('Should not be able to create an appointment in a non-business hour', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 7, 11, 12).getTime();
    });

    await expect(
      createAppointmentService.execute({
        providerId: 'providerId',
        userId: 'userId',
        date: new Date(2020, 7, 12, 18),
      }),
    ).rejects.toBeInstanceOf(AppError);

    await expect(
      createAppointmentService.execute({
        providerId: 'providerId',
        userId: 'userId',
        date: new Date(2020, 7, 12, 7),
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
