import AppError from '@shared/errors/AppError';
import FakeAppointments from '../repositories/Fakes/FakeAppointmentsRepository';
import CreateAppointmentService from './CreateAppointmentService';

describe('Create Appointments', () => {
  it('should be able to create an appointment', async () => {
    const fakeRepository = new FakeAppointments();
    const CreateAppointment = new CreateAppointmentService(fakeRepository);
    const appointment = await CreateAppointment.execute({
      date: new Date(),
      providerId: '12333213',
    });

    expect(appointment).toHaveProperty('id');
  });

  it('should not be able to create two appointments in the same date', async () => {
    const fakeRepository = new FakeAppointments();
    const CreateAppointment = new CreateAppointmentService(fakeRepository);
    const appointmentDate = new Date(2020, 4, 20, 11);

    const appointment = await CreateAppointment.execute({
      date: appointmentDate,
      providerId: '12333213',
    });

    expect(
      CreateAppointment.execute({
        date: appointmentDate,
        providerId: '12333213',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
