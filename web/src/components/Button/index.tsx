import React, {ButtonHTMLAttributes} from 'react'
import {Container} from './stytes'

type buttonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  loading?: Number
};

const CustomButtom: React.FC<buttonProps> = (props) => (
     <Container type='button'{...props}>
      {props.loading ? 'Carregando...': props.children}

     </Container>
)

export default CustomButtom;
