import React from 'react'
import {Container} from './styles'
import {ToastMessage} from '../../hooks/ToastContext'
import {useTransition} from 'react-spring'
import Toast from './Toast/index'


interface ToastContainerProps{
  messages: ToastMessage[];

}

const ToastContainer: React.FC<ToastContainerProps> = ({messages})=>{
  const messagesWithTransitions = useTransition(messages,
    message=> message.id,
    {
      from : { right: '-120%', opacity: 0},
      enter : {right: '0%', opacity: 1},
      leave: {right: '-120%', opacity: 0},
    })

  return (
    <Container>
      {messagesWithTransitions.map(({item, key, props})=>{
        return(
          <Toast key={key} style={props} message={item} ></Toast>
        )
      })}
    </Container>
  )
}

export default ToastContainer
