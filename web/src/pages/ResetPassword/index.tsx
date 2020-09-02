import React, {useCallback, useRef, useState} from 'react';
import {Container, Content, Background, AnimationContainer} from './styles'
import logo from '../../assets/logo.svg'
import {FiLock} from 'react-icons/fi'
import CustomButtom from '../../components/Button/index'
import CustomInput from '../../components/Input/index'
import {Form} from '@unform/web'
import {FormHandles} from '@unform/core'
import ValidationErrors from '../../utils/getValidationErrors'
import * as Yup from 'yup'
import {useToast} from '../../hooks/ToastContext'
import {useHistory, useLocation} from 'react-router-dom'
import api from '../../services/api';

interface ResetPasswordFormData{
  password: string,
  passwordConfirmation:string,
}

const ResetPassword: React.FC = ()=>{

  const location = useLocation()
  const history = useHistory()
  const formRef = useRef<FormHandles>(null)
  const {addToast} = useToast()
  const [loading, setLoading] = useState(0)

  const HandleSubmit = useCallback( async (data:ResetPasswordFormData) : Promise<void>=>{

    try{

      const token = location.search.split("?token=")[1]
      if(!token){
       throw new Error()
      }

      setLoading(1)

      formRef.current?.setErrors({})
      const schema = Yup.object().shape({
        password: Yup.string().required('Campo senha obrigatório'),
        passwordConfirmation: Yup.string().oneOf(
          [Yup.ref('password'), undefined],
          'Senhas não batem')
      })

      await schema.validate(data, {
        abortEarly: false,
      })

      await api.post('/password/reset', {
        password: data.password,
        passwordConfirmation: data.passwordConfirmation,
        token
      })

      addToast({
        type: "success",
        title: "Sua senha foi redefinida!",
        description: "Você já pode entrar na aplicação usando as novas credenciais"
      })

      history.push('/')

    }catch(err){

      if(err instanceof Yup.ValidationError){
        const erros = ValidationErrors(err)
        formRef.current?.setErrors(erros)
      }

      addToast({
        type: 'error',
        description: 'Ocorreu um erro ao tentar realizar a redefinição de senha, tente novamente',
        title: 'Erro na redefinição de senha'
      })
    }finally{
      setLoading(0)
    }

  }, [addToast, history, location.search])


  return(
    <Container>

      <Content>
        <AnimationContainer>
          <img src={logo} alt='GoBarber'></img>

          <Form ref={formRef} onSubmit={HandleSubmit}>
            <h1>Redefinição de senha</h1>
            <CustomInput icon={FiLock} type='password' name='password' placeholder='Digite a nova senha'/>
            <CustomInput icon={FiLock} type='password' name='passwordConfirmation' placeholder='Confirme a nova senha'/>
            <CustomButtom loading={loading} type='submit'>Redefinir senha</CustomButtom>
          </Form>
        </AnimationContainer>
      </Content>



      <Background>

      </Background>
    </Container>
  )
}

export default ResetPassword
