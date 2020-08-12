import { Router } from 'express';
import DayAvailabilityController from '../controllers/DayAvailabilityController';
import MonthAvailabilityController from '../controllers/MonthAvailabilityController';

const dateAvailabilityRouter = Router();
const dayAvailabilityController = new DayAvailabilityController();
const monthAvailabilityController = new MonthAvailabilityController();

dateAvailabilityRouter.get('/day', dayAvailabilityController.index);
dateAvailabilityRouter.get('/month', monthAvailabilityController.index);

export default dateAvailabilityRouter;
