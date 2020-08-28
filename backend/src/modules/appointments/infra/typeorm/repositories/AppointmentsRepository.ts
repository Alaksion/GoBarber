import { getRepository, Repository, Raw } from 'typeorm';

import IAppointmentRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';
import CreateAppointmentDTO from '@modules/appointments/dtos/ICreateAppointmentDTO';
import FindAllByMonthNProviderDTO from '@modules/appointments/dtos/IFindAllByMonth&ProviderDTO';
import FindAllByDayNProviderDTO from '@modules/appointments/dtos/IFindAllByDay&ProviderDTO';

class AppointmentsRepository implements IAppointmentRepository {
  private ormRepository: Repository<Appointment>;

  constructor() {
    this.ormRepository = getRepository(Appointment);
  }

  public async findByDate(
    date: Date,
    providerId: string,
  ): Promise<Appointment | undefined> {
    const findAppointment = await this.ormRepository.findOne({
      where: { date, providerId },
    });
    return findAppointment || undefined;
  }

  public async create({
    providerId,
    date,
    userId,
  }: CreateAppointmentDTO): Promise<Appointment> {
    const appointment = this.ormRepository.create({ providerId, date, userId });
    await this.ormRepository.save(appointment);
    return appointment;
  }

  public async findAll(userId: string): Promise<Array<Appointment>> {
    const appointments = this.ormRepository.find({ where: { id: userId } });
    return appointments;
  }

  public async findAllInMonthFromProvider(
    data: FindAllByMonthNProviderDTO,
  ): Promise<Array<Appointment>> {
    //
    //
    const parsedMonth = data.month > 10 ? `0${data.month}` : String(data.month);

    const appointments = await this.ormRepository.find({
      where: {
        providerId: data.providerId,
        date: Raw(
          dateFieldName =>
            `to_char(${dateFieldName}, 'MM-YYYY') = '${parsedMonth}-${data.year}'`,
        ),
      },
    });

    return appointments;
  }

  public async findAllinDayFromProvider(
    data: FindAllByDayNProviderDTO,
  ): Promise<Array<Appointment>> {
    //
    //
    const parsedMonth = data.month < 10 ? `0${data.month}` : String(data.month);
    const parsedDay = data.day < 10 ? `0${data.day}` : data.day;

    const appointments = await this.ormRepository.find({
      where: {
        providerId: data.providerId,
        date: Raw(
          dateFieldName =>
            `to_char(${dateFieldName}, 'DD-MM-YYYY') = '${parsedDay}-${parsedMonth}-${data.year}'`,
        ),
      },
      relations: ['user'],
    });

    return appointments;
  }
}

export default AppointmentsRepository;
