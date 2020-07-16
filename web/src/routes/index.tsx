import React from 'react'
import {Switch } from 'react-router-dom'
import Login from '../pages/login/index'
import SingUp from '../pages/SignUp'
import DashBoard from '../pages/DashBoard'
import Route from './routes'


const Router: React.FC = () => {
  return(
    <Switch>
      <Route path='/' exact component={Login}></Route>
      <Route path="/signup" component={SingUp}></Route>
      <Route path='/dashboard' component={DashBoard} isPrivate></Route>
    </Switch>
  )
}

export default Router

