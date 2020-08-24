import { startOfHour, isBefore, format } from 'date-fns';
import AppError from '@shared/errors/AppError';
import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';
import IAppointmentRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import { inject, injectable } from 'tsyringe';
import INotificationsRepository from '@modules/notifications/repositories/INotificationsRepository';
import CacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';

interface Request {
  date: Date;
  providerId: string;
  userId: string;
}
@injectable()
class CreateAppointmentService {
  constructor(
    @inject('AppointmentRepository')
    private appointmentRepository: IAppointmentRepository,
    @inject('notificationRepository')
    private notificationRepository: INotificationsRepository,
    @inject('CacheProvider')
    private cacheProvider: CacheProvider,
  ) {}

  public async execute({
    date,
    providerId,
    userId,
  }: Request): Promise<Appointment> {
    const AppointmentDate = startOfHour(date);

    const findAppointmentWithSameDate = await this.appointmentRepository.findByDate(
      AppointmentDate,
    );

    if (providerId === userId) {
      throw new AppError('Cannot create appointment with youserlf', 401);
    }

    if (date.getHours() < 8 || date.getHours() > 17) {
      throw new AppError(
        'Cannot create an appointment before 8:00am or after 17:pm',
      );
    }
    if (isBefore(AppointmentDate, Date.now())) {
      throw new AppError('Cannot create an appointment on a past date', 401);
    }
    console.log(userId);
    if (!findAppointmentWithSameDate) {
      const appointment = await this.appointmentRepository.create({
        providerId,
        date: AppointmentDate,
        userId,
      });

      const formatDate = format(appointment.date, "dd-MM-yyyy 'às' HH:mm'h'");

      await this.notificationRepository.create({
        recipientId: providerId,
        content: `Novo agendamento marcado! Horário do atendimento: ${formatDate}`,
      });

      await this.cacheProvider.invalidate(
        `provider-appointments:${providerId}:${format(date, 'yyyy-M-d')}`,
      );

      return appointment;
    }
    throw new AppError('This appointment is already booked', 400);
  }
}
export default CreateAppointmentService;
