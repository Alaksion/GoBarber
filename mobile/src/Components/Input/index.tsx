import React, {useEffect, useRef} from 'react'
import {Container, TextInupt, Icon} from './styles'
import {TextInputProps} from 'react-native'
import {useField} from '@unform/core'


interface InputProps extends TextInputProps{
  name: string;
  icon: string;
}

interface InputValueReference{
  value: string;
}


const Input: React.FC<InputProps> = ({name, icon, ...rest}) =>{

  const {registerField, defaultValue='', fieldName, error} = useField(name)
  const inputElementRef = useRef<any>(null)
  const inputValueRef = useRef<InputValueReference>({value: defaultValue})

  useEffect( ()=>{
    registerField({
      name: fieldName,
      ref: inputValueRef.current,
      path: 'value',
      setValue(ref: any, value: string){
        inputValueRef.current.value = value
        inputElementRef.current.setNativeProps({text: value})
      },
      clearValue(){
        inputValueRef.current.value = ''
        inputElementRef.current.clear()
      }
    })

  }, [fieldName, registerField] )

  return (
    <Container >
      <Icon name={icon} size={20} color='#666360'></Icon>
      <TextInupt
      ref = {inputElementRef}
      defaultValue={defaultValue}
      onChangeText={value => inputValueRef.current.value = value}
      placeholderTextColor='#666360' 
      keyboardAppearance='dark'
      {...rest}></TextInupt>
    </Container>
    
  )
}

export default Input