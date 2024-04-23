import styled from 'styled-components'
import media, { size } from '../utils/media'
import { useState } from 'react'

const Button = styled.button`
  width: 16rem;
  height: 2.8rem;
  background-color: var(--brown40);
  border-radius: 8px;
  font-size: 1rem;
  color: var(--grayScale10);

  &:hover {
    border: 2px solid var(--brown50);
  }
  &:active {
    background-color: var(--brown50);
  }
  &:disabled {
    background-color: var(--brown30);

    &:hover {
      border: none;
    }
  }

  ${media(size.tablet)`
    width: 21rem;
  `}
`

function ButtonQuestion({ onClick }) {
  return <Button onClick={onClick}>질문 받기</Button>
}
export default ButtonQuestion
