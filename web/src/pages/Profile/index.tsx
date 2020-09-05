import React, {useCallback, useRef, useState, ChangeEvent} from 'react';
import {Container, Content, AvatarInput} from './styles'
import {FiMail, FiLock, FiUser, FiArrowLeft, FiCamera} from 'react-icons/fi'
import CustomButtom from '../../components/Button/index'
import CustomInput from '../../components/Input/index'
import {Form} from '@unform/web'
import {FormHandles} from '@unform/core'
import * as Yup from 'yup'
import ValidationErrors from '../../utils/getValidationErrors'
import api from '../../services/api'
import {useToast} from '../../hooks/ToastContext'
import {useAuth} from '../../hooks/AuthContext'
import {Link, useHistory} from 'react-router-dom'

interface ProfileFormData{
  name: string;
  email: string;
  password: string;
  oldPassword: string;
  passwordConfirmation: string;
}

const Profile: React.FC = ()=>{
  const [loading, setLoading] = useState(0)
  const {user, updateUser} = useAuth()
  const formRef = useRef<FormHandles>(null)
  const {addToast} = useToast()
  const history = useHistory()

  const handleSubmit = useCallback(async (data: ProfileFormData)=>{
    try{
      formRef.current?.setErrors({})
      const schema = Yup.object().shape({
        name: Yup.string(),
        email: Yup.string().email(),
        oldPassword: Yup.string(),
        password: Yup.string().when('oldPassword', {
          is: val => !!val.length,
          then: Yup.string().required("Campo obrigatório")
        }),
        passwordConfirmation:Yup.string().when('oldPassword', {
          is: val => !!val.length,
          then: Yup.string().required("Campo obrigatório")
        })
        .oneOf([Yup.ref('password'), undefined], ('Senhas não batem'))

      })
      await schema.validate(data, {abortEarly: false})
      const {password, passwordConfirmation, oldPassword, name, email} = data
      const formData = Object.assign({
        email : data.email,
        username: data.name
      }, data.oldPassword ? {
        oldPassword: data.oldPassword,
        password: data.password,
        passwordConfirmation: data.passwordConfirmation
      } : {})
      await api.put('/profiles', formData).then(response=> updateUser(response.data))

      history.push('/dashboard')
      addToast({
        type: "success",
        title: "Suas informações foram alteradas!",
        description: "Você já pode utilizar a aplicação usando as novas informações"
      })

    }catch(err){
      console.log(err)
      if(err instanceof Yup.ValidationError){
        const erros = ValidationErrors(err)
        formRef.current?.setErrors(erros)
      }

      addToast({
        type: 'error',
        description: 'Ocorreu um erro ao tentar realizar a atualização do perfil, tente novamente',
        title: 'Erro na atualização do perfil'
      })
    }finally{
      setLoading(0)
    }
  }, [useToast])

  const handleAvatarChange = useCallback((e: ChangeEvent<HTMLInputElement>)=>{
    e.preventDefault()
    if(e.target.files){
      const data = new FormData()
      data.append('avatar', e.target.files[0])
      api.patch('/users/avatar', data).then((response)=>{
        addToast({
          type: 'success',
          title: "Avatar atualizado com sucesso"
        })
        updateUser(response.data)
      })
    }

  }, [addToast, updateUser])

  return(
    <Container>
      <header>
        <div>
          <Link to='/dashboard'>
            <FiArrowLeft></FiArrowLeft>
          </Link>
        </div>
      </header>

      <Content>
        <Form ref={formRef} onSubmit={handleSubmit} initialData={{
          name: user.username,
          email: user.email,
        }}>
          <AvatarInput>
            <img src={user.avatarUrl} alt={user.username}></img>
            <label htmlFor='avatar'>
              <FiCamera></FiCamera>
              <input type="file" id='avatar' onChange={handleAvatarChange}/>
            </label>

          </AvatarInput>

        <h1>Meu perfil</h1>
          <CustomInput icon={FiUser} name='name' placeholder='Nome'/>
          <CustomInput icon={FiMail} name='email' placeholder='E-mail'/>
          <CustomInput ContainerStyle={{marginTop:24}} icon={FiLock} name='oldPassword' type='password' placeholder='Senha atual'/>
          <CustomInput icon={FiLock} name='password' type='password' placeholder='Nova senha'/>
          <CustomInput icon={FiLock} name='passwordConfirmation' type='password' placeholder='Confirmar senha'/>
          <CustomButtom loading={loading} type='submit'>Confirmar mudanças</CustomButtom>
        </Form>
      </Content>
    </Container>
  )
}

export default Profile
