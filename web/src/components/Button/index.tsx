import React, {ButtonHTMLAttributes} from 'react'
import {Container} from './stytes'

type buttonProps = ButtonHTMLAttributes<HTMLButtonElement>

const CustomButtom: React.FC<buttonProps> = (props) => (
     <Container type='button'{...props}> {props.children} </Container>
)

export default CustomButtom;
