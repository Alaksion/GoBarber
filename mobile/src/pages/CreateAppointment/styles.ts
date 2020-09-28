import { FlatList, RectButton } from 'react-native-gesture-handler'
import { getStatusBarHeight } from 'react-native-iphone-x-helper'
import styled from 'styled-components/native'
import {Provider} from './index'

interface ProviderContainerProps{
  selected: boolean;
}


export const Container = styled.View`
  flex: 1;
`
export const Header = styled.View`
  padding: 24px;
  padding-top: ${getStatusBarHeight(true) + 24}px;
  background: #28262e;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`
export const HeaderTitle = styled.Text`
  color: #f4ede8;
  font-family: "RobotoSlab-Medium";
  font-size: 20px;
  margin-left: 16px;

`
export const UserAvatar = styled.Image`
  width: 56px;
  height: 56px;
  border-radius: 28px;
  margin-left: auto;
`
export const BackButton = styled.TouchableOpacity`
  flex: 1;
`

export const ProvidersList = styled(
  FlatList as new () => FlatList<Provider>
)`
  padding: 32px 24px;

`

export const ProvidersListContainer = styled.View`
  height: 112px;
`

export const ProviderContainer = styled(RectButton)<ProviderContainerProps>`
  background: ${props => props.selected ? "#FF9000" : "#3E3B47" };
  flex-direction: row;
  padding: 8px 12px;
  align-items: center;
  margin-right: 16px;
  border-radius: 10px;
`
export const ProviderName = styled.Text<ProviderContainerProps>`
  margin-left: 8px;
  font-family: "RobotoSlab-Medium";
  font-size: 16px;
  color: ${props => props.selected ? "#232129": "#f4ede8"};

`
export const ProviderAvatar = styled.Image`
  width: 32px;
  height: 32px;
  border-radius: 16px;
`

export const Calendar = styled.View`


`
export const Title = styled.Text`
  font-family: "RobotoSlab-Medium";
  color: #f4ede8;
  font-size: 24px;
  margin: 0 24px 24px;


`

export const OpenDatePickerButton = styled(RectButton)`
  height: 46px;
  background: #ff9000;
  border-radius: 10px;
  align-items: center;
  justify-content: center;
  margin: 0 24px;
`
export const OpenDatePickerButtonText = styled.Text`
  font-family: "RobotoSlab-Medium";
  font-size: 16px;
  color: #232129;
`