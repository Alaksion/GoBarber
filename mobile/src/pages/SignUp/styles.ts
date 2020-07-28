import styled from 'styled-components/native'
import {getBottomSpace} from 'react-native-iphone-x-helper'
import {Platform} from 'react-native'

export const Container = styled.View`
  flex: 1;
  align-items:center;
  justify-content: center;
  padding: 0 30px ${Platform.OS === 'ios' ? 40 : 40}px;
  

`

export const Title = styled.Text`
  font-size: 24px;
  color: #f4ede8;
  font-family: 'RobotoSlab-Medium';
  margin: 64px 0 24px;

`
export const BackToLogonButton = styled.TouchableOpacity`
  position: absolute;
  right: 0;
  left: 0;
  bottom: 0;
  background: #312e38;
  border-top-width: 1px;
  border-color: #232129;
  padding: 16px 0 ${16 + getBottomSpace()}px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;

`

export const BackToLogonText = styled.Text`
  color: #ff9000;
  font-size: 16px;
  font-family: 'RobotoSlab-Regular';
  margin-left: 16px;

`