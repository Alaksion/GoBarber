import React, {createContext, useCallback, useState, useContext} from 'react'
import api from '../services/api'

interface User{
  id: string,
  username: string,
  avatarUrl: string,
  email: string;
}

interface AuthState{
  token: string;
  user: User
}

interface Credentials{
  email: string;
  password: string;
}

interface AuthContextData{
  user: User;
  signIn(credentials : Credentials) : Promise<void>;
  signOut() : void;
  updateUser(user: User): void;
}

const authContext = createContext<AuthContextData>({} as AuthContextData)


const AuthProvider: React.FC = ({children}) => {
  const [data, setData] = useState<AuthState>( () =>{
    const token = localStorage.getItem('@gobarber:token')
    const user = localStorage.getItem('@gobarber:user')
    if (token && user){
      api.defaults.headers.authorization = `Bearer ${token}`
      return {token, user: JSON.parse(user)}
    }
    return {} as AuthState

  } )

  const updateUser = useCallback((updateUser:User)=>{
    localStorage.setItem('@gobarber:user', JSON.stringify(updateUser))
    setData({
      token: data.token,
      user: updateUser
    })

  }, [setData, data.token])

  const signIn = useCallback(async ({email, password})=>{
    const response = await api.post('/session', {email, password})
    const {token, user} = response.data
    localStorage.setItem('@gobarber:token', token)
    localStorage.setItem('@gobarber:user', JSON.stringify(user))
    api.defaults.headers.authorization = `Bearer ${token}`
    setData({token, user})
  }, [])

  const signOut = useCallback(()=> {
    localStorage.removeItem('@gobarber:token')
    localStorage.removeItem('@gobarber:user')
    setData({} as AuthState)
  }, [] )

  return(
    <authContext.Provider value={{user: data.user , signIn, signOut, updateUser}}>
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
