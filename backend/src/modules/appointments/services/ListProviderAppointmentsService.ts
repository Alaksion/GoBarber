import IAppointmentRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';
import { inject, injectable } from 'tsyringe';

interface Request {
  day: number;
  month: number;
  year: number;
  providerId: string;
}

@injectable()
class ListProviderAppointmentsService {
  constructor(
    @inject('AppointmentRepository')
    private appointmentRepository: IAppointmentRepository,
  ) {}

  public async execute(data: Request): Promise<Array<Appointment>> {
    const { month, providerId, year, day } = data;
    const appointments = await this.appointmentRepository.findAllinDayFromProvider(
      { day, month, providerId, year },
    );
    return appointments;
  }
}
export default ListProviderAppointmentsService;
