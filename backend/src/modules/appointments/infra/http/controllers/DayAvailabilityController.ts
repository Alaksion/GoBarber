import { Request, Response } from 'express';
import DaiAvailabilityService from '@modules/appointments/services/ListProviderDayAvailabilityService';
import { container } from 'tsyringe';

class DayAvailabilityController {
  public async index(req: Request, res: Response): Promise<Response> {
    const dayAvailabilityService = container.resolve(DaiAvailabilityService);
    const providerId = req.params.id;
    const { day, month, year } = req.query;
    const dayAvailability = await dayAvailabilityService.execute({
      providerId,
      month: Number(month),
      year: Number(year),
      day: Number(day),
    });
    return res.json(dayAvailability);
  }
}

export default DayAvailabilityController;
