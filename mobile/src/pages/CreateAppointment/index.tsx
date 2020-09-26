import { useNavigation, useRoute } from '@react-navigation/native'
import React, { useCallback } from 'react'
import {Text, View} from 'react-native'
import  Icon  from 'react-native-vector-icons/Feather'
import {Container, Header, HeaderTitle, UserAvatar, BackButton} from './styles'
import {useAuth} from '../../hooks/AuthContext'

interface RouteParams{
  providerId : string;
}

const CreateAppointment: React.FC = () =>{
  const {user} = useAuth();
  const route = useRoute();
  const navigation = useNavigation();
  const {providerId} = route.params as RouteParams

  const navigateBack = useCallback(()=> {
    navigation.goBack()
  }, [navigation])


  return(
    <Container>
      <Header>
        <BackButton onPress={navigateBack}>
          <Icon name="chevron-left" size={24} color="#999591"></Icon>
        </BackButton>

        <HeaderTitle>Cabeleireiros</HeaderTitle>
        <UserAvatar source={{uri: user.avatarUrl }}></UserAvatar>
      </Header>

    </Container>
  )
}
export default CreateAppointment