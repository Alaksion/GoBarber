import { useNavigation, useRoute } from '@react-navigation/native'
import React, { useCallback, useEffect, useState } from 'react'
import  Icon  from 'react-native-vector-icons/Feather'
import {Container, Header, HeaderTitle, UserAvatar, BackButton, ProvidersListContainer, ProvidersList, ProviderContainer, ProviderName, ProviderAvatar} from './styles'
import {useAuth} from '../../hooks/AuthContext'
import api from "../../services/Api"

interface RouteParams{
  providerId : string;
}

export interface Provider{
  id: string;
  username: string;
  avatarUrl: string;
}

const CreateAppointment: React.FC = () =>{
  const {user} = useAuth();
  const route = useRoute();
  const navigation = useNavigation();
  const {providerId} = route.params as RouteParams
  const [providers, setProviders] = useState<Provider[]>([]);
  const [selectedProvider, setSelectedProvider] = useState(providerId)

  const navigateBack = useCallback(()=> {
    navigation.goBack()
  }, [navigation])

  const handleSelectProvider = useCallback((providerId) => {
    setSelectedProvider(providerId)
  }, [])

  useEffect(()=>{
    api.get('/providers').then(response =>{
      console.log(response.data)
      setProviders(response.data)
    })

  }, [])

  
  return(
    <Container>
      <Header>
        <BackButton onPress={navigateBack}>
          <Icon name="chevron-left" size={24} color="#999591"></Icon>
        </BackButton>

        <HeaderTitle>Cabeleireiros</HeaderTitle>
        <UserAvatar source={{uri: user.avatarUrl }}></UserAvatar>
      </Header>

      <ProvidersListContainer>
        <ProvidersList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={providers}
          keyExtractor = {(provider: Provider)=> provider.id}
          renderItem={({item : provider}) => (
            <ProviderContainer selected={provider.id === selectedProvider} onPress={() => handleSelectProvider(provider.id)}>
              <ProviderAvatar source={{uri: provider.avatarUrl}}/>
              <ProviderName selected={provider.id === selectedProvider}>{provider.username}</ProviderName>
            </ProviderContainer>
          )}
        />
      </ProvidersListContainer>
    </Container>
  )
}
export default CreateAppointment