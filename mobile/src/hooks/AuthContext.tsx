import React, {createContext, useCallback, useState, useContext, useEffect} from 'react'
import api from '../services/Api'
import AsyncStorage from '@react-native-community/async-storage'
import { Text, View } from 'react-native'

interface User{
  id: string;
  username: string;
  email: string;
  avatarUrl: string;
}

interface AuthState{
  token: string;
  user: User;
}

interface Credentials{
  email: string;
  password: string;
}

interface AuthContextData{
  user: User;
  signIn(credentials : Credentials) : Promise<void>;
  signOut() : void;
  loading: boolean;
  updateUser(user: User) : Promise<void>;
}

const authContext = createContext<AuthContextData>({} as AuthContextData)


const AuthProvider: React.FC = ({children}) => {

  const [data, setData] = useState<AuthState>({} as AuthState)
  const [loading, setLoading] = useState(true)
    
  useEffect( () => {
    
    async function loadStorageData() : Promise<void>{
      const token = await AsyncStorage.getItem('@gobarber:token')
      const user = await AsyncStorage.getItem('@gobarber:user')

    if(token && user){
      api.defaults.headers.authorization = `Bearer ${token}`
      setData({token, user: JSON.parse(user)})
    }      
  }
  setLoading(false)

  loadStorageData()

  }, [])

  const signIn = useCallback(async ({email, password})=>{
    const response = await api.post('/session', {email, password})
    const {token, user} = response.data
    await AsyncStorage.setItem('@gobarber:token', token)
    await AsyncStorage.setItem('@gobarber:user', JSON.stringify(user))
    api.defaults.headers.authorization = `Bearer ${token}`
    setData({token, user})
  }, [])

  const updateUser = useCallback(async(user: User) =>{
    await AsyncStorage.setItem("@gobarber:user", JSON.stringify(user))
    setData({
      token: data.token,
      user
    })

  }, [setData, data.token])

  const signOut = useCallback(async ()=> {
    await AsyncStorage.removeItem('@gobarber:token')
    await AsyncStorage.removeItem('@gobarber:user')
    setData({} as AuthState)
  }, [] )

  return(
     <authContext.Provider value={{user: data.user , signIn, signOut, loading, updateUser}}>
       {children}
     </authContext.Provider>
  )
}

function useAuth() : AuthContextData{
  const context = useContext(authContext)

  if(!context){
    throw new Error('useAuth must be used within an authprovider')
  }

  return context
}

export {AuthProvider, useAuth}
