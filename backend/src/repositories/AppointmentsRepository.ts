import Appointment from '../models/Appointment'
import { isEqual } from 'date-fns'


interface CreateAppointmentDTO {
    provider: string;
    date: Date;
}

class AppointmentsRepository {

    private appointments: Appointment[]

    constructor() {
        this.appointments = []
    }

    public create({ provider, date }: CreateAppointmentDTO): Appointment {
        const newAppointment = new Appointment({
            date: date,
            provider: provider
        })

        this.appointments.push(newAppointment)

        return newAppointment
    }

    public findByDate(date: Date): Appointment | null {
        const appointmentindex = this.appointments.findIndex(appointment => isEqual(appointment.date, date))
        const result = this.appointments[appointmentindex]
        if (appointmentindex === -1) {
            return null
        }
        return result
    }

    public listAppointments(): Array<Appointment> {
        return this.appointments

    }
}

export default AppointmentsRepository
