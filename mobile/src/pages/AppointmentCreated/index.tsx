import React, {useCallback, useMemo} from 'react'
import {
  Container,
  Title,
  Description,
  OkButton,
  OkButtonText
} from './styles'
import Icon from 'react-native-vector-icons/Feather'
import { useNavigation, useRoute } from '@react-navigation/native'
import {format} from 'date-fns'
import ptBr from 'date-fns/locale/pt-BR'

interface RouteParams{
  date: number;
}

const AppointmentCreated: React.FC = () =>{

  const {params} = useRoute()
  const routeParams = params as RouteParams
  const {reset} = useNavigation()

  const handleOkPressed = useCallback(()=> {
    reset({
      routes: [{
        name: 'Dashboard'
      }],
      index: 0
    })
  }, [reset])

  const formattedDate = useMemo(()=>{
    return format(routeParams.date, "EEEE ', dia ' dd ' de ' MMMM 'de ' YYYY ' ás' HH:MM", {locale: ptBr})
  }, [routeParams.date])

  return(
    <Container>
      <Icon name="check" size={80} color="#04d361"/>

      <Title>Agendamento concluído</Title>
      <Description>{formattedDate}</Description>

      <OkButton onPress={handleOkPressed}>
        <OkButtonText>Ok</OkButtonText>
      </OkButton>
    </Container>

  )
}
export default AppointmentCreated