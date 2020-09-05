import styled, {keyframes} from 'styled-components'
import {shade} from 'polished'

export const Container = styled.div`
  > header{
    width: 100%;
    height: 144px;
    background: #28262e;
    display: flex;
    align-items:center;
    div{
      max-width: 1120px;
      width: 100%;
      margin: 0 auto;
      svg{
        color: #999591;
        height: 24px;
        width: 24px;
        transition: all 0.2s;
        &:hover{
          opacity: 0.4;
        }
      }

    }
  }
`
export const Content = styled.div`
  display: flex;
  place-content: center;
  flex-direction: column;
  align-items:center;
  width: 100%;
  margin: 0 auto;
  margin-top: -176px;
  margin-bottom:0;
  h1{
      margin-bottom: 24px;
      font-size: 20px;
      text-align: left;
    }
  form{
    margin: 80px 0;
    width: 340px;
    text-align: center;
    display: flex;
    flex-direction: column;

    input[name='oldPassword']{
      margin-top: 24px;
    }
  }
`
export const AvatarInput = styled.div`
  margin-bottom: 32px;
  position: relative;
  width: 186px;
  align-self: center;
  img{
    border-radius: 50%;
    height: 186px;
    width: 186px;
  };
  label{
    position: absolute;
    height: 48px;
    width: 48px;
    border-radius: 50%;
    background: #ff9000;
    border: 0;
    right: 0;
    bottom: 0;
    transition: all 0.2s;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    input{
      display: none;
    }
    svg{
      width: 20px;
      height: 20px;
      color: #312e38;
    }
    &:hover{
      background: ${shade(0.2, "#ff9000")}
    }
  }

`
