import React, {useCallback, useEffect, useState} from 'react'
import {Container, Header, HeaderTitle, UserName, ProfileButton, UserAvatar, ProvidersList, ProviderListTitle,  ProviderAvatar, ProviderContainer, ProviderMeta, ProviderMetaText, ProviderName, ProviderInfo} from './styles'
import {useAuth} from '../../hooks/AuthContext'
import { useNavigation } from '@react-navigation/native'
import api from '../../services/Api'
import {Text, View} from 'react-native'
import Icon from 'react-native-vector-icons/Feather'

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
    navigate("Profile")

  }, [])

  const navigateToCreateAppointment = useCallback((providerId:string)=> {
    navigate("createAppointment", {providerId})
  }, [navigate])

  useEffect(()=>{
    api.get('/providers').then(response =>{
      setProviders(response.data)
    })

  }, [])

  return(
    <Container>
      <Header>
        <HeaderTitle>
          Bem vindo, {"\n"}
          <UserName>{user.username}</UserName>
        </HeaderTitle>

        <ProfileButton onPress={navigateToProfile}>
          <UserAvatar source={{uri: user.avatarUrl}}></UserAvatar>
        </ProfileButton>
      </Header>
      <ProvidersList 
      data={providers}
      ListHeaderComponent={<ProviderListTitle>Cabeleireiros</ProviderListTitle>}
      keyExtractor={(provider) => provider.id}
      renderItem={({item : provider}) =>(
        <ProviderContainer onPress={()=>navigateToCreateAppointment(provider.id)}>
          <ProviderAvatar source={{uri: provider.avatarUrl}}/>

          <ProviderInfo>
            <ProviderName>{provider.username}</ProviderName>

            <ProviderMeta>
              <Icon name="calendar" size={14} color="#FF9000"/>
              <ProviderMetaText>Segunda a Sexta</ProviderMetaText>
            </ProviderMeta>

            <ProviderMeta>
              <Icon name="clock" size={14} color="#FF9000"/>
              <ProviderMetaText>8:00 as 18:00</ProviderMetaText>
            </ProviderMeta>

          </ProviderInfo>

        </ProviderContainer>
      )}
      >
      </ProvidersList>
    </Container>
  )
}

export default DashBoard