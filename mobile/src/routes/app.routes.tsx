import React from 'react'
import {createStackNavigator} from '@react-navigation/stack'
import Dashboard from '../pages/DashBoard/index'


const App = createStackNavigator()

const AppRoutes: React.FC = () => {
  return(
    <App.Navigator screenOptions={{headerShown: false, cardStyle: {backgroundColor: '#312e38' }}}>
      <App.Screen name='DashBoard' component={Dashboard}></App.Screen>
    </App.Navigator>

  )
}

export default AppRoutes