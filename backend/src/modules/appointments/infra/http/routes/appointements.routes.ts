import { Router } from 'express';
import Authenticate from '@shared/infra/http/middlewares/Authenticate';
import AppointmentController from '@modules/appointments/infra/http/controllers/AppointmentController';
import { celebrate, Segments, Joi } from 'celebrate';
import ProviderAppointmentsController from '../controllers/ProviderAppointmentsController';

const AppointmentRouter = Router();
AppointmentRouter.use(Authenticate);
const AppointmentsController = new AppointmentController();
const providerAppointmentsController = new ProviderAppointmentsController();

/**
AppointmentRouter.get('/', Authenticate, async (req, res) => {
  const appointments = await appointmentsRepository.find();
  return res.json(appointments);
});

 */
AppointmentRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      providerId: Joi.string().uuid().required(),
      date: Joi.date(),
    },
  }),
  AppointmentsController.create,
);

AppointmentRouter.get('/me', providerAppointmentsController.index);

export default AppointmentRouter;
