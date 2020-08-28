import { getDaysInMonth, isAfter } from 'date-fns';
import IAppointmentRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import { inject, injectable } from 'tsyringe';

interface Request {
  month: number;
  year: number;
  providerId: string;
}

type IResponse = Array<{
  day: number;
  available: boolean;
}>;

@injectable()
class ListProviderMonthAvailabilityService {
  constructor(
    @inject('AppointmentRepository')
    private appointmentRepository: IAppointmentRepository,
  ) {}

  public async execute(data: Request): Promise<IResponse> {
    const { month, providerId, year } = data;

    const appointments = await this.appointmentRepository.findAllInMonthFromProvider(
      {
        month,
        providerId,
        year,
      },
    );

    const numberOfDaysInMonth = getDaysInMonth(new Date(year, month - 1));
    const eachDayArray = Array.from(
      { length: numberOfDaysInMonth },
      (value, index) => index + 1,
    );
    const dayAvailability = eachDayArray.map(day => {
      const compareDate = new Date(year, month - 1, day, 23, 59, 59);

      const appoinmentsInDay = appointments.filter(
        appointment => appointment.date.getDate() === day,
      );
      return {
        day,
        available:
          appoinmentsInDay.length < 10 && isAfter(compareDate, new Date()),
      };
    });

    return dayAvailability;
  }
}
export default ListProviderMonthAvailabilityService;
