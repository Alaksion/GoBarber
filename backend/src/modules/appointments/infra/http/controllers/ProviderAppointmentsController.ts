import { Request, Response } from 'express';
import ListProviderAppointmentsService from 'modules/appointments/services/ListProviderAppointmentsService';
import { container } from 'tsyringe';

class ProviderAppointmentsController {
  public async index(req: Request, res: Response): Promise<Response> {
    const { day, month, year } = req.body;
    const providerId = req.user.id;
    const providerAppointmentsService = container.resolve(
      ListProviderAppointmentsService,
    );
    const appointments = await providerAppointmentsService.execute({
      month,
      day,
      year,
      providerId,
    });
    return res.json(appointments);
  }
}

export default ProviderAppointmentsController;
