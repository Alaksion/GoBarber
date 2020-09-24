import React, {useCallback, useRef} from 'react'
import {Image, KeyboardAvoidingView, Platform, View, ScrollView, TextInput, Alert} from 'react-native'
import {Container, Title, ForgotPasswordButton, ForgotPasswordText, CreateAccButton, CreateAccText} from './styles'
import logo from '../../assets/logo.png'
import Input from '../../Components/Input/index'
import Button from '../../Components/Button/index'
import Icon from 'react-native-vector-icons/Feather'
import {useNavigation} from '@react-navigation/native'
import {Form} from '@unform/mobile' 
import {FormHandles} from '@unform/core'
import * as Yup from 'yup'
import ValidationErros from '../../utils/getValidationErrors'
import {useAuth} from '../../hooks/AuthContext'


interface FormData{
  email:string;
  password:string;
}

const SignIn : React.FC = () => {
  
  const navigation = useNavigation()
  const formRef = useRef<FormHandles>(null)
  const passowrdInputRef = useRef<TextInput>(null)
  const {signIn, user} = useAuth()
  console.log(user)

  const HandleSignIn = useCallback( async (data: FormData)=>{
    try{
      formRef.current?.setErrors({})
      const Schema = Yup.object().shape({
        email: Yup.string().email('E-mail inválido').required('Campo E-mail obrigatório'),
        password: Yup.string().required()
      })

      await Schema.validate(data, {
        abortEarly: false,
      })

      await signIn({email: data.email, password: data.password})

    }catch(err){
      const erros = ValidationErros(err)
      formRef.current?.setErrors(erros)
      Alert.alert('Erro no login', 'Verifique as informações digitadas')
    }
    

  }, [] )

  return(
    <>
    <ScrollView
    contentContainerStyle={{flex: 1}} keyboardShouldPersistTaps='handled'>
        <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={{flex: 1}} enabled>     
          <Container>
            <Image source={logo}></Image>
            <View>
              <Title>Faça seu Logon</Title>
            </View>
          
            <Form ref={formRef} onSubmit={HandleSignIn}>
              <Input 
              name='email' 
              icon='mail' 
              placeholder='Digite seu email'
              autoCapitalize={'none'} 
              autoCorrect={false}
              keyboardType={"email-address"}
              returnKeyType={"next"}
              onSubmitEditing={()=> {
                passowrdInputRef.current?.focus()
               }}/>
      
              <Input 
              name='password'
              icon='lock' 
              placeholder='Digite sua senha' 
              secureTextEntry
              returnKeyType='send'
              ref={passowrdInputRef}
              onSubmitEditing={() => formRef.current?.submitForm() }/>
    
            </Form>

            <Button onPress={() => formRef.current?.submitForm()}>Entrar</Button>
            
            <ForgotPasswordButton onPress={()=> console.log('clicado esqueci minha senha')}>
              <ForgotPasswordText>Esqueci minha senha</ForgotPasswordText>
            </ForgotPasswordButton>
          </Container>

          <CreateAccButton onPress={() => navigation.navigate('SignUp')} > 
            <Icon name='log-in' size={20} color='#ff9000'></Icon>
            <CreateAccText> Criar Conta </CreateAccText>
          </CreateAccButton>
        
          
        </KeyboardAvoidingView>
      </ScrollView>
    </>
  )
}

export default SignIn