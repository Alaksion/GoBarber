import IAppointmentRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';
import { inject, injectable } from 'tsyringe';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';

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
    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute(data: Request): Promise<Array<Appointment>> {
    const { month, providerId, year, day } = data;
    const cacheKey = `provider-appointments:${providerId}:${year}-${month}-${day}`;

    let appointments = await this.cacheProvider.recover<Appointment[]>(
      cacheKey,
    );

    if (!appointments) {
      appointments = await this.appointmentRepository.findAllinDayFromProvider({
        day,
        month,
        providerId,
        year,
      });
      await this.cacheProvider.save(cacheKey, appointments);
    }

    return appointments;
  }
}
export default ListProviderAppointmentsService;
