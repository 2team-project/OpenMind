import styled from 'styled-components'

export const Icon = styled.svg`
  width: 1rem;
  height: 1rem;
  fill: ${(props) => props.$fillColor};
`

export const Button = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.3rem;
  font-size: 14px;
  color: ${(props) => props.$textColor};
`
