import { Request, Response } from 'express';
import { parseISO } from 'date-fns';
import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService';
import { container } from 'tsyringe';

class AppointmentController {
  public async create(req: Request, res: Response): Promise<Response> {
    const userId = req.user.id;
    const { providerId, date } = req.body;
    const parsedDate = parseISO(date);
    const CreateAppointment = container.resolve(CreateAppointmentService);
    const appointment = await CreateAppointment.execute({
      providerId,
      date: parsedDate,
      userId,
    });
    return res.json(appointment);
  }
}

export default AppointmentController;
