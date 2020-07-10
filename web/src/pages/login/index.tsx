import React from 'react';
import {Container, Content, Background} from './styles'
import logo from '../../assets/logo.svg'
import {FiLogIn, FiMail, FiLock} from 'react-icons/fi'
import CustomButtom from '../../components/Button/index'
import CustomInput from '../../components/Input/index'


const Login: React.FC = ()=>{
  return(
    <Container>
      <Content>
        <img src={logo} alt='GoBarber'></img>

        <form>

          <h1>Faça seu logon</h1>
          <CustomInput icon={FiMail} name='email' placeholder='E-mail'/>
          <CustomInput icon={FiLock} name='password' type='password' placeholder='Senha'/>
          <CustomButtom type='submit'>Entrar</CustomButtom>
          <a href='/teste'>Esqueci minha senha</a>
        </form>

        <a href='/teste'> <FiLogIn/>Criar conta </a>
      </Content>

      <Background>

      </Background>
    </Container>
  )
}

export default Login
