import styled from 'styled-components'
import backgroundImage from '../../assets/register-background.png'
import {shade} from 'polished'

export const Container = styled.div`
  height: 100vh;
  display:flex;
  align-items: stretch;


`

export const Content = styled.div`
  display: flex;
  place-content: center;
  flex-direction: column;
  align-items:center;
  width: 100%;
  max-width: 700px;

  form{
    margin: 80px 0;
    width: 340px;
    text-align: center;

    h1{
      margin-bottom: 24px;
    }

    a{
      color: #f4ede8;
      text-decoration: none;
      display: block;
      margin-top: 24px;
      transition: all 0.2s;

      &:hover{
        color: ${shade(0.2, "#f4ede8" )}
      }
    }
  }

  /*Informando ao CSS para estilizar SOMENTE os elementos em contato direto com o parent
    Se nao fosse informada a ">" essa estilização iria conflitar com a tag "a" dentro do form  */
  > a {
    color: #f4ede8;
      text-decoration: none;
      display: flex;
      align-items: center;
      margin-top: 24px;
      transition: all 0.2s;

      svg{
        margin-right: 10px;
      }

      &:hover{
        color: ${shade(0.2, "#FF9000" )}
      }

  }
`

export const Background = styled.div`
  flex: 1;
  background: url(${backgroundImage}) no-repeat center;
  background-size: cover;

`
