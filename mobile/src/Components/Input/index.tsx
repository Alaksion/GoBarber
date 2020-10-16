import React, {useEffect, useRef, RefForwardingComponent, useImperativeHandle, forwardRef, useState, useCallback} from 'react'
import {Container, TextInupt, Icon} from './styles'
import {TextInputProps, View} from 'react-native'
import {useField} from '@unform/core'


interface InputProps extends TextInputProps{
  name: string;
  icon: string;
  containerStyle?: {}
}

interface InputValueReference{
  value: string;
}

interface InputRef{
  focus():void;
}


const Input: RefForwardingComponent<InputRef, InputProps> = ({name, icon, containerStyle={}, ...rest}, ref) =>{

  const {registerField, defaultValue='', fieldName, error} = useField(name)
  const inputElementRef = useRef<any>(null)
  const inputValueRef = useRef<InputValueReference>({value: defaultValue})
  const [isFocused, setFocused] = useState(false)
  const [isFilled, SetFilled] = useState(false)


  const HandleInputFocus = useCallback( ()=>{
    setFocused(true)
  }, [])

  const HandleInputBlur = useCallback(()=>{
    setFocused(false)

    inputValueRef.current.value ? SetFilled(true) : SetFilled(false)

  },[])

  useImperativeHandle(ref, ()=>({
    focus(){
      inputElementRef.current.focus()
    }
  }))

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
    <Container style={containerStyle} isErrored={!!error} isFocused={isFocused}>
      <Icon isFilled={isFilled} name={icon} size={20} color={isFilled || isFocused ? '#FF9000':'#666360'}></Icon>
      <TextInupt
      ref = {inputElementRef}
      defaultValue={defaultValue}
      onChangeText={value => inputValueRef.current.value = value}
      placeholderTextColor='#666360' 
      keyboardAppearance='dark'
      onFocus={HandleInputFocus}
      onBlur={HandleInputBlur}
      {...rest}/>
    </Container>
  )
}

export default forwardRef(Input)