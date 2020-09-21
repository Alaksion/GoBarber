import styled, {css} from 'styled-components/native'
import FeatherIcon from 'react-native-vector-icons/Feather'

interface ContainerProps{
  isFocused: boolean;
  isErrored: boolean;
}

interface IconProps{
  isFilled : boolean;
}

export const Container = styled.View<ContainerProps>`
  width: 100%;
  height: 60px;
  padding: 0 16px;
  background: #232129;
  border-radius: 10px;
  border: 2px;
  border-color: #232129;
  margin-bottom: 10px;
  flex-direction: row;
  align-items: center;

  ${props => props.isFocused && css`
    border-color: #FF9000
  `}


  ${props => props.isErrored && css`
    border-color: #C53030
  `}


`

export const TextInupt = styled.TextInput`
  flex: 1;
  color: #fff;
  font-size: 16px;
  font-family: 'RobotoSlab-Regular'
`

export const Icon = styled(FeatherIcon)<IconProps>`
  margin-right: 16px;

  ${props => props.isFilled && css`
    color: #ff9000
  
  `}
`