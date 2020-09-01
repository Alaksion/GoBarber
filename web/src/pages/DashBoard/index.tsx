import React from 'react'
import {NextAppointment, Container, Header, HeaderContent, Profile, Calendar, Content, Schedule} from './styles'
import {FiPower, FiClock} from 'react-icons/fi'
import logo from '../../assets/logo.svg'
import { useAuth } from '../../hooks/AuthContext'

const DashBoard: React.FC = () =>{
  const {signOut, user} = useAuth()
  console.log(user)

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
            <span>Hoje</span>
            <span>Dia 6</span>
            <span>Segunda-feira</span>
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

        </Schedule>

        <Calendar>

        </Calendar>
      </Content>
    </Container>
  )
}

export default DashBoard
