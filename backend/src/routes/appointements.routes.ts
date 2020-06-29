import { Router } from 'express';
import { parseISO } from 'date-fns';
import { getCustomRepository } from 'typeorm';
import CreateAppointmentService from '../services/CreateAppointmentService';
import AppointmentsRepository from '../repositories/AppointmentsRepository';
import Authenticate from '../middlewares/Authenticate';

const AppointmentRouter = Router();

AppointmentRouter.post('/', Authenticate, async (req, res) => {
  const { providerId, date } = req.body;
  const parsedDate = parseISO(date);
  const CreateAppointment = new CreateAppointmentService();
  const appointment = await CreateAppointment.execute({
    providerId,
    date: parsedDate,
  });
  return res.json(appointment);
});

AppointmentRouter.get('/', Authenticate, async (req, res) => {
  const appointmentRepository = getCustomRepository(AppointmentsRepository);
  const appointments = await appointmentRepository.find();
  return res.json(appointments);
});

export default AppointmentRouter;
