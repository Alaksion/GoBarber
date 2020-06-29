import { startOfHour } from 'date-fns';
import { getCustomRepository } from 'typeorm';
import Appointment from '../models/Appointment';
import AppointmentsRepository from '../repositories/AppointmentsRepository';
import AppError from '../errors/AppError';

interface Request {
  date: Date;
  providerId: string;
}

class CreateAppointmentService {
  public async execute({ date, providerId }: Request): Promise<Appointment> {
    const appointmenteRepository = getCustomRepository(AppointmentsRepository);
    const AppointmentDate = startOfHour(date);
    const validate = await appointmenteRepository.findByDate(AppointmentDate);

    if (validate === null) {
      const appointment = appointmenteRepository.create({
        providerId,
        date: AppointmentDate,
      });
      await appointmenteRepository.save(appointment);

      return appointment;
    }
    throw new AppError('This appointment is already booked', 400);
  }
}
export default CreateAppointmentService;
