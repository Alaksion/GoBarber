import React from 'react'
import {RouteProps as ReactRouterProps, Route as ReactRouteDom, Redirect} from 'react-router-dom'
import {useAuth} from '../hooks/AuthContext'

interface RouterProps extends ReactRouterProps{
  isPrivate? : boolean;
  component: React.ComponentType

}


const Route: React.FC<RouterProps> = ({isPrivate=false, component:Component,  ...rest}) => {
  const {user} = useAuth()
  return(
    <ReactRouteDom {...rest} render={({location}) =>{
      return isPrivate === !!user ? (<Component></Component>) :
      <Redirect to={ {pathname: isPrivate? '/' : '/dashboard,',state: {from: location} } }></Redirect>

    }}>

    </ReactRouteDom>

  )
}

export default Route
