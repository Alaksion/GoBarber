import 'react-native-gesture-handler'
import React from 'react';
import { View, StatusBar } from 'react-native';
import AuthRoutes from './routes/index'
import {NavigationContainer} from '@react-navigation/native'
import AppProvider from './hooks/index'

const HomePage: React.FC = () => {
  return (
    <NavigationContainer>
      <StatusBar 
      backgroundColor={'#312e38'}
      barStyle='light-content'>
      </StatusBar>

      <AppProvider>
        <View style={{backgroundColor: '#312e38', flex: 1}}>
          <AuthRoutes></AuthRoutes>
        </View>
      </AppProvider>

    </NavigationContainer>
  );
};

export default HomePage;