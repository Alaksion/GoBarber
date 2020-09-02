import React, { useState, useCallback, useEffect, useMemo } from 'react'
import {NextAppointment, Container, Header, HeaderContent, Profile, Calendar, Content, Schedule, Section, Appointment} from './styles'
import {FiPower, FiClock} from 'react-icons/fi'
import logo from '../../assets/logo.svg'
import { useAuth } from '../../hooks/AuthContext'
import DayPicker, {DayModifiers} from 'react-day-picker'
import 'react-day-picker/lib/style.css'
import api from '../../services/api'
import ptBR from 'date-fns/locale/pt-BR'
import { isToday, format, parseISO } from 'date-fns'

interface appointmentItem {
  user:{
    avatarUrl: string,
    username: string,
  },
  formattedDate: string; // hour field extracted from the appointment date field.
  date: string;
  id:string;
}

interface monthAvailabilityItem{
  day:number,
  available: boolean
}

const DashBoard: React.FC = () =>{
  const [appointments, setAppointments] = useState<appointmentItem[]>([])
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [selectedMonth, setSelectedMonth] = useState(new Date())
  const [monthAvailability, setMonthAvailability] = useState<monthAvailabilityItem[]>([])
  const {signOut, user} = useAuth()

  const handleDateChange = useCallback((day:Date, modifiers: DayModifiers)=>{
    if(modifiers.available){
      setSelectedDate(day)
    }
  }, [])

  const handleMonthChange = useCallback((month: Date)=>{
    setSelectedMonth(month)
  }, [])

  useEffect(()=>{
    api.get(`providers/${user.id}/month`, {
      params: {
        month: selectedMonth.getMonth() + 1,
        year: selectedMonth.getFullYear()
      }
    }).then(response=> {
      setMonthAvailability(response.data)
    })
  }, [selectedMonth, user.id])

  useEffect(()=>{
    api.get<appointmentItem[]>("appointments/me", {
      params:{
        month: selectedMonth.getMonth() + 1,
        year: selectedMonth.getFullYear(),
        day: selectedDate.getDate()
      }
    }).then(response=>{
      const formattedAppointments = response.data.map(appointment=> {
        return {
          ... appointment,
          formattedDate: format(parseISO(appointment.date), 'HH:mm')
        }
      })
      setAppointments(formattedAppointments)
    })
  }, [selectedDate, selectedMonth])

  const disabledDays = useMemo(()=>{
    const dates = monthAvailability.filter(day=> day.available === false)
      .map(day => {
        const year = selectedMonth.getFullYear()
        const month = selectedMonth.getMonth()
        const date = new Date(year, month, day.day)
        return date
    })
    return dates
  }, [selectedMonth, monthAvailability])

  const selectedDateAsText = useMemo(()=> {
    return format(selectedDate, "'Dia' dd 'de' MMMM", {locale: ptBR})
  }, [selectedDate])

  const selectedDateDayOfTheWeek = useMemo(()=>{
    const day = format(selectedDate, 'cccc', {locale: ptBR})
    return day.charAt(0).toUpperCase() + day.substring(1) + "-Feira"
    }, [selectedDate])

  const morningAppointments = useMemo(()=>{
    const morning = appointments.filter(appointment => {
      const parsedDate = new Date(Date.parse(appointment.date))
      return parsedDate.getHours() < 12
    })
    return morning
  }, [appointments])

  const afternoonAppointments = useMemo(()=>{
    const afternoon = appointments.filter(appointment => {
      const parsedDate = new Date(Date.parse(appointment.date))
      return parsedDate.getHours() >= 12
    })
    return afternoon
  }, [appointments])

  return(
    <Container>
      <Header>
        <HeaderContent>
          <img src={logo} alt='goBarber'></img>

          <Profile>
            <img
              src={user.avatarUrl}
              alt={user.username}>
            </img>
            <div>
              <span>Bem vindo</span>
              <strong>{user.username}</strong>
            </div>
          </Profile>

          <button type='button' onClick={signOut}>
            <FiPower></FiPower>
          </button>

        </HeaderContent>
      </Header>

      <Content>
        <Schedule>
          <h1>Horários Agendados</h1>
          <p>
           {isToday(selectedDate) &&  <span>Hoje</span>}
            <span>{selectedDateAsText}</span>
            <span>{selectedDateDayOfTheWeek}</span>
          </p>
          <NextAppointment>
            <strong>Atendimento a seguir</strong>
            <div>
              <img src="https://pbs.twimg.com/media/EghU8jXUwAARoHE?format=jpg&name=small" alt="avatar"></img>
              <strong>Gatinho</strong>
              <span>
                <FiClock></FiClock>
                08:00
              </span>
            </div>
          </NextAppointment>

          <Section>
            <strong>Manhã</strong>
            {morningAppointments.map(appointment =>(
              <Appointment key={appointment.id}>
                <span>
                  <FiClock></FiClock>
                  {appointment.formattedDate}
                </span>
                <div>
                  <img src={appointment.user.avatarUrl} alt={appointment.user.username}></img>
                  <strong>{appointment.user.username}</strong>
                </div>
            </Appointment>
            ))}
          </Section>

          <Section>
            <strong>Tarde</strong>
            {afternoonAppointments.map(appointment =>(
              <Appointment key={appointment.id}>
                <span>
                  <FiClock></FiClock>
                  {appointment.formattedDate}
                </span>
                <div>
                  <img src={appointment.user.avatarUrl} alt={appointment.user.username}></img>
                  <strong>{appointment.user.username}</strong>
                </div>
            </Appointment>
            ))}
          </Section>

        </Schedule>

        <Calendar>
          <DayPicker
          weekdaysShort={['D', 'S', 'T', 'Q', 'Q', 'S', 'S']}
          fromMonth={new Date()}
          disabledDays={[{daysOfWeek: [0, 6]},...disabledDays]}
          selectedDays={selectedDate}
          modifiers={{
            available: {daysOfWeek: [1, 2, 3, 4, 5]}
          }}
          onDayClick={handleDateChange}
          onMonthChange={handleMonthChange}
          months={[
            'Janeiro',
            'Fevereiro',
            'Março',
            'Abril',
            'Maio',
            'Junho',
            'Julho',
            'Agosto',
            'Setembro',
            'Outubro',
            'Novembro',
            'Dezembro',
          ]}>
          </DayPicker>

        </Calendar>
      </Content>
    </Container>
  )
}

export default DashBoard
