import { Router } from 'express';
import Authenticate from '@shared/infra/http/middlewares/Authenticate';
import ProvidersController from '@modules/appointments/infra/http/controllers/ProvidersController';
import DayAvailabilityController from '../controllers/DayAvailabilityController';
import MonthAvailabilityController from '../controllers/MonthAvailabilityController';

const ProviderRouter = Router();
const ProviderController = new ProvidersController();
const dayAvailabilityController = new DayAvailabilityController();
const monthAvailabilityController = new MonthAvailabilityController();

ProviderRouter.use(Authenticate);

ProviderRouter.get('/', ProviderController.index);

ProviderRouter.get('/:id/month', monthAvailabilityController.index);
ProviderRouter.get('/:id/day', dayAvailabilityController.index);

export default ProviderRouter;
