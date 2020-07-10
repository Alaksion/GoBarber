import styled from 'styled-components'
import {shade} from 'polished'

export const Container = styled.button`

      background: #FF9000;
      border-radius: 10px;
      border: 0;
      height: 50px;
      padding: 16px;
      width: 100%;
      margin-top: 16px;
      color: #312e38;
      font-weight: 500;
      transition: all 0.2s;

      &:hover{
        background: ${shade(0.2, "#FF9000")}
      }


`
