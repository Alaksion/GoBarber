import React, {useCallback, useRef} from 'react'
import {Image, KeyboardAvoidingView, Platform, View, ScrollView} from 'react-native'
import {Container, Title, ForgotPasswordButton, ForgotPasswordText, CreateAccButton, CreateAccText} from './styles'
import logo from '../../assets/logo.png'
import Input from '../../Components/Input/index'
import Button from '../../Components/Button/index'
import Icon from 'react-native-vector-icons/Feather'
import {useNavigation} from '@react-navigation/native'
import {Form} from '@unform/mobile' 
import {FormHandles} from '@unform/core'


const SignIn : React.FC = () => {
  
  const navigation = useNavigation()
  const formRef = useRef<FormHandles>(null)

  const HandleSignIn = useCallback( (data: object)=>{
    console.log(data)

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
              <Input name='email' icon='mail' placeholder='Digite seu email'></Input>
              <Input name='password'icon='lock' placeholder='Digite sua senha' ></Input>
              
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