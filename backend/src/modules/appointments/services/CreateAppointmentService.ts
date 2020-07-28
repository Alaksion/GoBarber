import { startOfHour } from 'date-fns';
import AppError from '@shared/errors/AppError';
import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';
import IAppointmentRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import { inject, injectable } from 'tsyringe';

interface Request {
  date: Date;
  providerId: string;
}
@injectable()
class CreateAppointmentService {
  constructor(
    @inject('AppointmentRepository')
    private appointmentRepository: IAppointmentRepository,
  ) {}

  public async execute({ date, providerId }: Request): Promise<Appointment> {
    const AppointmentDate = startOfHour(date);
    const validate = await this.appointmentRepository.findByDate(
      AppointmentDate,
    );

    if (validate === null) {
      const appointment = await this.appointmentRepository.create({
        providerId,
        date: AppointmentDate,
      });

      return appointment;
    }
    throw new AppError('This appointment is already booked', 400);
  }
}
export default CreateAppointmentService;
