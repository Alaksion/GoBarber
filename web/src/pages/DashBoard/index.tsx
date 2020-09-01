import React from 'react'
import {Container, Header, HeaderContent, Profile} from './styles'
import {FiPower} from 'react-icons/fi'
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
    </Container>
  )
}

export default DashBoard
