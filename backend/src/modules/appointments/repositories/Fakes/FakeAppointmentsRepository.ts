import { uuid } from 'uuidv4';
import { isEqual } from 'date-fns';
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
  }: CreateAppointmentDTO): Promise<Appointment> {
    const newAppointment = new Appointment();

    newAppointment.id = uuid();
    newAppointment.date = date;
    newAppointment.providerId = providerId;

    this.appointments.push(newAppointment);
    return newAppointment;
  }
}

export default AppointmentsRepository;
