import React from 'react'
import {createStackNavigator} from '@react-navigation/stack'
import SignIn from '../pages/SignIn/index'
import SignUp from '../pages/SignUp/index'
import { Text, View } from 'react-native'

const Auth = createStackNavigator()

const AuthRoutes: React.FC = () => {
  return(
    <Auth.Navigator screenOptions={{headerShown: false, cardStyle: {backgroundColor: '#312e38' }}}>
      <Auth.Screen name='SignIn' component={SignIn}></Auth.Screen>
      <Auth.Screen name='SignUp' component={SignUp}></Auth.Screen>
    </Auth.Navigator>
  )
}

export default AuthRoutes