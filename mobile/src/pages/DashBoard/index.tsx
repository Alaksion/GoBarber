import React, {useCallback, useEffect, useState} from 'react'
import {Container, Header, HeaderTitle, UserName, ProfileButton, UserAvatar, ProvidersList} from './styles'
import {useAuth} from '../../hooks/AuthContext'
import { useNavigation } from '@react-navigation/native'
import api from '../../services/Api'
import {Text} from 'react-native'

export interface Provider{
  id: string;
  username: string;
  avatarUrl: string;
}

const DashBoard: React.FC = () =>{
  const {signOut, user} = useAuth()
  const [providers, setProviders] = useState<Provider[]>([]);

  const {navigate} = useNavigation()

  const navigateToProfile = useCallback(()=>{
    signOut()
    //navigate("profile")

  }, [])

  useEffect(()=>{
    api.get('/providers').then(response => setProviders(response.data));

  }, [])

  return(
    <Container>
      <Header>
        <HeaderTitle>
          <Text>Bem vindo</Text>
          <UserName>{user.username}</UserName>
        </HeaderTitle>

        <ProfileButton onPress={()=>(navigateToProfile)}>
          <UserAvatar source={{uri: user.avatar_url}}></UserAvatar>
        </ProfileButton>
      </Header>
      <ProvidersList 
      data={providers}
      renderItem={({item}) =>(
        <UserName>{item.username}</UserName>
      )}
      >
      </ProvidersList>
    </Container>
  )
}

export default DashBoard