import 'react-native-gesture-handler'
import React from 'react';
import { View, StatusBar } from 'react-native';
import AuthRoutes from './routes/index'
import {NavigationContainer} from '@react-navigation/native'

const HomePage: React.FC = () => {
  return (
    <NavigationContainer>
      <StatusBar 
      backgroundColor={'#312e38'}
      barStyle='light-content'>
      </StatusBar>

      <View style={{backgroundColor: '#312e38', flex: 1}}>
        <AuthRoutes></AuthRoutes>
      </View>
    </NavigationContainer>
  );
};

export default HomePage;
