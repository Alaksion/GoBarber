import React, {useCallback, InputHTMLAttributes, ComponentType, useEffect, useRef, useState} from 'react'
import {Container} from './stytes'
import {IconBaseProps} from 'react-icons'
import {useField} from '@unform/core'

interface inputProps extends InputHTMLAttributes<HTMLInputElement>{
  name:string;
  icon: React.ComponentType<IconBaseProps>;
}


const CustomInput: React.FC<inputProps> = ({name, icon: Icon, ...rest}) => {

  // A funcão useField do unform permite que nós capturemos as informações de um componente assim que ele é carregado, dessa forma
  // podemos interagir com o componente usando Unform na página do formulário.

  const {fieldName, defaultValue, error, registerField} = useField(name)
  const inputRef = useRef<HTMLInputElement>(null)
  const [focus, setFocus] = useState(false)
  const [filled, setFilled] = useState(false)

  // useRef do React permite capturar a referência do componente quando ele é instanciado e permite o acesso para o unform.

  useEffect( ()=>{
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
    })

  }, [fieldName, registerField] )

  const HandleInputBlur = useCallback(()=>{
    setFocus(false)
    inputRef.current?.value ? setFilled(true) : setFilled(false);
  }, [] )

  const HandleInputFocus = useCallback(()=>{
    setFocus(true)
  }, [])



  return (
  <Container isFilled={filled} isFocused={focus}>
    {Icon && <Icon></Icon>}
    <input
      ref={inputRef}
      defaultValue={defaultValue} {...rest}
      onFocus={HandleInputFocus}
      onBlur={HandleInputBlur}
      />
  </Container>

)}

export default CustomInput;
