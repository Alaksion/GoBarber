import { startOfHour } from 'date-fns';
import { getCustomRepository } from 'typeorm';
import Appointment from '../models/Appointment';
import AppointmentsRepository from '../repositories/AppointmentsRepository';

interface Request {
  date: Date;
  provider: string;
}

class CreateAppointmentService {
  public async execute({ date, provider }: Request): Promise<Appointment> {
    const appointmenteRepository = getCustomRepository(AppointmentsRepository);
    const AppointmentDate = startOfHour(date);
    const validate = await appointmenteRepository.findByDate(AppointmentDate);

    if (validate === null) {
      const appointment = appointmenteRepository.create({
        provider,
        date: AppointmentDate,
      });
      await appointmenteRepository.save(appointment);

      return appointment;
    }
    throw Error('This appointment is already booked');
  }
}
export default CreateAppointmentService;
