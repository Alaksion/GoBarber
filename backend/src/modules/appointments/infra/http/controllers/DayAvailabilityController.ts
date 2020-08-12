import { Request, Response } from 'express';
import DaiAvailabilityService from '@modules/appointments/services/ListProviderDayAvailabilityService';
import { container } from 'tsyringe';

class DayAvailabilityController {
  public async index(req: Request, res: Response): Promise<Response> {
    const dayAvailabilityService = container.resolve(DaiAvailabilityService);
    const providerId = req.params.id;
    const { day, month, year } = req.body;
    const dayAvailability = await dayAvailabilityService.execute({
      providerId,
      month,
      year,
      day,
    });
    return res.json(dayAvailability);
  }
}

export default DayAvailabilityController;
