import React, {useCallback, useRef} from 'react';
import {Link} from 'react-router-dom'
import {Container, Content, Background, AnimationContainer} from './styles'
import logo from '../../assets/logo.svg'
import {FiMail, FiLock, FiUser, FiArrowLeft} from 'react-icons/fi'
import CustomButtom from '../../components/Button/index'
import CustomInput from '../../components/Input/index'
import {Form} from '@unform/web'
import {FormHandles} from '@unform/core'
import * as Yup from 'yup'
import ValidationErrors from '../../utils/getValidationErrors'
import api from '../../services/api'
import {useToast} from '../../hooks/ToastContext'

interface SignuPFormData{
  name: string;
  email: string;
  password: string;
}

const SingUp: React.FC = ()=>{

  const formRef = useRef<FormHandles>(null)
  const {addToast} = useToast()
  const HandleSubmit = useCallback( async (data:SignuPFormData) : Promise<void>=>{
    try{
      formRef.current?.setErrors({})
      const schema = Yup.object().shape({
        name: Yup.string().required('Campo nome obrigatório'),
        email: Yup.string().email('E-mail digitado é inválido').required('Campo e-mail obrigatório'),
        password: Yup.string().min(6, 'Senha deve ter 6 caracteres')
      })

      await schema.validate(data, {
        abortEarly: false,
      })

      await api.post('/users', {
        username: data.name,
        password: data.password,
        email: data.email
      })
      addToast({
        title: 'Usuário registrado com sucesso',
        type: "success",
        description: "Você já pode fazer login"
      })


    }catch(err){
      if (err instanceof Yup.ValidationError){
        const erros = ValidationErrors(err)
        formRef.current?.setErrors(erros)

        addToast({
          title: 'Erro no cadastro!',
          type: "error",
          description: "Verifique se as informações digitadas são válidas"
        })

      }

    }

  }, [addToast] )

  return(
    <Container>
      <Background>

      </Background>

      <Content>
        <AnimationContainer>
          <img src={logo} alt='GoBarber'></img>
            {/*
            O componente form do Unform permite que nós criemos um formulário HTML que pode automaticamente capturar o valor dos inputs sem a necessidade
            de criar um state para cada input, a configuração de como esse input será capturado fica dentro do código do componente, então acesse o
            components/input/index para maior detalhamentol.
            */}

            <Form ref={formRef} onSubmit={HandleSubmit}>
              <h1>Faça seu Cadastro</h1>
              <CustomInput icon={FiUser} name='name' placeholder='Nome'/>
              <CustomInput icon={FiMail} name='email' placeholder='E-mail'/>
              <CustomInput icon={FiLock} name='password' type='password' placeholder='Senha'/>
              <CustomButtom type='submit'>Cadastrar</CustomButtom>
            </Form>
            <Link to='/'> <FiArrowLeft/>Voltar para logon </Link>
        </AnimationContainer>
      </Content>
    </Container>
  )
}

export default SingUp
