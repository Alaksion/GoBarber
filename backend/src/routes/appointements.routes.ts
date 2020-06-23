import { Router } from 'express';
import AppointmentRepository from '../repositories/AppointmentsRepository'
import {parseISO } from 'date-fns'
import CreateAppointmentService from '../services/CreateAppointmentService'


const AppointmentRouter = Router();
const AppointmentFunctions = new AppointmentRepository


AppointmentRouter.post("/", (req, res) => {
    try{
        const { provider, date } = req.body
        const parsedDate = parseISO(date)
        const CreateAppointment = new CreateAppointmentService (AppointmentFunctions)
        const appointment = CreateAppointment.execute({
            provider: provider,
            date: parsedDate
        })
        return res.json(appointment)
    } catch(err){
        return res.status(400).json({error: err.message})
    }
})

AppointmentRouter.get("/", (req, res) => {
    const appointments = AppointmentFunctions.listAppointments()

    if (appointments.length === 0) {
        return res.status(400).json({ msg: "No appointments booked" })
    }
    return res.json(appointments)
})

export default AppointmentRouter;
