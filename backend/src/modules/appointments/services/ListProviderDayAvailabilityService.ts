import { isAfter, isEqual } from 'date-fns';
import IAppointmentRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import { inject, injectable } from 'tsyringe';

interface Request {
  month: number;
  year: number;
  day: number;
  providerId: string;
}

type IResponse = Array<{
  hour: number;
  available: boolean;
}>;

@injectable()
class ListProviderDayAvailabilityService {
  constructor(
    @inject('AppointmentRepository')
    private appointmentRepository: IAppointmentRepository,
  ) {}

  public async execute(data: Request): Promise<IResponse> {
    const { month, providerId, year, day } = data;
    let dateValidate: boolean;

    const appointments = await this.appointmentRepository.findAllinDayFromProvider(
      {
        month,
        providerId,
        year,
        day,
      },
    );

    const startHour = 8;
    const currentDate = new Date(Date.now());
    const eachHourArray = Array.from(
      { length: 10 },
      (value, index) => index + startHour,
    );
    const hourAvailability = eachHourArray.map(hour => {
      const appointmentInHour = appointments.find(
        appointment => appointment.date.getHours() === hour,
      );

      const compareDate = new Date(year, month - 1, day, hour);

      dateValidate = isAfter(compareDate, currentDate);
      if (isEqual(compareDate, currentDate)) {
        dateValidate = true;
      }
      return {
        hour,
        available: !appointmentInHour && dateValidate,
      };
    });

    return hourAvailability;
  }
}
export default ListProviderDayAvailabilityService;
