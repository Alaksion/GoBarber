import { Request, Response } from 'express';
import ListProvidersService from '@modules/appointments/services/ListProvidersService';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

class ProvidersController {
  public async index(req: Request, res: Response): Promise<Response> {
    const userId = req.user.id;
    const ListProviderService = container.resolve(ListProvidersService);
    const providers = await ListProviderService.execute({ userId });
    return res.json(classToClass(providers));
  }
}

export default ProvidersController;
