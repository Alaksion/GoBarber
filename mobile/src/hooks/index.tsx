import React from 'react'
import { Text, View } from 'react-native'
import {AuthProvider} from './AuthContext'

const AppProvider: React.FC = ({children})=>{
  return(
    <AuthProvider>
        {children}
    </AuthProvider>
  )
}

export default AppProvider
