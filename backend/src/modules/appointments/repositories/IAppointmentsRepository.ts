import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';
import CreateAppointmentDTO from '@modules/appointments/dtos/ICreateAppointmentDTO';
import FindAllByMonthNProviderDTO from '@modules/appointments/dtos/IFindAllByMonth&ProviderDTO';
import FindAllByDayNProviderDTO from '@modules/appointments/dtos/IFindAllByDay&ProviderDTO';

export default interface IAppointmentsRepository {
  findByDate(date: Date, providerId: string): Promise<Appointment | undefined>;
  create(data: CreateAppointmentDTO): Promise<Appointment>;
  findAllInMonthFromProvider(
    data: FindAllByMonthNProviderDTO,
  ): Promise<Array<Appointment>>;
  findAllinDayFromProvider(
    data: FindAllByDayNProviderDTO,
  ): Promise<Array<Appointment>>;
}
