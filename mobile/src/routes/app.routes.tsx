import React from 'react'
import {createStackNavigator} from '@react-navigation/stack'
import Dashboard from '../pages/DashBoard/index'
import Profile from 'src/pages/Profile'
import CreateAppointment from 'src/pages/CreateAppointment'
import AppointmentCreated from 'src/pages/AppointmentCreated'


const App = createStackNavigator()

const AppRoutes: React.FC = () => {
  return(
    <App.Navigator screenOptions={{headerShown: false, cardStyle: {backgroundColor: '#312e38' }}}>
      <App.Screen name='DashBoard' component={Dashboard}></App.Screen>
      <App.Screen name='Profile' component={Profile}></App.Screen>
      <App.Screen name='createAppointment' component={CreateAppointment}></App.Screen>
      <App.Screen name='AppointmentCreated' component={AppointmentCreated}></App.Screen>
    </App.Navigator>

  )
}

export default AppRoutes