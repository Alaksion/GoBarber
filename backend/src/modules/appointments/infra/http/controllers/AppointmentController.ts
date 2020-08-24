import { Request, Response } from 'express';
import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService';
import { container } from 'tsyringe';

class AppointmentController {
  public async create(req: Request, res: Response): Promise<Response> {
    const userId = req.user.id;
    const { providerId, date } = req.body;
    const CreateAppointment = container.resolve(CreateAppointmentService);
    const appointment = await CreateAppointment.execute({
      providerId,
      date,
      userId,
    });
    return res.json(appointment);
  }
}

export default AppointmentController;
