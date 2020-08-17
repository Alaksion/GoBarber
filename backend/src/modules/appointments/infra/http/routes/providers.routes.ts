import { Router } from 'express';
import Authenticate from '@shared/infra/http/middlewares/Authenticate';
import ProvidersController from '@modules/appointments/infra/http/controllers/ProvidersController';
import { celebrate, Segments, Joi } from 'celebrate';
import DayAvailabilityController from '../controllers/DayAvailabilityController';
import MonthAvailabilityController from '../controllers/MonthAvailabilityController';

const ProviderRouter = Router();
const ProviderController = new ProvidersController();
const dayAvailabilityController = new DayAvailabilityController();
const monthAvailabilityController = new MonthAvailabilityController();

ProviderRouter.use(Authenticate);

ProviderRouter.get('/', ProviderController.index);

ProviderRouter.get(
  '/:id/month',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  monthAvailabilityController.index,
);
ProviderRouter.get(
  '/:id/day',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  dayAvailabilityController.index,
);

export default ProviderRouter;
