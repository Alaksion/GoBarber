import React, {createContext, useContext, useCallback, useState} from 'react'
import ToastContainer from '../components/ToastContainer/index'
import {uuid} from 'uuidv4'

interface ToastContextData{
  addToast(message: Omit <ToastMessage, 'id'>) : void;
  removeToast(id : string) : void;
}

export interface ToastMessage{
  type?: 'success'|'error' |'info';
  title: string;
  description?: string;
  id: string;
}

const ToastContext = createContext<ToastContextData>({} as ToastContextData)

const ToastProvider: React.FC = ({children}) => {

  const [messages, setMessages] = useState<Array<ToastMessage>>([])

  const addToast = useCallback(
    ({type, description, title}: Omit<ToastMessage, 'id'>)=>{
    const id = uuid()

    const toast = {
      id,
      type,
      description,
      title,
    }

    setMessages(oldMessages => [...oldMessages, toast])



  },[])

  const removeToast = useCallback((id)=>{
    const filteredMessages = messages.filter(message=> message.id !== id)
    setMessages(filteredMessages)

  },[messages])

  return(
    <ToastContext.Provider value={{addToast, removeToast}} >
      {children}
      <ToastContainer messages={messages}></ToastContainer>
    </ToastContext.Provider>
  )
}

function useToast() : ToastContextData {
  const context = useContext(ToastContext)

  if (!context){
    throw new Error('UseToast must be used inside an ToastProvider')
  }

  return context
}

export {useToast, ToastProvider}
