import React, {useEffect} from 'react'
import {Container} from './styles'
import {FiAlertTriangle, FiCheckCircle, FiInfo, FiXCircle} from 'react-icons/fi'
import {ToastMessage, useToast} from '../../../hooks/ToastContext'



interface ToastProps{
  message: ToastMessage,
  style: object;
}

const Toast: React.FC<ToastProps> = ({message, style}) => {

  const {removeToast} = useToast()
  const icons = {
    info: <FiInfo size={24}></FiInfo>,
    error: <FiAlertTriangle size={24}></FiAlertTriangle>,
    success: <FiCheckCircle size={24}></FiCheckCircle>
  }

  useEffect(()=>{
    const timer = setTimeout(()=> {
      removeToast(message.id)
    }, 3000 )
    // Ao retornar uma função dentro do useEffect ela é executada instantaneamente caso o componente deixe de existir
    // esse passo será necessário pois se o usuário fechar o toast antes do contador a função irá executar com um id
    // que já não é mais existente, e isso causará inconsistências.
    return () => clearTimeout(timer)
  }, [message.id, removeToast])

  return (
  <Container
    key={message.id}
    hasdescription={Number(!!message.description)}
    type={message.type}
    style={style}>

    {icons[message.type || 'info']}
      <div>
        <strong>{message.title}</strong>
        {message.description && <p>{message.description}</p>}
      </div>
      <button type='button' onClick={() => removeToast(message.id)}>
        <FiXCircle size={18}/>
      </button>
    </Container>

  )
}


export default Toast;
