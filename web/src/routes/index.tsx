import React from 'react'
import {Switch } from 'react-router-dom'
import Login from '../pages/login/index'
import SingUp from '../pages/SignUp'
import DashBoard from '../pages/DashBoard'
import ForgotPassword from '../pages/ForgotPassword';
import Route from './routes'
import ResetPassword from '../pages/ResetPassword'


const Router: React.FC = () => {
  return(
    <Switch>
      <Route path='/' exact component={Login}></Route>
      <Route path="/signup" component={SingUp}></Route>
      <Route path='/dashboard' component={DashBoard} isPrivate></Route>
      <Route path='/forgotpassword' component={ForgotPassword}></Route>
      <Route path='/resetpassword' component={ResetPassword}></Route>
    </Switch>
  )
}

export default Router

