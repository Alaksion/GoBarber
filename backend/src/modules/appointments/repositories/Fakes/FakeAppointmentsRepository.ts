import { uuid } from 'uuidv4';
import { isEqual } from 'date-fns';
import FindAllByMonthNProviderDTO from '@modules/appointments/dtos/IFindAllByMonth&ProviderDTO';
import FindAllByDayNProviderDTO from '@modules/appointments/dtos/IFindAllByDay&ProviderDTO';
import Appointment from '../../infra/typeorm/entities/Appointment';
import CreateAppointmentDTO from '../../dtos/ICreateAppointmentDTO';
import IAppointmentRepository from '../IAppointmentsRepository';

class AppointmentsRepository implements IAppointmentRepository {
  private appointments: Array<Appointment> = [];

  public async findByDate(date: Date): Promise<Appointment | undefined> {
    const findAppoint = this.appointments.find(appointment =>
      isEqual(date, appointment.date),
    );
    return findAppoint || undefined;
  }

  public async create({
    providerId,
    date,
    userId,
  }: CreateAppointmentDTO): Promise<Appointment> {
    const newAppointment = new Appointment();

    newAppointment.id = uuid();
    newAppointment.date = date;
    newAppointment.providerId = providerId;
    newAppointment.userId = userId;

    this.appointments.push(newAppointment);
    return newAppointment;
  }

  public async findAllInMonthFromProvider(
    data: FindAllByMonthNProviderDTO,
  ): Promise<Array<Appointment>> {
    const filteredAppointments = this.appointments.filter(
      appointment =>
        appointment.date.getMonth() + 1 === data.month &&
        appointment.date.getFullYear() === data.year &&
        appointment.providerId === data.providerId,
    );

    return filteredAppointments;
  }

  public async findAllinDayFromProvider(
    data: FindAllByDayNProviderDTO,
  ): Promise<Array<Appointment>> {
    const filteredAppointments = this.appointments.filter(
      appointment =>
        appointment.date.getMonth() + 1 === data.month &&
        appointment.date.getFullYear() === data.year &&
        appointment.providerId === data.providerId &&
        appointment.date.getDate() === data.day,
    );

    return filteredAppointments;
  }
}

export default AppointmentsRepository;
