import React, {useCallback, useRef} from 'react'
import {Image, KeyboardAvoidingView, Platform, View, ScrollView, TextInput, Alert} from 'react-native'
import {Container, Title, UserAvatarButton, UserAvatar, BackButton} from './styles'
import Input from '../../Components/Input/index'
import Button from '../../Components/Button/index'
import { useNavigation } from '@react-navigation/native'
import {Form} from '@unform/mobile'
import {FormHandles} from '@unform/core'
import * as Yup from 'yup'
import ValidationErrors from '../../utils/getValidationErrors'
import api from '../../services/Api'
import { useAuth } from '../../hooks/AuthContext'
import Icon from 'react-native-vector-icons/Feather'
import ImagePicker from 'react-native-image-picker'

interface FormData{
  name: string;
  email: string;
  password: string;
  oldPassword: string;
  passwordConfirmation: string;
}

const Profile : React.FC = () => {

  const {user, updateUser} = useAuth()
  const navigation = useNavigation()
  const formRef = useRef<FormHandles>(null)
  const emailInputRef = useRef<TextInput>(null)
  const passwordInputRef = useRef<TextInput>(null)
  const oldPasswordInputRef = useRef<TextInput>(null)
  const passwordConfirmationInputRef = useRef<TextInput>(null)
 

  const HandleSubmit = useCallback(async (data:FormData)=>{

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

      await schema.validate(data, {
        abortEarly: false
      })

      const formData = Object.assign({
        email : data.email,
        username: data.name
        }, 
        data.oldPassword ? {
        oldPassword: data.oldPassword,
        password: data.password,
        passwordConfirmation: data.passwordConfirmation
      } : {})

 
      const response = await api.put('profiles', formData)
      updateUser(response.data)

      Alert.alert('Perfil atualizado com sucesso!')

      navigation.goBack()

    }catch(err){
      if(err instanceof Yup.ValidationError){
        const erros = ValidationErrors(err)
        formRef.current?.setErrors(erros)
        Alert.alert('Erro na atualização de perfil', 'Ocorreu um erro ao atualizar seu perfil tente novamente')
      }
      else{
        console.log(err)
      }
    }
  }, [updateUser])

  const handleGoBack = useCallback(()=>{
    navigation.goBack()
  }, [navigation])

  const handleUpdateAvatar = useCallback(()=>{
    ImagePicker.showImagePicker({
      title: 'Selecione um avatar',
      cancelButtonTitle: 'cancelar',
      takePhotoButtonTitle: 'Usar câmera',
      chooseFromLibraryButtonTitle: 'Escolher da galeria'
    }, response =>{
      if (response.didCancel) {
        return
      }

      if (response.error) {
        Alert.alert("Erro ao atualizar avatar")
        return
      }

      const source = { uri: response.uri };    

      const data = new FormData()
      data.append('avatar', {
        uri: source,
        type: 'image/jpeg',
        name: `${user.id}.jpg`
      })
      
      api.patch('/users/avatar', data) 
      .then(apiResponse => {
        updateUser(apiResponse.data)
      })

      }
    )
  }, [updateUser, user.id])
  
  return(
    <>
    <ScrollView
    contentContainerStyle={{flex: 1}} keyboardShouldPersistTaps='handled'>
        <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={{flex: 1}} enabled>     
          <Container>
            <BackButton onPress={handleGoBack}>
              <Icon name='chevron-left' size={24} color='#999591'/>

            </BackButton>
            
            <UserAvatarButton onPress={handleUpdateAvatar}>
              <UserAvatar source={{uri: user.avatarUrl}}/>
            </UserAvatarButton>

            <View>
              <Title>Meu Perfil</Title>
            </View>

            <Form ref={formRef} onSubmit={HandleSubmit} initialData={{name: user.username, email: user.email}}>
              <Input 
              name='name' 
              icon='user' 
              placeholder='Nome'
              returnKeyType='next'
              onSubmitEditing={()=> emailInputRef.current?.focus()}/>
    
              <Input 
              name='email' 
              icon='mail' 
              placeholder='E-mail'
              ref={emailInputRef} 
              keyboardType='email-address'
              autoCorrect={false}
              autoCapitalize='none'
              returnKeyType='next'
              onSubmitEditing={()=> oldPasswordInputRef.current?.focus()}/>
              
            <Input 
              name='oldPassword'
              icon='lock' 
              placeholder='Senha Atual'
              ref={oldPasswordInputRef}
              secureTextEntry
              returnKeyType='next'
              containerStyle={{marginTop: 16}}
              textContentType='newPassword'
              onSubmitEditing={()=> passwordInputRef.current?.focus()}/>

            <Input 
              name='password'
              icon='lock' 
              placeholder='Nova senha'
              ref={passwordInputRef}
              secureTextEntry
              returnKeyType='next'
              textContentType='newPassword'
              onSubmitEditing={()=> passwordConfirmationInputRef.current?.focus()}/>

            <Input 
              name='passwordConfirmation'
              icon='lock' 
              placeholder='Confirmar nova senha'
              ref={passwordConfirmationInputRef}
              secureTextEntry
              returnKeyType='send'
              textContentType='newPassword'
              onSubmitEditing={()=> formRef.current?.submitForm()}/>
            </Form>
        
            <Button onPress={() => formRef.current?.submitForm() }>Confirmar mudanças</Button>
          </Container>
        </KeyboardAvoidingView>
      </ScrollView>
    </>
  )
}

export default Profile