import { startOfHour, isBefore } from 'date-fns';
import AppError from '@shared/errors/AppError';
import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';
import IAppointmentRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import { inject, injectable } from 'tsyringe';

interface Request {
  date: Date;
  providerId: string;
  userId: string;
}
@injectable()
class CreateAppointmentService {
  constructor(
    @inject('AppointmentRepository')
    private appointmentRepository: IAppointmentRepository,
  ) {}

  public async execute({
    date,
    providerId,
    userId,
  }: Request): Promise<Appointment> {
    const AppointmentDate = startOfHour(date);

    const findAppointmentWithSameDate = await this.appointmentRepository.findByDate(
      AppointmentDate,
    );

    if (providerId === userId) {
      throw new AppError('Cannot create appointment with youserlf', 401);
    }

    if (date.getHours() < 8 || date.getHours() > 17) {
      throw new AppError(
        'Cannot create an appointment before 8:00am or after 17:pm',
      );
    }
    if (isBefore(AppointmentDate, Date.now())) {
      throw new AppError('Cannot create an appointment on a past date', 401);
    }
    if (!findAppointmentWithSameDate) {
      const appointment = await this.appointmentRepository.create({
        providerId,
        date: AppointmentDate,
        userId,
      });

      return appointment;
    }
    throw new AppError('This appointment is already booked', 400);
  }
}
export default CreateAppointmentService;
