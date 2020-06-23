import {uuid} from 'uuidv4'

class Appointment{
    provider : string;
    id: string;
    date: Date;

    constructor({provider, date} : Omit<Appointment, 'id'>){
        this.provider = provider,
        this.date = date
        this.id = uuid()
    }

}

export default Appointment
