import { useNavigation, useRoute } from '@react-navigation/native'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import  Icon  from 'react-native-vector-icons/Feather'
import {Container, Header, HeaderTitle, UserAvatar, BackButton, ProvidersListContainer, ProvidersList, ProviderContainer, ProviderName, ProviderAvatar, Calendar, Title, OpenDatePickerButton, OpenDatePickerButtonText, SectionContent, SectionTitle, Hour, HourText, Section, Schedule, Content, CreateAppointmentButton, CreateAppointmentButtonText} from './styles'
import {useAuth} from '../../hooks/AuthContext'
import api from "../../services/Api"
import DateTimePicker from '@react-native-community/datetimepicker'
import { Platform, Alert} from 'react-native'
import {format} from 'date-fns'

interface RouteParams{
  providerId : string;
}

export interface Provider{
  id: string;
  username: string;
  avatarUrl: string;
}

interface DayAvailability{
  available: boolean;
  hour: number;
}

const CreateAppointment: React.FC = () =>{
  const {user} = useAuth();
  const route = useRoute();
  const {providerId} = route.params as RouteParams
  const navigation = useNavigation();

  const [dayAvailability, setDayAvailability] = useState<DayAvailability[]>([])
  const [showDatePicker, setShowDatePicker] = useState(false)
  const [providers, setProviders] = useState<Provider[]>([]);
  const [selectedProvider, setSelectedProvider] = useState(providerId)
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [selectedHour, setSelectedHour] = useState(0)


  const handleSelectHour = useCallback((hour:number)=> {
    setSelectedHour(hour)
  }, [])

  const navigateBack = useCallback(()=> {
    navigation.goBack()
  }, [navigation])

  const handleSelectProvider = useCallback((providerId) => {
    setSelectedProvider(providerId)
  }, [])

  const handleToggleDatePicker = useCallback(() => {
    setShowDatePicker(state => !state)
  }, [])

  const handleDateChanged = useCallback((event : any, date: Date | undefined) => {
    if(Platform.OS === "android"){
      setShowDatePicker(false)
    }

    if(date){
      setSelectedDate(date)
    }
  }, [])

  const handleCreateAppointment = useCallback( async ()=> {
    try{
      const date = new Date(selectedDate)
      date.setHours(selectedHour)
      date.setMinutes(0)
    
      await api.post('appointments', {
        providerId: selectedProvider,
        date
      })
      navigation.navigate("AppointmentCreated", {date: date.getTime()})
      
    }catch(err){
      console.log(err)
      Alert.alert("Erro ao criar agendamento", 'Ocorreu um erro ao tentar criar um agendamento tente novamente')
    }
    
  }, [navigation, selectedDate, selectedHour, selectedProvider])

  useEffect(()=>{
    api.get('/providers').then(response =>{
      setProviders(response.data)
    })

  }, [])

  useEffect(()=> {
    const day = selectedDate.getDate()
    const month = selectedDate.getMonth() + 1
    const year = selectedDate.getFullYear()
    api.get(`providers/${user.id}/day`, {params: {month, day, year}}).then(response=> {
      setDayAvailability(response.data)
    })

  }, [selectedDate, selectedProvider])
  
  const morningAvailability = useMemo(()=>{
    return dayAvailability
    .filter(appointment => appointment.hour < 12)
    .map(({available, hour})=>{
      return {
        available, 
        hour,
        hourFormatted: format(new Date().setHours(hour), 'HH:00')
      }
    })
  }, [dayAvailability])

  const afternoonAvailability = useMemo(()=>{
    return dayAvailability
    .filter(appointment => appointment.hour >= 12)
    .map(({available, hour})=>{
      return {
        available, 
        hour,
        hourFormatted: format(new Date().setHours(hour), 'HH:00')
      }
    })
  }, [dayAvailability])

  return(
    <Container>
      <Header>
        <BackButton onPress={navigateBack}>
          <Icon name="chevron-left" size={24} color="#999591"></Icon>
        </BackButton>

        <HeaderTitle>Cabeleireiros</HeaderTitle>
        <UserAvatar source={{uri: user.avatarUrl }}></UserAvatar>
      </Header>
      <Content>
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
          <Calendar>
            <Title>Escolha a data</Title>

            <OpenDatePickerButton onPress={handleToggleDatePicker}>
              <OpenDatePickerButtonText>Selecionar Data</OpenDatePickerButtonText>
            </OpenDatePickerButton>

            { showDatePicker &&
              <DateTimePicker 
              display="calendar" 
              mode="date" 
              value={selectedDate}
              onChange={handleDateChanged}/>
            }
          </Calendar>

          <Schedule>
            <Title>Escolha o horário</Title>

            <Section>
              <SectionTitle>Manhã</SectionTitle>

              <SectionContent>
                {morningAvailability.map(appointment => {
                  return (
                    <Hour 
                    enabled={appointment.available}
                    selected={selectedHour === appointment.hour}
                    onPress={ ()=>handleSelectHour(appointment.hour)}
                    available={appointment.available} 
                    key={appointment.hourFormatted}>
                      <HourText selected={selectedHour === appointment.hour}>{appointment.hourFormatted}</HourText>
                    </Hour>
                  )
              })}
              </SectionContent>
            </Section>

            <Section>
              <SectionTitle>Tarde</SectionTitle>

              <SectionContent>
              {afternoonAvailability.map(appointment => {
                return (
                  <Hour 
                  enabled={appointment.available}
                  selected={selectedHour === appointment.hour}
                  onPress={ ()=>handleSelectHour(appointment.hour)}
                  available={appointment.available} 
                  key={appointment.hourFormatted}>
                    <HourText selected={selectedHour === appointment.hour}>{appointment.hourFormatted}</HourText>
                  </Hour>
                )
              })}
              </SectionContent>
            </Section>
          </Schedule>
          <CreateAppointmentButton onPress={handleCreateAppointment}>
            <CreateAppointmentButtonText>Agendar</CreateAppointmentButtonText>
          </CreateAppointmentButton>
              
        </Content>    
    </Container>
    
  )
}
export default CreateAppointment