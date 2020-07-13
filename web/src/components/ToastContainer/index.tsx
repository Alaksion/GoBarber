import React from 'react'
import {FiAlertTriangle, FiXCircle} from 'react-icons/fi'
import {Container, Toast} from './styles'

const ToastContainer: React.FC = ()=>{
  return (
    <Container>
      <Toast type='success' hasDescription={false}>
        <FiAlertTriangle/>
        <div>
          <strong>Ocorreu um erro</strong>
          <p>Descrica do erro aqui ui ui</p>
        </div>
        <button type='button'>
          <FiXCircle size={18}/>
        </button>
      </Toast>

      <Toast type='error' hasDescription>
        <FiAlertTriangle/>
        <div>
          <strong>Ocorreu um erro</strong>
          <p>Descrica do erro aqui ui ui</p>
        </div>
        <button type='button'>
          <FiXCircle size={18}/>
        </button>
      </Toast>

      <Toast hasDescription={false}>
        <FiAlertTriangle/>
        <div>
          <strong>Ocorreu um erro</strong>
        </div>
        <button type='button'>
          <FiXCircle size={18}/>
        </button>
      </Toast>


    </Container>
  )
}

export default ToastContainer
