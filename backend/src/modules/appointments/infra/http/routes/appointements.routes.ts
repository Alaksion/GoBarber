import { Router } from 'express';
import Authenticate from '@shared/infra/http/middlewares/Authenticate';
import AppointmentController from '@modules/appointments/infra/http/controllers/AppointmentController';

const AppointmentRouter = Router();
AppointmentRouter.use(Authenticate);
const AppointmentsController = new AppointmentController();

/**
AppointmentRouter.get('/', Authenticate, async (req, res) => {
  const appointments = await appointmentsRepository.find();
  return res.json(appointments);
});

 */
AppointmentRouter.post('/', AppointmentsController.create);

export default AppointmentRouter;
