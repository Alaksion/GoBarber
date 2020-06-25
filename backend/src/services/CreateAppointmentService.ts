import { startOfHour } from 'date-fns';
import Appointment from '../models/Appointment';
import AppointmentsRepository from '../repositories/AppointmentsRepository';

interface Request {
  date: Date;
  provider: string;
}

class CreateAppointmentService {
  private appointmenteRepository: AppointmentsRepository;

  constructor(AppointmentsRepository: AppointmentsRepository) {
    this.appointmenteRepository = AppointmentsRepository;
  }

  public execute({ date, provider }: Request): Appointment {
    const AppointmentDate = startOfHour(date);
    const validate = this.appointmenteRepository.findByDate(AppointmentDate);

    if (validate === null) {
      const appointment = this.appointmenteRepository.create({
        provider,
        date: AppointmentDate,
      });
      return appointment;
    }
    throw Error('This appointment is already booked');
  }
}
export default CreateAppointmentService;
