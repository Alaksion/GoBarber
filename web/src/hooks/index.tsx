import React, { Children } from 'react'
import {AuthProvider} from './AuthContext'
import {ToastProvider} from './ToastContext'
import SignIn from '../pages/login/index'

const AppProvider: React.FC = ({children})=>{
  return(
    <AuthProvider>
      <ToastProvider>
        {children}
      </ToastProvider>
    </AuthProvider>
  )
}

export default AppProvider
