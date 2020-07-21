import React from 'react'
import {Text} from 'react-native'
import {Container} from './styles'
import Button from '../../Components/Button/index'
import {useAuth} from '../../hooks/AuthContext'


const DashBoard: React.FC = () =>{
  const {signOut} = useAuth()
  return(
    <Container>
      <Button onPress={signOut}> Log-Out</Button>
    </Container>
  )
}

export default DashBoard