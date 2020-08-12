import { Request, Response } from 'express';
import MonthAvailabilityService from '@modules/appointments/services/ListProviderMonthAvailabilityService';
import { container } from 'tsyringe';

class DayAvailabilityController {
  public async index(req: Request, res: Response): Promise<Response> {
    const monthAvailabilityService = container.resolve(
      MonthAvailabilityService,
    );
    const { month, year } = req.body;
    const providerId = req.params.id;
    const monthAvailability = await monthAvailabilityService.execute({
      providerId,
      month,
      year,
    });
    return res.json(monthAvailability);
  }
}

export default DayAvailabilityController;
