import { Request, Response } from 'express';
import ListProviderAppointmentsService from 'modules/appointments/services/ListProviderAppointmentsService';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

class ProviderAppointmentsController {
  public async index(req: Request, res: Response): Promise<Response> {
    const { day, month, year } = req.query;
    const providerId = req.user.id;
    const providerAppointmentsService = container.resolve(
      ListProviderAppointmentsService,
    );
    const appointments = await providerAppointmentsService.execute({
      month: Number(month),
      day: Number(day),
      year: Number(year),
      providerId,
    });
    return res.json(classToClass(appointments));
  }
}

export default ProviderAppointmentsController;
