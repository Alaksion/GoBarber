import React, {createContext, useContext, useCallback} from 'react'
import ToastContainer from '../components/ToastContainer/index'

interface ToastContextData{
  addToast() : void;
  removeToast() : void;
}

const ToastContext = createContext<ToastContextData>({} as ToastContextData)

const ToastProvider: React.FC = ({children}) => {

  const addToast = useCallback(()=>{
    console.log('add toast')

  },[])

  const removeToast = useCallback(()=>{

  },[])

  return(
    <ToastContext.Provider value={{addToast, removeToast}} >
      {children}
      <ToastContainer></ToastContainer>
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
