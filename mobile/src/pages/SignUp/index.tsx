import React, {useCallback, useRef} from 'react'
import {Image, KeyboardAvoidingView, Platform, View, ScrollView, TextInput, Alert} from 'react-native'
import {Container, Title, BackToLogonButton,  BackToLogonText} from './styles'
import logo from '../../assets/logo.png'
import Input from '../../Components/Input/index'
import Button from '../../Components/Button/index'
import Icon from 'react-native-vector-icons/Feather'
import { useNavigation } from '@react-navigation/native'
import {Form} from '@unform/mobile'
import {FormHandles} from '@unform/core'
import * as Yup from 'yup'
import ValidationErrors from '../../utils/getValidationErrors'
import api from '../../services/Api'

interface FormData{
  name: string;
  email: string;
  password: string;
}

const SignUp : React.FC = () => {

  const navigation = useNavigation()
  const formRef = useRef<FormHandles>(null)
  const emailInputRef = useRef<TextInput>(null)
  const passwordInputRef = useRef<TextInput>(null)
 

  const HandleSubmit = useCallback(async (data:FormData)=>{
    try{
      formRef.current?.setErrors({})
      const Schema = Yup.object().shape({
        name: Yup.string().required('Campo nome obrigatório'),
        email: Yup.string().email('E-mail inválido').required('Campo E-mail obrigatório'),
        password: Yup.string().min(6, 'Campo senha deve ter ao menos 6 caracteres')
      })
      await Schema.validate(data, {
        abortEarly: false
      })

      
      await api.post('users', {
        username: data.name,
        email: data.email,
        password: data.password
      })

      Alert.alert('Cadastro feito com sucesso!', 'Você já pode fazer logon na aplicação.')

      navigation.goBack()

      

    }catch(err){
      if(err instanceof Yup.ValidationError){
        const erros = ValidationErrors(err)
        formRef.current?.setErrors(erros)
        Alert.alert('Erro no cadastro', 'Verifique as informações digitadas')
      }
      else{
        console.log(err)
      }
    }
  }, [])

  return(
    <>
    <ScrollView
    contentContainerStyle={{flex: 1}} keyboardShouldPersistTaps='handled'>
        <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={{flex: 1}} enabled>     
          <Container>
            <Image source={logo}></Image>
            <View>
              <Title>Crie sua conta</Title>
            </View>

            <Form ref={formRef} onSubmit={HandleSubmit}>
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
              onSubmitEditing={()=> passwordInputRef.current?.focus()}/>
              

              <Input 
              name='password'
              icon='lock' 
              placeholder='Senha'
              ref={passwordInputRef}
              secureTextEntry
              returnKeyType='send'
              textContentType='newPassword'
              onSubmitEditing={()=> formRef.current?.submitForm()}/>
            </Form>
        
            <Button onPress={() => formRef.current?.submitForm() }>Cadastrar</Button>
          </Container>

          <BackToLogonButton onPress={()=>navigation.goBack()} > 
            <Icon name='arrow-left' size={20} color='#ff9000'></Icon>
            <BackToLogonText> Voltar para Logon</BackToLogonText>
          </BackToLogonButton>
         
         
        </KeyboardAvoidingView>
      </ScrollView>
    </>
  )
}

export default SignUp