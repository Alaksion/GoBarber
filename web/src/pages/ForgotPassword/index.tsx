import React, {useCallback, useRef, useState} from 'react';
import {Container, Content, Background, AnimationContainer} from './styles'
import logo from '../../assets/logo.svg'
import {FiLogIn, FiMail} from 'react-icons/fi'
import CustomButtom from '../../components/Button/index'
import CustomInput from '../../components/Input/index'
import {Form} from '@unform/web'
import {FormHandles} from '@unform/core'
import ValidationErrors from '../../utils/getValidationErrors'
import * as Yup from 'yup'
import {useToast} from '../../hooks/ToastContext'
import {Link, useHistory} from 'react-router-dom'
import api from '../../services/api';

interface ForgotPasswordFormData{
  email: string,
}

const ForgotPassword: React.FC = ()=>{

  const history = useHistory()
  const formRef = useRef<FormHandles>(null)
  const {addToast} = useToast()
  const [loading, setLoading] = useState(0)

  const HandleSubmit = useCallback( async (data:ForgotPasswordFormData) : Promise<void>=>{

    try{
      setLoading(1)
      formRef.current?.setErrors({})
      const schema = Yup.object().shape({
        email: Yup.string().email('E-mail digitado é inválido').required('Campo e-mail obrigatório'),
      })

      await schema.validate(data, {
        abortEarly: false,
      })

      await api.post('/password/forgot', {email: data.email})

      addToast({
        type: "success",
        title: "Processo de recuperação iniciado",
        description: "O e-mail de recuperação de senha foi enviado"
      })

      history.push('/')

    }catch(err){

      if(err instanceof Yup.ValidationError){
        const erros = ValidationErrors(err)
        formRef.current?.setErrors(erros)
      }

      addToast({
        type: 'error',
        description: 'Ocorreu um erro ao tentar realizar a recuperação de senha, tente novamente',
        title: 'Erro na recuperção de senha'
      })
    }finally{
      setLoading(0)
    }

  }, [addToast, history] )


  return(
    <Container>

      <Content>
        <AnimationContainer>
          <img src={logo} alt='GoBarber'></img>

          <Form ref={formRef} onSubmit={HandleSubmit}>
            <h1>Recuperação de senha</h1>
            <CustomInput icon={FiMail} name='email' placeholder='E-mail'/>
            <CustomButtom loading={loading} type='submit'>Recuperar</CustomButtom>
          </Form>
          <Link to='/'> <FiLogIn/>Retornar ao login </Link>
        </AnimationContainer>
      </Content>



      <Background>

      </Background>
    </Container>
  )
}

export default ForgotPassword
