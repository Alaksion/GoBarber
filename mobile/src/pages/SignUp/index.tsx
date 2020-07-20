import React, {useCallback, useRef} from 'react'
import {Image, KeyboardAvoidingView, Platform, View, ScrollView} from 'react-native'
import {Container, Title, BackToLogonButton,  BackToLogonText} from './styles'
import logo from '../../assets/logo.png'
import Input from '../../Components/Input/index'
import Button from '../../Components/Button/index'
import Icon from 'react-native-vector-icons/Feather'
import { useNavigation } from '@react-navigation/native'
import {Form} from '@unform/mobile'
import {FormHandles} from '@unform/core'


const SignUp : React.FC = () => {

  const navigation = useNavigation()
  const formRef = useRef<FormHandles>(null)

  const HandleSubmit = useCallback((data:object)=>{
    return(
      console.log(data)
    )
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
              <Input name='name' icon='user' placeholder='Nome'></Input>
              <Input name='email' icon='mail' placeholder='E-mail'></Input>
              <Input name='password'icon='lock' placeholder='Senha' ></Input>
            </Form>
        
            <Button onPress={() => formRef.current?.submitForm() }>Entrar</Button>
          </Container>

          <BackToLogonButton onPress={()=>navigation.goBack()} > 
            <Icon name='arrow-left' size={20} color='#ff9000'></Icon>
            <BackToLogonText> Voltar para Logon Conta </BackToLogonText>
          </BackToLogonButton>
         
         
        </KeyboardAvoidingView>
      </ScrollView>
    </>

    
  )
}

export default SignUp