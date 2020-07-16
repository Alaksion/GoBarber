import React, {useCallback, useRef} from 'react';
import {Container, Content, Background, AnimationContainer} from './styles'
import logo from '../../assets/logo.svg'
import {FiLogIn, FiMail, FiLock} from 'react-icons/fi'
import CustomButtom from '../../components/Button/index'
import CustomInput from '../../components/Input/index'
import {Form} from '@unform/web'
import {FormHandles} from '@unform/core'
import ValidationErrors from '../../utils/getValidationErrors'
import * as Yup from 'yup'
import {useAuth} from '../../hooks/AuthContext'
import {useToast} from '../../hooks/ToastContext'
import {Link, useHistory} from 'react-router-dom'

interface SignInFormData{
  password: string,
  email: string,
}

const Login: React.FC = ()=>{

  const history = useHistory()
  const formRef = useRef<FormHandles>(null)
  const {signIn, user} = useAuth()
  const {addToast, removeToast} = useToast()

  const HandleSubmit = useCallback( async (data:SignInFormData) : Promise<void>=>{
    try{
      formRef.current?.setErrors({})
      const schema = Yup.object().shape({
        email: Yup.string().email('E-mail digitado é inválido').required('Campo e-mail obrigatório'),
        password: Yup.string().required('Campo senha é obrigatório')
      })

      await schema.validate(data, {
        abortEarly: false,
      })
      await signIn({
        email: data.email,
        password: data.password
      })
      history.push('/dashboard')




    }catch(err){

      if(err instanceof Yup.ValidationError){
        const erros = ValidationErrors(err)
        formRef.current?.setErrors(erros)
      }

      addToast({
        type: 'error',
        description: 'Ocorreu um erro ao fazer login, cheque as credenciais ',
        title: 'Erro de autenticação'
      })


    }

  }, [signIn, addToast, history] )


  return(
    <Container>

      <Content>
        <AnimationContainer>
          <img src={logo} alt='GoBarber'></img>

          <Form ref={formRef} onSubmit={HandleSubmit}>
            <h1>Faça seu logon</h1>
            <CustomInput icon={FiMail} name='email' placeholder='E-mail'/>
            <CustomInput icon={FiLock} name='password' type='password' placeholder='Senha'/>
            <CustomButtom type='submit'>Entrar</CustomButtom>
            <a href='/teste'>Esqueci minha senha</a>
          </Form>
          <Link to='/signup'> <FiLogIn/>Criar conta </Link>
        </AnimationContainer>
      </Content>



      <Background>

      </Background>
    </Container>
  )
}

export default Login
