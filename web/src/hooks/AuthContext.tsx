import React, {createContext, useCallback, useState, useContext} from 'react'
import api from '../services/api'

interface AuthState{
  token: string;
  user: {}
}

interface Credentials{
  email: string;
  password: string;
}

interface AuthContextData{
  user: {};
  signIn(credentials : Credentials) : Promise<void>;
  signOut() : void;
}

const authContext = createContext<AuthContextData>({} as AuthContextData)


const AuthProvider: React.FC = ({children}) => {
  const [data, setData] = useState<AuthState>( () =>{
    const token = localStorage.getItem('@gobarber:token')
    const user = localStorage.getItem('@gobarber:user')
    if (token && user){
      return {token, user: JSON.parse(user)}
    }
    return {} as AuthState

  } )

  const signIn = useCallback(async ({email, password})=>{
    const response = await api.post('/session', {email, password})
    const {token, user} = response.data
    localStorage.setItem('@gobarber:token', token)
    localStorage.setItem('@gobarber:user', JSON.stringify(user))
    setData({token, user})
  }, [])

  const signOut = useCallback(()=> {
    localStorage.removeItem('@gobarber:token')
    localStorage.removeItem('@gobarber:user')
    setData({} as AuthState)
  }, [] )

  return(
    <authContext.Provider value={{user: data.user , signIn, signOut }}>
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
